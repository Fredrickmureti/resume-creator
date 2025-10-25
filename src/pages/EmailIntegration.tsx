import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Mail, Send, ArrowLeft, CheckCircle2, AlertCircle, Upload, FileText } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useToast } from '../hooks/use-toast';

interface EmailIntegrationProps {
  user: any;
}

export default function EmailIntegration({ user }: EmailIntegrationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<any>(null);

  // Load letter from navigation state if available
  useEffect(() => {
    const state = location.state as { selectedLetter?: any };
    if (state?.selectedLetter) {
      const letter = state.selectedLetter;
      setSelectedLetter(letter);
      setSubject(`Application for ${letter.job_title} at ${letter.company_name}`);
      setMessage(letter.content);
    }
  }, [location]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      e.target.value = '';
      return;
    }

    // Validate file size (8MB limit)
    const maxSize = 8 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: `File size must be less than 8 MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`,
        variant: "destructive",
      });
      e.target.value = '';
      return;
    }

    setUploadedFile(file);
    toast({
      title: "File Uploaded",
      description: `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`,
    });
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data:application/pdf;base64, prefix
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile || !recipientEmail || !recipientName || !subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload a PDF.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    
    try {
      toast({
        title: "Preparing Email...",
        description: "Converting your PDF for email delivery.",
      });

      const pdfBase64 = await convertFileToBase64(uploadedFile);

      toast({
        title: "Sending Email...",
        description: "Your resume is being sent via email.",
      });

      const { data, error } = await supabase.functions.invoke('send-resume-email', {
        body: {
          recipientEmail,
          recipientName,
          subject,
          message: message || 'Please find my resume attached for your review.',
          pdfBase64,
          fileName: uploadedFile.name,
          senderEmail: user.email,
        }
      });

      if (error) throw error;
      
      if (data?.error) {
        throw new Error(data.error.message || data.error || 'Failed to send email');
      }

      toast({
        title: "Email Sent Successfully!",
        description: `Your resume has been sent to ${recipientEmail}`,
      });

      setRecipientEmail('');
      setRecipientName('');
      setSubject('');
      setMessage('');
      setUploadedFile(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to Send Email",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation user={user} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Email Integration</h1>
                <p className="text-blue-100 mt-1">Send your resume directly to recruiters and hiring managers</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSendEmail} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Resume PDF <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                  required
                />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center justify-center gap-3 w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                >
                  {uploadedFile ? (
                    <>
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-600">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Click to change
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-gray-400" />
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">Click to upload your resume PDF</p>
                        <p className="text-sm text-gray-500">Maximum file size: 8 MB</p>
                      </div>
                    </>
                  )}
                </label>
              </div>
              {uploadedFile && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-green-900">PDF Ready</p>
                    <p className="text-green-700">Your resume will be sent with the exact styling you see in your PDF</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipient Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recruiter@company.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Application for [Position Title]"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {selectedLetter ? 'Email Body (Editable)' : 'Personal Message (Optional)'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={selectedLetter ? 12 : 6}
                placeholder={selectedLetter ? 'Edit your letter content...' : "Dear Hiring Manager,&#10;&#10;I am writing to express my interest in the [Position] role at [Company]. Please find my resume attached for your review.&#10;&#10;Best regards"}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
              <p className="mt-2 text-sm text-gray-500">
                {selectedLetter 
                  ? 'You can edit this letter before sending. It will be included in the email body.'
                  : 'Tip: Personalize your message to increase your chances of getting a response'
                }
              </p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-purple-900">
                <p className="font-semibold mb-1">How to Prepare Your Resume</p>
                <ul className="list-disc list-inside space-y-1 text-purple-800">
                  <li>Go to your resume builder and click "Print/Export" to save as PDF</li>
                  <li>This preserves all colors, fonts, and exact layout from your template</li>
                  <li>Upload the saved PDF here (max 8 MB)</li>
                  <li>Your recipient will see your resume exactly as designed</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending || !uploadedFile}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {sending ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Resume
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Email Tips for Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Personalize Every Email</h3>
                <p className="text-sm text-gray-600">Mention the company name and specific position</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Keep It Professional</h3>
                <p className="text-sm text-gray-600">Use a clear subject line and formal tone</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Follow Up</h3>
                <p className="text-sm text-gray-600">Send a polite follow-up after 1-2 weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Proofread</h3>
                <p className="text-sm text-gray-600">Check for spelling and grammar errors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
