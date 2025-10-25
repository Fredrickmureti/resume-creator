import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-session-timeout',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resume } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Prepare resume content for analysis
    const resumeText = `
      Name: ${resume.personal_info?.fullName || 'Not provided'}
      Email: ${resume.personal_info?.email || 'Not provided'}
      Phone: ${resume.personal_info?.phone || 'Not provided'}
      Location: ${resume.personal_info?.location || 'Not provided'}
      Summary: ${resume.personal_info?.summary || 'Not provided'}
      
      Experience:
      ${resume.experience?.map((exp: any) => `
        - ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})
          Location: ${exp.location}
          Description: ${exp.description}
      `).join('\n') || 'No experience listed'}
      
      Education:
      ${resume.education?.map((edu: any) => `
        - ${edu.degree} in ${edu.field} from ${edu.institution}
          (${edu.startDate} - ${edu.endDate})
          ${edu.gpa ? `GPA: ${edu.gpa}` : ''}
      `).join('\n') || 'No education listed'}
      
      Skills:
      ${resume.skills?.map((skill: any) => `${skill.category}: ${skill.items.join(', ')}`).join('\n') || 'No skills listed'}
      
      Projects:
      ${resume.projects?.map((proj: any) => `
        - ${proj.name}: ${proj.description}
          Technologies: ${proj.technologies.join(', ')}
      `).join('\n') || 'No projects listed'}
      
      Certifications:
      ${resume.certifications?.map((cert: any) => `${cert.name} from ${cert.issuer} (${cert.date})`).join('\n') || 'No certifications'}
    `;

    const systemPrompt = `You are an expert resume analyzer and ATS (Applicant Tracking System) specialist. Analyze the resume and provide detailed scoring and feedback.

Your response MUST be valid JSON with this exact structure:
{
  "atsScore": <number 0-100>,
  "impactScore": <number 0-100>,
  "overallScore": <number 0-100>,
  "keywordMatch": <number 0-100>,
  "sections": {
    "summary": {"score": <number>, "feedback": "<string>", "suggestions": ["<string>"]},
    "experience": {"score": <number>, "feedback": "<string>", "suggestions": ["<string>"]},
    "education": {"score": <number>, "feedback": "<string>", "suggestions": ["<string>"]},
    "skills": {"score": <number>, "feedback": "<string>", "suggestions": ["<string>"]}
  },
  "strengths": ["<string>"],
  "weaknesses": ["<string>"],
  "quickWins": ["<string>"],
  "industryBenchmark": "<string>"
}

Scoring criteria:
- ATS Score: How well the resume passes automated systems (formatting, keywords, structure)
- Impact Score: Strength of accomplishments, use of action verbs, quantifiable results
- Keyword Match: Presence of industry-standard keywords and skills
- Overall Score: Weighted average of all scores

Be specific, actionable, and honest in your feedback.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this resume and provide detailed scoring:\n\n${resumeText}` }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to analyze resume");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in AI response");
    }

    const scores = JSON.parse(content);
    
    console.log("Resume scoring completed successfully");

    return new Response(JSON.stringify(scores), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in score-resume function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
