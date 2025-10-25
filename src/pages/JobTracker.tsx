import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import Navigation from '../components/Navigation';
import { Briefcase, Calendar, Building2, Trash2, Search, X, Edit, Eye } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface JobApplication {
  id: string;
  company_name: string;
  job_title: string;
  job_description: string;
  content: string;
  availability_date: string | null;
  salary_expectation: string | null;
  created_at: string | null;
  updated_at: string | null;
  status?: 'applied' | 'interview' | 'offer' | 'rejected';
  notes?: string;
}

interface JobTrackerProps {
  user: User;
}

export default function JobTracker({ user }: JobTrackerProps) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<JobApplication>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id: string) => {
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id);

    if (!error) {
      toast({
        title: 'Deleted',
        description: 'Application removed successfully',
      });
      fetchApplications();
      setSelectedApplication(null);
    }
  };

  const updateApplication = async () => {
    if (!selectedApplication) return;

    const { error } = await supabase
      .from('job_applications')
      .update(editForm)
      .eq('id', selectedApplication.id);

    if (!error) {
      toast({
        title: 'Updated',
        description: 'Application updated successfully',
      });
      fetchApplications();
      setIsEditing(false);
      setSelectedApplication(null);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update application',
        variant: 'destructive',
      });
    }
  };

  const openEditMode = (app: JobApplication) => {
    setSelectedApplication(app);
    setEditForm({
      status: app.status || 'applied',
      notes: app.notes || '',
      salary_expectation: app.salary_expectation || '',
      availability_date: app.availability_date || '',
    });
    setIsEditing(true);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysAgo = (date: string | null) => {
    if (!date) return 'Unknown';
    const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const getStatusBadge = (status?: string) => {
    const styles = {
      applied: 'bg-blue-100 text-blue-800 border-blue-200',
      interview: 'bg-purple-100 text-purple-800 border-purple-200',
      offer: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
    };
    const label = status || 'applied';
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${styles[label as keyof typeof styles]}`}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </span>
    );
  };

  const filteredApplications = applications.filter(app =>
    app.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navigation user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Job Application Tracker</h1>
          <p className="text-lg text-slate-600">Keep track of all your job applications in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{applications.length}</div>
                <div className="text-sm text-slate-600">Total Applications</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">
                    {applications.filter(app => {
                      if (!app.created_at) return false;
                      const daysAgo = Math.floor((Date.now() - new Date(app.created_at).getTime()) / (1000 * 60 * 60 * 24));
                      return daysAgo <= 7;
                    }).length}
                  </div>
                  <div className="text-sm text-slate-600">This Week</div>
                </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">
                  {new Set(applications.map(app => app.company_name)).size}
                </div>
                <div className="text-sm text-slate-600">Companies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by company or job title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="text-center py-12 text-slate-600">
            Loading your applications...
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-12 bg-white border-2 border-slate-200 rounded-xl">
            <Briefcase className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              {searchQuery ? 'No matching applications' : 'No applications yet'}
            </h2>
            <p className="text-slate-600 mb-6">
              {searchQuery ? 'Try a different search term' : 'Start applying to jobs to track them here'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-slate-900">{app.job_title}</h3>
                          {getStatusBadge(app.status)}
                        </div>
                        <p className="text-slate-600 font-medium">{app.company_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Applied {getDaysAgo(app.created_at)}</span>
                      </div>
                      {app.created_at && (
                        <>
                          <span>•</span>
                          <span>{formatDate(app.created_at)}</span>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {app.salary_expectation && (
                        <div className="text-slate-600">
                          <span className="font-semibold">Salary:</span> {app.salary_expectation}
                        </div>
                      )}
                      {app.availability_date && (
                        <div className="text-slate-600">
                          <span className="font-semibold">Available:</span> {app.availability_date}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="p-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                      title="View details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openEditMode(app)}
                      className="p-2 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                      title="Edit application"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="p-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      title="Delete application"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Details Modal */}
        {selectedApplication && !isEditing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
                <div>
                  <h3 className="text-xl font-bold">{selectedApplication.job_title}</h3>
                  <p className="text-slate-600">{selectedApplication.company_name}</p>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-slate-700">Status:</label>
                  {getStatusBadge(selectedApplication.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedApplication.salary_expectation && (
                    <div>
                      <label className="text-sm font-semibold text-slate-700">Salary Expectation</label>
                      <p className="text-slate-900">{selectedApplication.salary_expectation}</p>
                    </div>
                  )}
                  {selectedApplication.availability_date && (
                    <div>
                      <label className="text-sm font-semibold text-slate-700">Availability</label>
                      <p className="text-slate-900">{selectedApplication.availability_date}</p>
                    </div>
                  )}
                </div>

                {selectedApplication.notes && (
                  <div>
                    <label className="text-sm font-semibold text-slate-700">Notes</label>
                    <p className="text-slate-600 whitespace-pre-wrap bg-slate-50 p-3 rounded-lg">{selectedApplication.notes}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-slate-700">Job Description</label>
                  <p className="text-slate-600 whitespace-pre-wrap bg-slate-50 p-3 rounded-lg max-h-48 overflow-y-auto">{selectedApplication.job_description}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Application Letter</label>
                  <p className="text-slate-600 whitespace-pre-wrap bg-slate-50 p-3 rounded-lg max-h-64 overflow-y-auto">{selectedApplication.content}</p>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => openEditMode(selectedApplication)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteApplication(selectedApplication.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditing && selectedApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
                <h3 className="text-xl font-bold">Edit Application</h3>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedApplication(null);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                  <select
                    value={editForm.status || 'applied'}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-purple-600 focus:outline-none"
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Salary Expectation</label>
                  <input
                    type="text"
                    value={editForm.salary_expectation || ''}
                    onChange={(e) => setEditForm({ ...editForm, salary_expectation: e.target.value })}
                    placeholder="e.g., $120,000 - $150,000"
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Availability Date</label>
                  <input
                    type="text"
                    value={editForm.availability_date || ''}
                    onChange={(e) => setEditForm({ ...editForm, availability_date: e.target.value })}
                    placeholder="e.g., Immediately / Two weeks notice"
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Notes</label>
                  <textarea
                    value={editForm.notes || ''}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    placeholder="Add notes about this application..."
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-purple-600 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={updateApplication}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedApplication(null);
                    }}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
