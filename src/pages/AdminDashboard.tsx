import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Users, FileText, Activity, TrendingUp, Search } from 'lucide-react';
import Navigation from '../components/Navigation';

interface AdminDashboardProps {
  user: any;
}

interface UserStats {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  resume_count: number;
  username?: string;
  is_admin: boolean;
  last_active: string;
}

interface Metrics {
  totalUsers: number;
  totalAdmins: number;
  activeUsers: number;
  totalResumes: number;
  totalCoverLetters: number;
  totalJobApplications: number;
  popularTemplate: string;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  avgResumesPerUser: number;
  coverLettersThisMonth: number;
  jobApplicationsThisMonth: number;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserStats[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    totalUsers: 0,
    totalAdmins: 0,
    activeUsers: 0,
    totalResumes: 0,
    totalCoverLetters: 0,
    totalJobApplications: 0,
    popularTemplate: 'N/A',
    newUsersThisWeek: 0,
    newUsersThisMonth: 0,
    avgResumesPerUser: 0,
    coverLettersThisMonth: 0,
    jobApplicationsThisMonth: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setIsAdmin(true);
        await Promise.all([fetchUsers(), fetchMetrics()]);
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      // Get ALL user emails from auth.users using the admin function
      const { data: userEmails, error: emailError } = await supabase
        .rpc('get_user_emails_for_admin');

      if (emailError) throw emailError;

      // Get all profiles
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('user_id, username, full_name, created_at, updated_at');

      if (profileError) throw profileError;

      // Create profile map
      const profileMap = (profiles || []).reduce((acc: any, profile: any) => {
        acc[profile.user_id] = profile;
        return acc;
      }, {});

      // Get user roles to identify admins
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Create role map
      const roleMap = (roles || []).reduce((acc: any, role: any) => {
        acc[role.user_id] = role.role;
        return acc;
      }, {});

      // Get resume counts for each user
      const { data: resumeCounts, error: resumeError } = await supabase
        .from('resumes')
        .select('user_id, updated_at');

      if (resumeError) throw resumeError;

      // Count resumes per user and get last activity
      const resumeCountMap = (resumeCounts || []).reduce((acc: any, resume: any) => {
        if (!acc[resume.user_id]) {
          acc[resume.user_id] = { count: 0, lastActivity: resume.updated_at };
        }
        acc[resume.user_id].count += 1;
        // Track most recent activity
        if (new Date(resume.updated_at) > new Date(acc[resume.user_id].lastActivity)) {
          acc[resume.user_id].lastActivity = resume.updated_at;
        }
        return acc;
      }, {});

      // Map ALL users from auth.users to UserStats format
      const userStats: UserStats[] = (userEmails || []).map((authUser: any) => {
        const profile = profileMap[authUser.user_id];
        const resumeData = resumeCountMap[authUser.user_id] || { count: 0, lastActivity: profile?.created_at || new Date().toISOString() };
        const lastActive = profile?.updated_at > resumeData.lastActivity ? profile.updated_at : resumeData.lastActivity;
        
        return {
          id: authUser.user_id,
          email: authUser.email || 'N/A',
          created_at: profile?.created_at || new Date().toISOString(),
          last_sign_in_at: lastActive,
          last_active: lastActive,
          resume_count: resumeData.count,
          username: profile?.username || profile?.full_name || authUser.email?.split('@')[0] || 'N/A',
          is_admin: roleMap[authUser.user_id] === 'admin'
        };
      });

      // Sort: admins first, then by last activity
      userStats.sort((a, b) => {
        if (a.is_admin && !b.is_admin) return -1;
        if (!a.is_admin && b.is_admin) return 1;
        return new Date(b.last_active).getTime() - new Date(a.last_active).getTime();
      });

      setUsers(userStats);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      // Get all users from auth.users
      const { data: allUsers } = await supabase.rpc('get_user_emails_for_admin');
      const { data: roles } = await supabase.from('user_roles').select('user_id, role');
      
      const roleMap = (roles || []).reduce((acc: any, role: any) => {
        acc[role.user_id] = role.role;
        return acc;
      }, {});

      const adminUserIds = Object.entries(roleMap)
        .filter(([_, role]) => role === 'admin')
        .map(([userId]) => userId);

      const regularUsers = (allUsers || []).filter((u: any) => !adminUserIds.includes(u.user_id));
      
      // Total users (excluding admins)
      const totalUsers = regularUsers.length;
      const totalAdmins = adminUserIds.length;

      // Get profiles for date-based metrics
      const { data: profiles } = await supabase.from('profiles').select('user_id, created_at');
      const regularProfiles = (profiles || []).filter(p => !adminUserIds.includes(p.user_id));

      // New users this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const newUsersThisWeek = regularProfiles.filter(
        p => new Date(p.created_at) >= oneWeekAgo
      ).length;

      // New users this month
      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
      const newUsersThisMonth = regularProfiles.filter(
        p => new Date(p.created_at) >= oneMonthAgo
      ).length;

      // Active users (activity in last 30 days)
      const { data: recentResumes } = await supabase
        .from('resumes')
        .select('user_id, updated_at')
        .gte('updated_at', oneMonthAgo.toISOString());

      const activeUserIds = new Set(
        (recentResumes || [])
          .filter(r => !adminUserIds.includes(r.user_id))
          .map(r => r.user_id)
      );
      const activeUsers = activeUserIds.size;

      // Total resumes
      const { count: totalResumes } = await supabase
        .from('resumes')
        .select('*', { count: 'exact', head: true });

      // Total cover letters
      const { count: totalCoverLetters } = await supabase
        .from('cover_letters')
        .select('*', { count: 'exact', head: true });

      // Total job applications
      const { count: totalJobApplications } = await supabase
        .from('job_applications')
        .select('*', { count: 'exact', head: true });

      // Cover letters this month
      const { count: coverLettersThisMonth } = await supabase
        .from('cover_letters')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', oneMonthAgo.toISOString());

      // Job applications this month
      const { count: jobApplicationsThisMonth } = await supabase
        .from('job_applications')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', oneMonthAgo.toISOString());

      // Most popular template
      const { data: templates } = await supabase
        .from('resumes')
        .select('template_id');

      const templateCounts = (templates || []).reduce((acc: any, resume: any) => {
        acc[resume.template_id] = (acc[resume.template_id] || 0) + 1;
        return acc;
      }, {});

      const popularTemplate = Object.entries(templateCounts).length > 0
        ? Object.entries(templateCounts).reduce((a: any, b: any) => a[1] > b[1] ? a : b)[0]
        : 'N/A';

      // Average resumes per user
      const avgResumesPerUser = totalUsers > 0 ? ((totalResumes || 0) / totalUsers).toFixed(1) : '0';

      setMetrics({
        totalUsers,
        totalAdmins,
        activeUsers,
        totalResumes: totalResumes || 0,
        totalCoverLetters: totalCoverLetters || 0,
        totalJobApplications: totalJobApplications || 0,
        popularTemplate: String(popularTemplate),
        newUsersThisWeek,
        newUsersThisMonth,
        avgResumesPerUser: parseFloat(avgResumesPerUser),
        coverLettersThisMonth: coverLettersThisMonth || 0,
        jobApplicationsThisMonth: jobApplicationsThisMonth || 0
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const handleDeleteUser = async (userId: string, isAdmin: boolean) => {
    if (isAdmin) {
      alert('Admin accounts cannot be deleted from this interface.');
      return;
    }

    if (!confirm('Are you sure you want to delete this user? This will permanently delete their account, profile, and all associated data.')) {
      return;
    }

    try {
      // Delete the user's profile and roles (will cascade)
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);

      if (profileError) throw profileError;

      // Update local state
      setUsers(users.filter(u => u.id !== userId));
      
      // Refresh metrics
      await fetchMetrics();
      
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You do not have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navigation user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-blue-500" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">{metrics.totalUsers}</h3>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <div className="mt-2 text-xs text-slate-600">
              +{metrics.newUsersThisWeek} this week
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">{metrics.activeUsers}</h3>
            <p className="text-sm text-muted-foreground">Active Users (30d)</p>
            <div className="mt-2 text-xs text-slate-600">
              {((metrics.activeUsers / (metrics.totalUsers || 1)) * 100).toFixed(0)}% of total
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold">{metrics.totalResumes}</h3>
            <p className="text-sm text-muted-foreground">Total Resumes</p>
            <div className="mt-2 text-xs text-slate-600">
              Avg {metrics.avgResumesPerUser} per user
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold">{metrics.totalCoverLetters}</h3>
            <p className="text-sm text-muted-foreground">Cover Letters</p>
            <div className="mt-2 text-xs text-slate-600">
              +{metrics.coverLettersThisMonth} this month
            </div>
          </div>
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Admins</h3>
            </div>
            <p className="text-3xl font-bold text-blue-900">{metrics.totalAdmins}</p>
            <p className="text-xs text-blue-700 mt-1">System administrators</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">This Month</h3>
            </div>
            <p className="text-3xl font-bold text-green-900">+{metrics.newUsersThisMonth}</p>
            <p className="text-xs text-green-700 mt-1">New users in last 30 days</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-900">Job Apps</h3>
            </div>
            <p className="text-3xl font-bold text-purple-900">{metrics.totalJobApplications}</p>
            <p className="text-xs text-purple-700 mt-1">+{metrics.jobApplicationsThisMonth} this month</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-lg border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-orange-900">Template</h3>
            </div>
            <p className="text-2xl font-bold text-orange-900 capitalize">{metrics.popularTemplate}</p>
            <p className="text-xs text-orange-700 mt-1">Most popular design</p>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Username</th>
                  <th className="text-left py-3 px-4 font-semibold">Sign-up Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Last Active</th>
                  <th className="text-left py-3 px-4 font-semibold">Resumes</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={`border-b border-slate-100 hover:bg-slate-50 ${user.is_admin ? 'bg-blue-50' : ''}`}>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        user.is_admin 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.is_admin ? 'ADMIN' : 'USER'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{user.email}</td>
                    <td className="py-3 px-4 font-medium">{user.username}</td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-600">
                        {getTimeAgo(user.last_active)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-semibold">
                        {user.resume_count}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.is_admin ? (
                        <span className="text-xs text-slate-400 italic">Protected</span>
                      ) : (
                        <button
                          onClick={() => handleDeleteUser(user.id, user.is_admin)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-semibold"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
