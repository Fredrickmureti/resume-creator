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
function buildRequestBody(provider: any, systemPrompt: string, userPrompt: string, model?: string) {
  const modelToUse = model || provider.model;
  
  switch(provider.name) {
    case 'Lovable AI':
    case 'OpenRouter':
      return JSON.stringify({
        model: modelToUse,
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
async function callProviderWithRetry(provider: any, systemPrompt: string, userPrompt: string, model?: string, maxRetries = 2) {
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
        body: buildRequestBody(provider, systemPrompt, userPrompt, model)
      });
      
      // Success
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${provider.name}: Success`);
        return { 
          success: true, 
          data: data, 
          provider: provider.name,
          model: model || provider.model
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
async function generateWithFallback(systemPrompt: string, userPrompt: string, qualityMode: string) {
  const providers = Object.values(AI_PROVIDERS).sort((a, b) => a.priority - b.priority);
  
  // Select model based on quality mode for Lovable AI
  const modelOverride = qualityMode === 'premium' 
    ? 'google/gemini-2.5-pro'
    : 'google/gemini-2.5-flash';
  
  console.log('🔄 Starting cascading fallback across providers...');
  console.log(`Quality mode: ${qualityMode}, Model: ${modelOverride}`);
  
  for (const provider of providers) {
    console.log(`\n🚀 Attempting with ${provider.name} (Priority ${provider.priority})...`);
    
    // Only use model override for Lovable AI
    const modelToUse = provider.name === 'Lovable AI' ? modelOverride : undefined;
    const result = await callProviderWithRetry(provider, systemPrompt, userPrompt, modelToUse);
    
    if (result.success) {
      console.log(`\n✅ SUCCESS: CV revamped with ${provider.name}`);
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
    const { 
      resumeData, 
      jobData, 
      targetRole, 
      optimizationGoals = [],
      tonePreference = 'professional',
      qualityMode = 'fast'
    } = await req.json();

    console.log('\n===========================================');
    console.log('🚀 CV REVAMP REQUEST');
    console.log('Optimization goals:', optimizationGoals);
    console.log('Quality mode:', qualityMode);
    console.log('===========================================\n');

    const systemPrompt = `You are an expert CV/Resume Revamp Specialist with deep expertise in ATS optimization, impact-driven writing, and professional branding.

🎯 CRITICAL MISSION: You MUST comprehensively revamp EVERY SINGLE SECTION of the CV/resume. This is NOT optional.

═══════════════════════════════════════════════════════════════════════════════
📋 MANDATORY SECTIONS TO REVAMP (ALL REQUIRED):
═══════════════════════════════════════════════════════════════════════════════

1️⃣ PROFESSIONAL SUMMARY (CRITICAL - ALWAYS REVAMP)
   ✓ Create a powerful 2-4 sentence summary
   ✓ Lead with years of experience and core expertise
   ✓ Include 2-3 quantifiable achievements
   ✓ Incorporate 5-8 relevant keywords from job description
   ✓ End with unique value proposition
   ✓ Tone: ${tonePreference}
   
   Example: "Results-driven Software Engineer with 5+ years building scalable cloud applications, increasing system performance by 40% and reducing costs by $200K annually. Expert in React, Node.js, AWS, and microservices architecture. Proven leader who mentors teams and drives innovation through agile methodologies."

2️⃣ EXPERIENCE (CRITICAL - REVAMP EVERY SINGLE ROLE)
   For EACH and EVERY job entry, you MUST:
   ✓ Start bullet points with strong action verbs (Led, Engineered, Spearheaded, Architected, Accelerated, Optimized, Transformed)
   ✓ Add specific metrics and numbers (%, $, time saved, users impacted, team size)
   ✓ Use the STAR format: Action + Context + Result
   ✓ Incorporate ATS keywords naturally
   ✓ Focus on business impact, not just duties
   ✓ Remove weak phrases like "responsible for", "helped with", "worked on"
   
   TRANSFORM THIS:
   ❌ "Responsible for developing features and fixing bugs"
   
   INTO THIS:
   ✅ "Engineered 15+ high-impact features using React and TypeScript, reducing page load time by 60% and improving user engagement by 35% across 100K+ monthly active users"

3️⃣ SKILLS (CRITICAL - REORGANIZE AND ENHANCE)
   ✓ Categorize into: Technical Skills, Tools & Technologies, Soft Skills
   ✓ Prioritize skills matching the job description (put them first)
   ✓ Add trending/relevant skills if missing but plausible
   ✓ Remove outdated or irrelevant skills
   ✓ Group similar skills together logically
   ✓ Ensure ATS keyword match

4️⃣ EDUCATION (ENHANCE IF APPLICABLE)
   ✓ Add relevant coursework if junior level
   ✓ Include GPA if ≥3.5
   ✓ Mention honors, awards, scholarships
   ✓ Add thesis/capstone project titles if relevant

5️⃣ PROJECTS (CRITICAL - USE PROBLEM → SOLUTION → IMPACT)
   For EACH project, you MUST:
   ✓ Start with the problem/challenge
   ✓ Describe the solution and technologies used
   ✓ End with quantifiable impact
   ✓ Include metrics wherever possible
   
   Example: "Built an AI-powered recommendation engine (Python, TensorFlow, AWS) that analyzed 1M+ user behaviors, increasing conversion rates by 28% and generating $500K in additional revenue"

6️⃣ CERTIFICATIONS (ENSURE RELEVANCE)
   ✓ Keep only relevant and recent certifications
   ✓ Add credential IDs if available
   ✓ Prioritize industry-recognized credentials

7️⃣ LANGUAGES (ADD PROFICIENCY CLARITY)
   ✓ Use standard proficiency levels: Native, Fluent, Professional, Intermediate, Basic
   ✓ Be honest and specific

═══════════════════════════════════════════════════════════════════════════════
🎯 OPTIMIZATION GOALS SELECTED:
═══════════════════════════════════════════════════════════════════════════════
${optimizationGoals.map((goal: string) => {
  const goalMap: Record<string, string> = {
    'ats': '• ATS Optimization: Maximize keyword density and formatting',
    'impact': '• Impact Enhancement: Focus on metrics and achievements',
    'keywords': '• Keyword Matching: Align with job description keywords',
    'restructure': '• Content Restructuring: Reorganize for clarity and flow',
    'quantify': '• Add Metrics: Include numbers, percentages, and measurable results'
  };
  return goalMap[goal] || `• ${goal}`;
}).join('\n')}

═══════════════════════════════════════════════════════════════════════════════
⚠️ CRITICAL RULES:
═══════════════════════════════════════════════════════════════════════════════
1. You MUST revamp ALL sections listed above - not just summary
2. Every experience bullet point MUST be rewritten with metrics
3. Skills MUST be reorganized and categorized
4. Projects MUST follow Problem → Solution → Impact format
5. You MUST add quantifiable achievements wherever possible
6. Maintain authenticity - don't fabricate information, enhance existing details
7. Detect and eliminate vague phrases: "various", "multiple", "several", "helped with"
8. Use active voice, not passive voice
9. Front-load important information in each bullet point

═══════════════════════════════════════════════════════════════════════════════
📊 REQUIRED OUTPUT FORMAT (JSON):
═══════════════════════════════════════════════════════════════════════════════

{
  "personal_info": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "summary": "ENHANCED professional summary with keywords and metrics",
    "linkedin": "string",
    "website": "string"
  },
  "experience": [
    {
      "id": "preserved_uuid",
      "company": "string",
      "position": "enhanced_position_title_if_applicable",
      "location": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or Present",
      "current": boolean,
      "description": "FULLY REWRITTEN bullet points with action verbs, metrics, and impact"
    }
  ],
  "education": [
    {
      "id": "preserved_uuid",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "location": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "gpa": "string (if ≥3.5)"
    }
  ],
  "skills": [
    {
      "id": "preserved_or_new_uuid",
      "category": "Technical Skills / Tools & Technologies / Soft Skills",
      "items": ["prioritized_skill_1", "skill_2", "skill_3"]
    }
  ],
  "projects": [
    {
      "id": "preserved_uuid",
      "name": "string",
      "description": "ENHANCED with Problem → Solution → Impact format",
      "technologies": ["tech1", "tech2"],
      "link": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM"
    }
  ],
  "certifications": [
    {
      "id": "preserved_uuid",
      "name": "string",
      "issuer": "string",
      "date": "YYYY-MM",
      "credentialId": "string"
    }
  ],
  "languages": [
    {
      "id": "preserved_uuid",
      "name": "string",
      "proficiency": "Native / Fluent / Professional / Intermediate / Basic"
    }
  ],
  "changes_summary": {
    "sections_updated": ["List ALL sections you modified"],
    "key_improvements": [
      "Specific improvement 1 with metric",
      "Specific improvement 2 with metric",
      "Specific improvement 3 with metric"
    ],
    "ats_keywords_added": ["keyword1", "keyword2", "keyword3"],
    "revamp_report": {
      "summary_enhancements": "Brief description of summary changes",
      "experience_enhancements": "Brief description of experience changes (e.g., 'Rewrote 12 bullet points with metrics')",
      "skills_enhancements": "Brief description of skills reorganization",
      "projects_enhancements": "Brief description of project improvements",
      "metrics_added": "Number of quantifiable metrics added",
      "weak_phrases_removed": ["List of vague phrases removed"],
      "action_verbs_used": ["List of strong action verbs added"],
      "ats_score_improvement": "Expected ATS improvement percentage"
    }
  }
}

═══════════════════════════════════════════════════════════════════════════════
✅ VALIDATION CHECKLIST (ENSURE ALL ARE TRUE):
═══════════════════════════════════════════════════════════════════════════════
☑ Professional summary is rewritten with metrics and keywords
☑ ALL experience roles have rewritten descriptions with action verbs
☑ ALL experience bullet points include metrics or impact
☑ Skills are reorganized into categories
☑ Projects follow Problem → Solution → Impact format
☑ Education includes enhancements where applicable
☑ Languages have clear proficiency levels
☑ changes_summary includes comprehensive revamp_report
☑ No vague phrases like "responsible for" or "helped with" remain
☑ ATS keywords are naturally incorporated throughout

You are required to return ONLY the JSON object, nothing else.`;

    let userPrompt = `Revamp this CV:\n\n${JSON.stringify(resumeData, null, 2)}`;

    if (jobData) {
      userPrompt += `\n\nTarget Job Requirements:\n${JSON.stringify(jobData, null, 2)}`;
    } else if (targetRole) {
      userPrompt += `\n\nTarget Role Description:\n${JSON.stringify(targetRole, null, 2)}`;
    }

    // Generate with fallback system
    const result = await generateWithFallback(systemPrompt, userPrompt, qualityMode);
    
    // Parse response
    const aiResponse = parseAIResponse(result.data, result.provider);
    
    let revampedData;
    try {
      revampedData = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        revampedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse revamped CV');
      }
    }

    console.log('\n===========================================');
    console.log(`✅ REVAMP COMPLETE`);
    console.log(`Provider: ${result.provider}`);
    console.log(`Model: ${result.model}`);
    console.log('===========================================\n');

    return new Response(
      JSON.stringify({ 
        success: true, 
        revampedData,
        provider: result.provider,
        model: result.model
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('\n===========================================');
    console.error('❌ REVAMP FAILED');
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
