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
async function generateWithFallback(systemPrompt: string, userPrompt: string) {
  const providers = Object.values(AI_PROVIDERS).sort((a, b) => a.priority - b.priority);
  
  console.log('🔄 Starting cascading fallback across providers...');
  
  for (const provider of providers) {
    console.log(`\n🚀 Attempting with ${provider.name} (Priority ${provider.priority})...`);
    
    const result = await callProviderWithRetry(provider, systemPrompt, userPrompt);
    
    if (result.success) {
      console.log(`\n✅ SUCCESS: LinkedIn content generated with ${provider.name}`);
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
    const { resume, sections } = await req.json();

    console.log('\n===========================================');
    console.log('🚀 LINKEDIN OPTIMIZATION REQUEST');
    console.log('Sections:', sections);
    console.log('===========================================\n');

    const systemPrompt = `You are an expert LinkedIn profile optimization consultant.

Create compelling LinkedIn content that:
- Uses first-person narrative for About section
- Highlights achievements and impact
- Includes relevant keywords for searchability
- Maintains professional yet personable tone
- Follows LinkedIn best practices and character limits

Return JSON with these sections:
{
  "headline": "Professional headline (120 chars max)",
  "about": "Compelling About section (2000 chars max)",
  "experience_suggestions": [
    {
      "company": "company name",
      "position": "position title",
      "description": "LinkedIn-optimized description"
    }
  ],
  "skills_recommendations": ["skill1", "skill2", ...],
  "featured_content": [
    {
      "title": "content title",
      "description": "brief description"
    }
  ]
}`;

    const userPrompt = `Create LinkedIn profile content based on this resume:

Personal Info:
${JSON.stringify(resume.personal_info, null, 2)}

Experience:
${JSON.stringify(resume.experience, null, 2)}

Education:
${JSON.stringify(resume.education, null, 2)}

Skills:
${JSON.stringify(resume.skills, null, 2)}

Projects:
${JSON.stringify(resume.projects, null, 2)}

Requested sections: ${sections.join(', ')}`;

    // Generate with fallback system
    const result = await generateWithFallback(systemPrompt, userPrompt);
    
    // Parse response
    const aiResponse = parseAIResponse(result.data, result.provider);
    
    let linkedinContent;
    try {
      linkedinContent = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        linkedinContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse LinkedIn content');
      }
    }

    console.log('\n===========================================');
    console.log(`✅ LINKEDIN CONTENT COMPLETE`);
    console.log(`Provider: ${result.provider}`);
    console.log(`Model: ${result.model}`);
    console.log('===========================================\n');

    return new Response(
      JSON.stringify({ 
        success: true, 
        linkedinContent,
        provider: result.provider,
        model: result.model
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('\n===========================================');
    console.error('❌ LINKEDIN OPTIMIZATION FAILED');
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
