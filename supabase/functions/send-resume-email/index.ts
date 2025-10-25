import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ResumeEmailRequest {
  recipientEmail: string;
  recipientName: string;
  subject: string;
  message: string;
  pdfBase64: string;
  fileName: string;
  senderEmail?: string;
  senderName?: string;
  userId?: string;
  letterId?: string;
  letterType?: 'cover_letter' | 'application_letter';
  resumeId?: string;
  coverLetterPdfBase64?: string;
  coverLetterFileName?: string;
}

function generateSimpleEmailHTML(message: string, recipientName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 650px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .message-box {
            background: #eff6ff;
            border-left: 4px solid #3b82f6;
            padding: 16px;
            margin: 24px 0;
            border-radius: 4px;
          }
          .footer {
            margin-top: 32px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Hello ${recipientName},</h2>
          ${message ? `
          <div class="message-box">
            <p style="margin: 0; white-space: pre-line;">${message}</p>
          </div>
          ` : ''}
          <p>Please find my resume attached to this email.</p>
          <div class="footer">
            <p>This resume was sent via CreateResume.tech - Professional Resume Builder</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      recipientEmail, 
      recipientName, 
      subject, 
      message, 
      pdfBase64, 
      fileName, 
      senderEmail,
      senderName,
      userId,
      letterId,
      letterType,
      resumeId,
      coverLetterPdfBase64,
      coverLetterFileName
    }: ResumeEmailRequest = await req.json();

    if (!recipientEmail || !recipientName || !subject || !pdfBase64 || !fileName) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate PDF size (8MB limit for email attachments)
    const pdfSizeBytes = (pdfBase64.length * 3) / 4; // Approximate base64 to bytes
    const pdfSizeMB = pdfSizeBytes / (1024 * 1024);
    
    console.log(`PDF size: ${pdfSizeMB.toFixed(2)} MB`);
    
    if (pdfSizeMB > 8) {
      return new Response(
        JSON.stringify({ error: `PDF file is too large (${pdfSizeMB.toFixed(2)} MB). Maximum size is 8 MB.` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Determine the FROM field based on sender
    let fromField = "CreateResume <noreply@createresume.tech>";
    if (senderEmail === "fredrickmureti612@gmail.com") {
      fromField = "Fredrick Mureti <fredrickmureti@createresume.tech>";
    } else if (senderName) {
      fromField = `"${senderName} via CreateResume" <noreply@createresume.tech>`;
    }

    const emailHTML = generateSimpleEmailHTML(message, recipientName);

    // Prepare attachments
    const attachments: any[] = [
      {
        filename: fileName,
        content: pdfBase64,
      },
    ];

    // Add cover letter if provided (for application letters)
    if (coverLetterPdfBase64 && coverLetterFileName) {
      attachments.push({
        filename: coverLetterFileName,
        content: coverLetterPdfBase64,
      });
    }

    console.log("Sending email via Resend...");
    const emailResponse = await resend.emails.send({
      from: fromField,
      to: [recipientEmail],
      subject: subject,
      html: emailHTML,
      reply_to: senderEmail || undefined,
      attachments: attachments,
    });

    console.log("Email sent successfully:", emailResponse);
    
    // Check if Resend returned an error
    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: emailResponse.error
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      data: emailResponse,
      pdfSize: `${pdfSizeMB.toFixed(2)} MB`
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-resume-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
