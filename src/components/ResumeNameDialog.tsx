import { useState } from 'react';
import { X } from 'lucide-react';

interface ResumeNameDialogProps {
  onConfirm: (name: string) => void;
  onCancel: () => void;
  defaultName?: string;
}

export default function ResumeNameDialog({ onConfirm, onCancel, defaultName }: ResumeNameDialogProps) {
  const [resumeName, setResumeName] = useState(defaultName || `Resume - ${new Date().toLocaleDateString()}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeName.trim()) {
      onConfirm(resumeName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Name Your Resume</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <p className="text-slate-600 mb-6">
          Give your resume a meaningful name to easily identify it later.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="resume-name" className="block text-sm font-medium text-slate-900 mb-2">
              Resume Name
            </label>
            <input
              id="resume-name"
              type="text"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              placeholder="e.g., Software Engineer Resume"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              maxLength={100}
              autoFocus
            />
            <p className="text-xs text-slate-500 mt-1">
              {resumeName.length}/100 characters
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!resumeName.trim()}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
