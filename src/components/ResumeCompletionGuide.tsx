import { CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { CompletionInfo } from '../utils/resumeCompletion';

interface ResumeCompletionGuideProps {
  completionInfo: CompletionInfo;
  onSectionClick?: (section: string) => void;
}

export default function ResumeCompletionGuide({ completionInfo, onSectionClick }: ResumeCompletionGuideProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const sections = [
    { name: 'Personal Information', score: completionInfo.sectionScores.personalInfo, maxScore: 30, key: 'personal' },
    { name: 'Work Experience', score: completionInfo.sectionScores.experience, maxScore: 25, key: 'experience' },
    { name: 'Education', score: completionInfo.sectionScores.education, maxScore: 20, key: 'education' },
    { name: 'Skills', score: completionInfo.sectionScores.skills, maxScore: 15, key: 'skills' },
    { name: 'Additional Sections', score: completionInfo.sectionScores.additional, maxScore: 10, key: 'projects' }
  ];
  
  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">Resume Completion Details</span>
          <span className={`text-sm font-medium ${completionInfo.percentage >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
            {completionInfo.percentage}%
          </span>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {sections.map((section) => {
            const isComplete = section.score === section.maxScore;
            const percentage = Math.round((section.score / section.maxScore) * 100);
            
            return (
              <div
                key={section.key}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onSectionClick?.(section.key)}
              >
                <div className="flex items-center gap-2 flex-1">
                  {isComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{section.name}</div>
                    <div className="text-xs text-gray-600">
                      {section.score} / {section.maxScore} points ({percentage}%)
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {isComplete ? 'Complete' : 'Incomplete'}
                </div>
              </div>
            );
          })}
          
          {completionInfo.missingFields.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm">Missing or Incomplete:</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                {completionInfo.missingFields.map((field, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{field}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
