import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { FileText, Mail, Trash2, Calendar, Building } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface CoverLetter {
  id: string;
  job_title: string;
  company_name: string;
  content: string;
  created_at: string;
  letter_type: string;
}

interface CoverLettersSectionProps {
  // user prop not needed as we use Supabase RLS
}

export default function CoverLettersSection({}: CoverLettersSectionProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [letters, setLetters] = useState<CoverLetter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      // Fetch both cover letters and job applications
      const [coverLettersRes, jobAppsRes] = await Promise.all([
        supabase
          .from('cover_letters')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('job_applications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      const allLetters = [
        ...(coverLettersRes.data || []).map(l => ({ ...l, letter_type: 'cover_letter' })),
        ...(jobAppsRes.data || []).map(l => ({ ...l, letter_type: 'application_letter' }))
      ]
        .filter(l => l.created_at) // Filter out any with null created_at
        .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
        .slice(0, 5);

      setLetters(allLetters as CoverLetter[]);
    } catch (error) {
      console.error('Error fetching letters:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLetter = async (id: string, type: string) => {
    if (!confirm('Are you sure you want to delete this letter?')) return;

    try {
      const table = type === 'cover_letter' ? 'cover_letters' : 'job_applications';
      const { error } = await supabase.from(table).delete().eq('id', id);

      if (error) throw error;

      setLetters(letters.filter(l => l.id !== id));
      toast({
        title: 'Deleted successfully',
        description: 'Letter has been removed',
      });
    } catch (error) {
      console.error('Error deleting letter:', error);
      toast({
        title: 'Delete failed',
        description: 'Failed to delete letter',
        variant: 'destructive',
      });
    }
  };

  const handleSendLetter = (letter: CoverLetter) => {
    // Navigate to email integration with letter data
    navigate('/email-integration', { 
      state: { 
        selectedLetter: letter 
      } 
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">My Cover Letters & Applications</h3>
        <div className="text-center py-8 text-slate-600">Loading...</div>
      </div>
    );
  }

  if (letters.length === 0) {
    return null; // Don't show section if no letters
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-slate-900">My Cover Letters & Applications</h3>
        <button
          onClick={() => navigate('/cover-letter')}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {letters.map((letter) => (
          <div
            key={letter.id}
            className="bg-white border-2 border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  letter.letter_type === 'cover_letter' 
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {letter.letter_type === 'cover_letter' ? 'Cover Letter' : 'Application'}
                </span>
              </div>
              <button
                onClick={() => deleteLetter(letter.id, letter.letter_type)}
                className="text-slate-400 hover:text-red-600 transition-colors"
                title="Delete letter"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-slate-900 line-clamp-1">
                {letter.job_title}
              </h4>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Building className="h-4 w-4" />
                <span className="line-clamp-1">{letter.company_name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(letter.created_at)}</span>
              </div>
            </div>

            <button
              onClick={() => handleSendLetter(letter)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold"
            >
              <Mail className="h-4 w-4" />
              Send via Email
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
