import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';

interface ResumeUploaderProps {
  onResumeExtracted: (resumeData: any) => void;
}

export default function ResumeUploader({ onResumeExtracted }: ResumeUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF, DOCX, or TXT file',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Maximum file size is 5MB',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // Read file content
      const fileContent = await readFileContent(selectedFile);

      // Parse resume using AI
      const { data, error } = await supabase.functions.invoke('parse-resume-upload', {
        body: {
          fileContent,
          fileName: selectedFile.name,
        },
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: 'Resume uploaded successfully',
          description: 'Your resume has been parsed and extracted',
        });
        onResumeExtracted(data.resumeData);
        setSelectedFile(null);
      } else {
        throw new Error('Failed to parse resume');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to process resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
        <label
          htmlFor="resume-upload"
          className="cursor-pointer flex flex-col items-center gap-3"
        >
          {selectedFile ? (
            <>
              <FileText className="w-12 h-12 text-blue-600" />
              <div>
                <p className="font-semibold text-slate-900">{selectedFile.name}</p>
                <p className="text-sm text-slate-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-slate-400" />
              <div>
                <p className="font-semibold text-slate-900">Click to upload resume</p>
                <p className="text-sm text-slate-500">PDF, DOCX, or TXT (max 5MB)</p>
              </div>
            </>
          )}
        </label>
      </div>

      {selectedFile && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload & Extract
            </>
          )}
        </button>
      )}
    </div>
  );
}
