import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Resume } from '../types/resume';
import { Sparkles, TrendingUp, Target, Award, Lightbulb, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface ResumeScoreCardProps {
  resume: Resume;
}

interface ScoreData {
  atsScore: number;
  impactScore: number;
  overallScore: number;
  keywordMatch: number;
  sections: {
    summary: { score: number; feedback: string; suggestions: string[] };
    experience: { score: number; feedback: string; suggestions: string[] };
    education: { score: number; feedback: string; suggestions: string[] };
    skills: { score: number; feedback: string; suggestions: string[] };
  };
  strengths: string[];
  weaknesses: string[];
  quickWins: string[];
  industryBenchmark: string;
}

export default function ResumeScoreCard({ resume }: ResumeScoreCardProps) {
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<ScoreData | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  // Reset scores when resume changes
  useEffect(() => {
    setScores(null);
    setShowDetails(false);
  }, [resume.id]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 border-green-300';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    return 'text-red-600 bg-red-100 border-red-300';
  };

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('score-resume', {
        body: { resume }
      });

      if (error) throw error;

      setScores(data);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been scored successfully.",
      });
    } catch (error: any) {
      console.error('Error analyzing resume:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!scores) {
    return (
      <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 rounded-full">
              <Sparkles className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">AI Resume Insights</h3>
          <p className="text-gray-600 mb-6">
            Get instant ATS scoring, impact analysis, and actionable feedback to beat 75% of other applicants
          </p>
          <button 
            onClick={analyzeResume}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {loading ? (
              <>Analyzing...</>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Analyze My Resume
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Score Display */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-4xl font-bold p-4 rounded-xl border-2 ${getScoreColor(scores.overallScore)}`}>
              {scores.overallScore}
            </div>
            <p className="text-sm font-semibold mt-2">Overall Score</p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold p-4 rounded-xl border-2 ${getScoreColor(scores.atsScore)}`}>
              {scores.atsScore}
            </div>
            <p className="text-sm font-semibold mt-2">ATS Score</p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold p-4 rounded-xl border-2 ${getScoreColor(scores.impactScore)}`}>
              {scores.impactScore}
            </div>
            <p className="text-sm font-semibold mt-2">Impact Score</p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold p-4 rounded-xl border-2 ${getScoreColor(scores.keywordMatch)}`}>
              {scores.keywordMatch}
            </div>
            <p className="text-sm font-semibold mt-2">Keywords</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="px-6 py-2 border-2 border-purple-300 rounded-lg hover:bg-purple-50 transition-all font-semibold"
          >
            {showDetails ? 'Hide Details' : 'Show Detailed Insights'}
          </button>
        </div>
      </div>

      {/* Detailed Analysis */}
      {showDetails && (
        <>
          {/* Quick Wins */}
          <div className="p-6 border-2 border-green-200 rounded-xl bg-white shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold">Quick Wins</h3>
            </div>
            <ul className="space-y-2">
              {scores.quickWins.map((win, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{win}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border-2 border-blue-200 rounded-xl bg-white shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {scores.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">★</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 border-2 border-orange-200 rounded-xl bg-white shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl font-bold">Areas to Improve</h3>
              </div>
              <ul className="space-y-2">
                {scores.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">!</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section Scores */}
          <div className="p-6 border-2 border-slate-200 rounded-xl bg-white shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold">Section Analysis</h3>
            </div>
            <div className="space-y-4">
              {Object.entries(scores.sections).map(([section, data]) => (
                <div key={section} className="border-l-4 border-purple-400 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold capitalize">{section}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(data.score)}`}>
                      {data.score}/100
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{data.feedback}</p>
                  {data.suggestions.length > 0 && (
                    <ul className="text-sm space-y-1">
                      {data.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-gray-700">→ {suggestion}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Industry Benchmark */}
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
              <h3 className="text-xl font-bold">Industry Benchmark</h3>
            </div>
            <p className="text-gray-700">{scores.industryBenchmark}</p>
          </div>

          <div className="text-center">
            <button 
              onClick={analyzeResume}
              disabled={loading}
              className="px-6 py-2 border-2 border-purple-300 rounded-lg hover:bg-purple-50 transition-all font-semibold disabled:opacity-50"
            >
              <span className="flex items-center gap-2 justify-center">
                <Sparkles className="h-4 w-4" />
                Re-analyze Resume
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
