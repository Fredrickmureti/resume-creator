import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-session-timeout',
};

// AI Provider Configuration
const AI_PROVIDERS = {
  lovable: {
    name: 'Lovable AI',
    endpoint: 'https://ai.gateway.lovable.dev/v1/chat/completions',
    apiKeyEnv: 'LOVABLE_API_KEY',
    model: 'google/gemini-2.5-flash',
    priority: 1
  },
  openrouter: {
    name: 'OpenRouter',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    apiKeyEnv: 'OPENROUTER_API_KEY',
    model: 'google/gemini-2.0-flash-exp:free',
    priority: 2
  },
  gemini: {
    name: 'Google Gemini Direct',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
    apiKeyEnv: 'GOOGLE_GEMINI_API_KEY',
    model: 'gemini-2.0-flash-exp',
    priority: 3
  }
};

// Build headers based on provider
function buildHeaders(provider: any, apiKey: string): HeadersInit {
  switch(provider.name) {
    case 'Lovable AI':
    case 'OpenRouter':
      return {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      };
    case 'Google Gemini Direct':
      return { 'Content-Type': 'application/json' };
    default:
      return { 'Content-Type': 'application/json' };
  }
}

// Build request body based on provider
function buildRequestBody(provider: any, systemPrompt: string, userPrompt: string, maxTokens: number) {
  switch(provider.name) {
    case 'Lovable AI':
    case 'OpenRouter':
      return JSON.stringify({
        model: provider.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: maxTokens
      });
    
    case 'Google Gemini Direct':
      return JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: systemPrompt + '\n\n' + userPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: maxTokens
        }
      });
    
    default:
      return JSON.stringify({});
  }
}

// Parse AI response based on provider
function parseAIResponse(data: any, providerName: string): string {
  switch(providerName) {
    case 'Lovable AI':
    case 'OpenRouter':
      return data.choices?.[0]?.message?.content || '';
    
    case 'Google Gemini Direct':
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    default:
      return '';
  }
}

// Call provider with retry logic
async function callProviderWithRetry(provider: any, systemPrompt: string, userPrompt: string, maxTokens: number, maxRetries = 2) {
  const apiKey = Deno.env.get(provider.apiKeyEnv);
  
  if (!apiKey) {
    console.warn(`${provider.name}: API key not configured`);
    return { success: false, shouldFallback: true };
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      let endpoint = provider.endpoint;
      if (provider.name === 'Google Gemini Direct') {
        endpoint = `${endpoint}?key=${apiKey}`;
      }

      console.log(`${provider.name}: Attempt ${attempt + 1}/${maxRetries}`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: buildHeaders(provider, apiKey),
        body: buildRequestBody(provider, systemPrompt, userPrompt, maxTokens)
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${provider.name}: Success`);
        return { 
          success: true, 
          data: data, 
          provider: provider.name,
          model: provider.model
        };
      }
      
      if (response.status === 429 || response.status === 402) {
        console.log(`⚠️ ${provider.name}: ${response.status}`);
        return { success: false, shouldFallback: true };
      }
      
      const errorText = await response.text();
      console.error(`${provider.name}: Error ${response.status}:`, errorText);
      
      if (attempt < maxRetries - 1) {
        const delay = 1000 * (attempt + 1);
        console.log(`${provider.name}: Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
    } catch (error) {
      console.error(`${provider.name}: Network error on attempt ${attempt + 1}:`, error);
      
      if (attempt < maxRetries - 1) {
        const delay = 1000 * (attempt + 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.log(`❌ ${provider.name}: All retries exhausted`);
  return { success: false, shouldFallback: true };
}

// Generate with cascading fallback across providers
async function generateWithFallback(systemPrompt: string, userPrompt: string, maxTokens: number) {
  const providers = Object.values(AI_PROVIDERS).sort((a, b) => a.priority - b.priority);
  
  console.log('🔄 Starting cascading fallback across providers...');
  
  for (const provider of providers) {
    console.log(`\n🚀 Attempting with ${provider.name} (Priority ${provider.priority})...`);
    
    const result = await callProviderWithRetry(provider, systemPrompt, userPrompt, maxTokens);
    
    if (result.success) {
      console.log(`\n✅ SUCCESS: Job application generated with ${provider.name}`);
      return result;
    }
    
    console.log(`⏭️ Moving to next provider...`);
  }
  
  console.error('\n❌ FAILURE: All AI providers exhausted');
  throw new Error('All AI providers failed. Please try again later.');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobTitle, companyName, jobDescription, resume, salaryExpectation, availabilityDate, responseLength = 'balanced' } = await req.json();

    console.log('\n===========================================');
    console.log('🚀 JOB APPLICATION GENERATION REQUEST');
    console.log('Response length:', responseLength);
    console.log('===========================================\n');

    // Dynamic token limits based on length
    const lengthConfig = {
      concise: { maxTokens: 300, wordTarget: '120-180 words', paragraphs: '2-3' },
      balanced: { maxTokens: 500, wordTarget: '250-350 words', paragraphs: '3-4' },
      comprehensive: { maxTokens: 850, wordTarget: '450-600 words', paragraphs: '4-6' }
    };

    const config = lengthConfig[responseLength as keyof typeof lengthConfig] || lengthConfig.balanced;

    // Build detailed resume context
    let resumeContext = '';
    if (resume) {
      const { personal_info, experience = [], education = [], skills = [], certifications = [], projects = [] } = resume;
      
      resumeContext = `

CANDIDATE PROFILE:
Name: ${personal_info?.fullName || 'Please use a professional tone without placeholders'}
Email: ${personal_info?.email || ''}
Phone: ${personal_info?.phone || ''}
Location: ${personal_info?.location || ''}

${personal_info?.summary ? `PROFESSIONAL SUMMARY:\n${personal_info.summary}\n` : ''}

${experience.length > 0 ? `WORK EXPERIENCE:\n${experience.map((exp: any, idx: number) => 
  `${idx + 1}. ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})
   ${exp.description ? '   Responsibilities: ' + exp.description : ''}`
).join('\n\n')}\n` : ''}

${education.length > 0 ? `EDUCATION:\n${education.map((edu: any) => 
  `- ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.graduationDate || 'In progress'})`
).join('\n')}\n` : ''}

${skills.length > 0 ? `KEY SKILLS:\n${skills.map((skillGroup: any) => 
  `${skillGroup.category}: ${skillGroup.items.join(', ')}`
).join('\n')}\n` : ''}

${certifications.length > 0 ? `CERTIFICATIONS:\n${certifications.map((cert: any) => 
  `- ${cert.name} (${cert.issuer}, ${cert.date})`
).join('\n')}\n` : ''}

${projects.length > 0 ? `RELEVANT PROJECTS:\n${projects.map((proj: any) => 
  `- ${proj.name}: ${proj.description}`
).join('\n')}\n` : ''}`;
    }

    const systemPrompt = `You are an expert career counselor specializing in formal job application letters.

CRITICAL INSTRUCTIONS:
- Use the ACTUAL candidate information provided below - DO NOT use placeholders like [Your Name], [Your Address], etc.
- If specific contact info is missing, omit that line rather than using brackets
- Write a natural, flowing letter using the real data provided
- The candidate's actual details are in the resume context

Create a ${responseLength} professional, formal job application letter that:
- Uses formal business letter format with proper date and salutation
- Highlights SPECIFIC experiences and skills from the candidate's actual resume
- Addresses the job requirements with concrete examples from their background
- Maintains professional, confident tone throughout
- ${salaryExpectation ? `Mentions salary expectation: ${salaryExpectation}` : ''}
- ${availabilityDate ? `States availability: ${availabilityDate}` : ''}
- Ends with professional call to action

Format Requirements:
- Write ${config.paragraphs} well-structured paragraphs
- Target length: ${config.wordTarget}
- More formal than a cover letter, suitable for official applications
- Use the candidate's real name from the resume data - NO PLACEHOLDERS

${responseLength === 'concise' ? 'Keep it brief, direct, and impactful. Focus on core qualifications only.' : ''}
${responseLength === 'comprehensive' ? 'Provide detailed coverage of experience, skills, and motivation. Expand on relevant achievements.' : ''}`;

    const userPrompt = `Create a formal job application letter for:

Job Title: ${jobTitle}
Company: ${companyName}

JOB DESCRIPTION:
${jobDescription}
${resumeContext}

${salaryExpectation ? `\nSALARY EXPECTATION: ${salaryExpectation}` : ''}
${availabilityDate ? `\nAVAILABILITY: ${availabilityDate}` : ''}

Generate the complete application letter now using the actual candidate information above.`;

    // Generate with fallback system
    const result = await generateWithFallback(systemPrompt, userPrompt, config.maxTokens);
    
    // Parse response
    const applicationLetter = parseAIResponse(result.data, result.provider);

    if (!applicationLetter) {
      throw new Error('No content generated');
    }

    console.log('\n===========================================');
    console.log(`✅ GENERATION COMPLETE`);
    console.log(`Provider: ${result.provider}`);
    console.log(`Model: ${result.model}`);
    console.log('===========================================\n');

    return new Response(
      JSON.stringify({ 
        applicationLetter,
        provider: result.provider,
        model: result.model
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('\n===========================================');
    console.error('❌ GENERATION FAILED');
    console.error('Error:', error);
    console.error('===========================================\n');
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'All AI providers are currently unavailable. Please try again in a few minutes.',
        errorType: 'all_providers_failed'
      }),
      {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
