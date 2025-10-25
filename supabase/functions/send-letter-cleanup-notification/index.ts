import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateCleanupEmailHTML(userName: string, oldLettersCount: number): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          }
          .header {
            text-align: center;
            margin-bottom: 32px;
          }
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 8px;
          }
          .title {
            font-size: 20px;
            font-weight: 600;
            color: #334155;
            margin: 24px 0 16px 0;
          }
          .info-box {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 16px 20px;
            margin: 24px 0;
            border-radius: 8px;
          }
          .info-box p {
            margin: 0;
            color: #92400e;
            font-weight: 500;
          }
          .cta-button {
            display: inline-block;
            background: #0f172a;
            color: white !important;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 24px 0;
            text-align: center;
          }
          .benefits {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            margin: 24px 0;
          }
          .benefits ul {
            margin: 8px 0;
            padding-left: 20px;
          }
          .benefits li {
            color: #475569;
            margin: 8px 0;
          }
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #64748b;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">✨ CreateResume.tech</div>
          </div>
          
          <h2 class="title">Hi ${userName}! 👋</h2>
          
          <p>We noticed you have <strong>${oldLettersCount} letter(s)</strong> in your account that are older than 30 days.</p>
          
          <div class="info-box">
            <p>💡 Cleaning up old letters helps keep your workspace organized and our database efficient!</p>
          </div>
          
          <p>We recommend reviewing and cleaning up letters you no longer need.</p>
          
          <div class="benefits">
            <strong>Benefits of cleaning up:</strong>
            <ul>
              <li>✅ Faster loading times</li>
              <li>✅ Better organization</li>
              <li>✅ Focus on current opportunities</li>
              <li>✅ Improved system performance</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="https://createresume.tech/my-letters" class="cta-button">
              Manage My Letters
            </a>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
            Don't worry - your important letters are safe! You can review them before deleting anything.
          </p>
          
          <div class="footer">
            <p>This is an automated reminder from CreateResume.tech</p>
            <p style="margin-top: 8px;">
              <a href="https://createresume.tech" style="color: #3b82f6; text-decoration: none;">CreateResume.tech</a> - 
              Professional Resume Builder
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get users with old letters needing notification
    const { data: usersNeedingNotification, error: queryError } = await supabase
      .rpc('get_old_letters_needing_notification');

    if (queryError) {
      console.error("Error querying old letters:", queryError);
      throw queryError;
    }

    if (!usersNeedingNotification || usersNeedingNotification.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: "No users need cleanup notifications",
        notified: 0
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Sending cleanup notifications to ${usersNeedingNotification.length} users`);

    // Send notifications
    const results = await Promise.allSettled(
      usersNeedingNotification.map(async (user: any) => {
        const emailHTML = generateCleanupEmailHTML(
          user.user_email.split('@')[0], 
          user.old_letters_count
        );

        const emailResponse = await resend.emails.send({
          from: "CreateResume <noreply@createresume.tech>",
          to: [user.user_email],
          subject: "🧹 Time to clean up your old letters",
          html: emailHTML,
        });

        if (!emailResponse.error) {
          // Mark as notified
          await supabase.rpc('mark_letters_notified', { p_user_id: user.user_id });
        }

        return emailResponse;
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Cleanup notifications sent: ${successful} successful, ${failed} failed`);

    return new Response(JSON.stringify({ 
      success: true,
      notified: successful,
      failed: failed,
      total: usersNeedingNotification.length
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-letter-cleanup-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send notifications" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
