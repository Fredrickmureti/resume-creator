import { FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

interface NavigationProps {
  user?: any;
}

export default function Navigation({ user }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-900 hover:text-slate-700 transition-colors"
          >
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-bold text-lg sm:text-xl md:text-2xl">Create Resume</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 font-medium text-sm sm:text-base transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/features')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 font-medium text-sm sm:text-base transition-colors ${
                    location.pathname === '/features'
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => navigate('/job-tracker')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 font-medium text-sm sm:text-base transition-colors ${
                    location.pathname === '/job-tracker'
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Job Tracker
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-slate-900 text-slate-900 rounded-lg font-medium text-sm sm:text-base hover:bg-slate-50 transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 font-medium text-sm sm:text-base transition-colors ${
                    location.pathname === '/'
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => navigate('/features')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 font-medium text-sm sm:text-base transition-colors ${
                    location.pathname === '/features'
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-slate-800 transition-all"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
