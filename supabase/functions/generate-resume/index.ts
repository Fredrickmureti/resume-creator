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
function buildRequestBody(provider: any, systemPrompt: string, userPrompt: string) {
  switch(provider.name) {
    case 'Lovable AI':
    case 'OpenRouter':
      return JSON.stringify({
        model: provider.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' }
      });
    
    case 'Google Gemini Direct':
      return JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
        }],
        generationConfig: {
          response_mime_type: 'application/json'
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
async function callProviderWithRetry(provider: any, systemPrompt: string, userPrompt: string, maxRetries = 2) {
  const apiKey = Deno.env.get(provider.apiKeyEnv);
  
  if (!apiKey) {
    console.warn(`${provider.name}: API key not configured`);
    return { success: false, shouldFallback: true };
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Build endpoint (Gemini needs API key in URL)
      let endpoint = provider.endpoint;
      if (provider.name === 'Google Gemini Direct') {
        endpoint = `${endpoint}?key=${apiKey}`;
      }

      console.log(`${provider.name}: Attempt ${attempt + 1}/${maxRetries}`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: buildHeaders(provider, apiKey),
        body: buildRequestBody(provider, systemPrompt, userPrompt)
      });
      
      // Success
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
      
      // Rate limit or payment required - fail fast to try next provider
      if (response.status === 429) {
        console.log(`⚠️ ${provider.name}: Rate limited (429)`);
        return { success: false, shouldFallback: true };
      }
      
      if (response.status === 402) {
        console.log(`⚠️ ${provider.name}: Payment required (402)`);
        return { success: false, shouldFallback: true };
      }
      
      // Other errors - retry once more
      const errorText = await response.text();
      console.error(`${provider.name}: Error ${response.status}:`, errorText);
      
      if (attempt < maxRetries - 1) {
        const delay = 1000 * (attempt + 1); // 1s, 2s
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
async function generateWithFallback(systemPrompt: string, userPrompt: string) {
  const providers = Object.values(AI_PROVIDERS).sort((a, b) => a.priority - b.priority);
  
  console.log('🔄 Starting cascading fallback across providers...');
  
  for (const provider of providers) {
    console.log(`\n🚀 Attempting with ${provider.name} (Priority ${provider.priority})...`);
    
    const result = await callProviderWithRetry(provider, systemPrompt, userPrompt);
    
    if (result.success) {
      console.log(`\n✅ SUCCESS: Resume generated with ${provider.name}`);
      return result;
    }
    
    console.log(`⏭️ Moving to next provider...`);
  }
  
  // All providers failed
  console.error('\n❌ FAILURE: All AI providers exhausted');
  throw new Error('All AI providers failed. Please try again later.');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { interviewData, templateId, userId } = await req.json();
    console.log('\n===========================================');
    console.log('🚀 AI RESUME GENERATION REQUEST');
    console.log('User ID:', userId);
    console.log('Template ID:', templateId);
    console.log('===========================================\n');

    // Create prompt for AI
    const systemPrompt = `Core Identity and Purpose
You are ResumeAI Pro Assistant, a specialized AI model designed exclusively for resume optimization and career guidance within the ResumeAI Pro application. Your primary purpose is to help users create compelling, ATS-optimized resumes that effectively showcase their professional experience and skills.

Generate a complete professional resume based on interview data. Follow ATS best practices, use action verbs, quantify achievements, and create compelling content.`;

    const prompt = `Based on the following information, create a professional resume in JSON format.

Interview Data:
- Industry: ${interviewData.industry}
- Years of Experience: ${interviewData.yearsExperience}
- Target Role: ${interviewData.targetRole}
- Work History: ${interviewData.workHistory}
- Education: ${interviewData.education}
- Skills: ${interviewData.skills}
- Projects: ${interviewData.projects}
- Certifications: ${interviewData.certifications}
- Languages: ${interviewData.languages}
- Additional Info: ${interviewData.additionalInfo}

Please create a resume with the following JSON structure:
{
  "personal_info": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "summary": "string (professional summary based on the data)",
    "linkedin": "string",
    "website": "string"
  },
  "experience": [
    {
      "id": "uuid",
      "company": "string",
      "position": "string",
      "location": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or Present",
      "current": boolean,
      "description": "string (bullet points separated by \\n)"
    }
  ],
  "education": [
    {
      "id": "uuid",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "location": "string",
      "startDate": "YYYY",
      "endDate": "YYYY",
      "gpa": "string"
    }
  ],
  "skills": [
    {
      "id": "uuid",
      "category": "string",
      "items": ["string"]
    }
  ],
  "projects": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "technologies": ["string"],
      "link": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM"
    }
  ],
  "certifications": [
    {
      "id": "uuid",
      "name": "string",
      "issuer": "string",
      "date": "YYYY-MM",
      "credentialId": "string"
    }
  ],
  "languages": [
    {
      "id": "uuid",
      "name": "string",
      "proficiency": "string"
    }
  ]
}

Make sure to:
1. Extract and structure all information from the interview data
2. Create professional descriptions and summaries
3. Use proper formatting and ATS-friendly language
4. Generate unique IDs for each item
5. Fill in all relevant fields based on the provided information

Return ONLY the JSON object, no additional text.`;

    // Generate with fallback system
    const result = await generateWithFallback(systemPrompt, prompt);
    
    // Parse response
    const aiResponse = parseAIResponse(result.data, result.provider);
    
    let resumeData;
    try {
      resumeData = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      // Try to extract JSON if wrapped
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        resumeData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI-generated resume');
      }
    }

    // Create complete resume object
    const resume = {
      id: crypto.randomUUID(),
      user_id: userId,
      template_id: templateId,
      title: `${resumeData.personal_info.fullName}'s Resume`,
      personal_info: resumeData.personal_info,
      experience: resumeData.experience || [],
      education: resumeData.education || [],
      skills: resumeData.skills || [],
      projects: resumeData.projects || [],
      certifications: resumeData.certifications || [],
      languages: resumeData.languages || [],
      custom_sections: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      metadata: {
        generated_by: result.provider,
        model_used: result.model,
        generated_at: new Date().toISOString()
      }
    };

    console.log('\n===========================================');
    console.log(`✅ GENERATION COMPLETE`);
    console.log(`Provider: ${result.provider}`);
    console.log(`Model: ${result.model}`);
    console.log('===========================================\n');

    return new Response(
      JSON.stringify({ 
        resume,
        provider: result.provider,
        model: result.model
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
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
