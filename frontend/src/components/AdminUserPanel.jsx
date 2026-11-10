import React, { useState } from 'react';
import { 
  Users, Shield, ShieldCheck, UserPlus, CheckCircle2, XCircle, 
  Clock, AlertCircle, Search, Filter, Lock, Key, Award, 
  ExternalLink, FileText, Check, Briefcase, Mail, Phone, 
  Building2, Trash2, Edit3, ArrowRight, UserCheck, Sparkles, RefreshCw
} from 'lucide-react';

export const ROLE_PERMISSIONS = {
  admin: {
    title: 'Category 1: Admin',
    roleKey: 'admin',
    priority: 1,
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    allowedTabs: ['workflows', 'inbox', 'storefront', 'products', 'editor', 'ads', 'payments', 'logs', 'users', 'customers'],
    canApproveRecruitment: true,
    canEditPricing: true,
    canAccessGateways: true,
    description: 'Full unconstrained platform authority. Approves staff recruitment applications, configures payout bank accounts, controls automated workflows, and reviews system logs.'
  },
  moderator: {
    title: 'Category 2: Moderator',
    roleKey: 'moderator',
    priority: 2,
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    allowedTabs: ['inbox', 'storefront', 'products', 'editor', 'customers', 'users'],
    canApproveRecruitment: false,
    canEditPricing: true,
    canAccessGateways: false,
    description: 'Storefront content management, product pricing tiers, customer inquiries, and order verification. Restricted from banking configurations and system diagnostics.'
  },
  service_provider: {
    title: 'Category 3: Service Provider',
    roleKey: 'service_provider',
    priority: 3,
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    allowedTabs: ['storefront', 'products'],
    canApproveRecruitment: false,
    canEditPricing: false,
    canAccessGateways: false,
    description: 'Print-on-Demand (POD) fulfillment partners, hub dispatchers, and print tech operators. Access to order production queue and product technical specifications only.'
  },
  customer_care: {
    title: 'Category 4: Customer Care Representative',
    roleKey: 'customer_care',
    priority: 4,
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    allowedTabs: ['inbox', 'customers', 'storefront'],
    canApproveRecruitment: false,
    canEditPricing: false,
    canAccessGateways: false,
    description: 'Frontline customer communication, live chat assistance, WhatsApp/Messenger inboxes, order status inquiries, and registered VIP customer service.'
  }
};

export const DEFAULT_ADMIN_USERS = [
  {
    id: 'usr-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@printflow.store',
    phone: '+1 (555) 019-4821',
    role: 'admin',
    categoryName: 'Category 1: Admin',
    department: 'Executive / Platform Ownership',
    status: 'ACTIVE',
    accessPriority: 1,
    joinedDate: '2025-06-12',
    avatar: '👩‍💼',
    permissions: 'Full System Control, Bank Payouts, Staff Recruitment, Automation Workflows'
  },
  {
    id: 'usr-2',
    name: 'David Sterling',
    email: 'david.s@printflow.store',
    phone: '+1 (555) 018-3920',
    role: 'moderator',
    categoryName: 'Category 2: Moderator',
    department: 'Storefront & Catalog Operations',
    status: 'ACTIVE',
    accessPriority: 2,
    joinedDate: '2025-09-18',
    avatar: '👨‍💻',
    permissions: 'Catalog Inventory, Pricing Tiers, Visual Storefront Editor, Order Reviews'
  },
  {
    id: 'usr-3',
    name: 'Detroit POD Logistics Hub (Prodigi/Gelato Partner)',
    email: 'operations.detroit@printflowhub.com',
    phone: '+1 (313) 555-0144',
    role: 'service_provider',
    categoryName: 'Category 3: Service Provider',
    department: 'POD Production & Fulfillment',
    status: 'ACTIVE',
    accessPriority: 3,
    joinedDate: '2026-01-10',
    avatar: '🏭',
    permissions: 'Orders Queue, POD Dispatch, Technical Barcode Specifications'
  },
  {
    id: 'usr-4',
    name: 'Maya Lin',
    email: 'maya.lin@printflow.store',
    phone: '+1 (555) 017-8821',
    role: 'customer_care',
    categoryName: 'Category 4: Customer Care Representative',
    department: 'Customer Relations & Omnichannel Chat',
    status: 'ACTIVE',
    accessPriority: 4,
    joinedDate: '2026-03-24',
    avatar: '🎧',
    permissions: 'Live Chat Support, WhatsApp/Messenger Inbox, Order Tracking Inquiries, VIP Customer Assistance'
  }
];

export const DEFAULT_RECRUITMENT_APPLICATIONS = [
  {
    id: 'app-101',
    name: 'Liam Gallagher',
    email: 'liam.g@londonprinttech.co.uk',
    phone: '+44 20 7946 0881',
    country: 'UK',
    roleApplied: 'service_provider',
    categoryTarget: 'Category 3: Service Provider',
    department: 'UK & EU Print Fulfillment (London Facility)',
    experience: '8+ years managing digital DTG, wide-format vinyl printing & high-speed card cutters.',
    portfolioUrl: 'https://linkedin.com/in/liam-gallagher-print',
    statement: 'We operate a certified ISO-9001 printing hub in London with 24-hour turnaround for UK orders. Excited to connect directly to the PrintFlow POD automation platform.',
    status: 'PENDING_ADMIN_APPROVAL',
    appliedDate: '2026-11-08'
  },
  {
    id: 'app-102',
    name: 'Amara Okafor',
    email: 'amara.okafor@carehub.io',
    phone: '+1 (416) 555-0177',
    country: 'CA',
    roleApplied: 'customer_care',
    categoryTarget: 'Category 4: Customer Care Representative',
    department: 'Bilingual Customer Support (English & French)',
    experience: '4 years customer support experience across Zendesk, WhatsApp Business, and Shopify live chat.',
    portfolioUrl: 'https://linkedin.com/in/amara-okafor-support',
    statement: 'Fluent in English and French, specialized in eCommerce order disputes, color matching inquiries, and shipping tracking updates.',
    status: 'PENDING_ADMIN_APPROVAL',
    appliedDate: '2026-11-09'
  },
  {
    id: 'app-103',
    name: 'Julian Vance',
    email: 'julian.vance@creativestudios.com',
    phone: '+1 (415) 555-0132',
    country: 'US',
    roleApplied: 'moderator',
    categoryTarget: 'Category 2: Moderator',
    department: 'Storefront Curation & Mockup QA',
    experience: '6 years e-commerce merchandising, typography design, and storefront conversion rate optimization.',
    portfolioUrl: 'https://behance.net/julianvance',
    statement: 'Passionate about typography, layout precision, and quality control on luxury card finishes.',
    status: 'PENDING_ADMIN_APPROVAL',
    appliedDate: '2026-11-10'
  }
];

export default function AdminUserPanel({
  currentUserRole = 'admin',
  onRoleChange,
  storeTheme = 'light'
}) {
  const isLight = storeTheme === 'light';
  const [activeSubTab, setActiveSubTab] = useState('directory'); // 'directory' | 'applications' | 'recruitment_form' | 'permissions_matrix'
  const [users, setUsers] = useState(DEFAULT_ADMIN_USERS);
  const [applications, setApplications] = useState(DEFAULT_RECRUITMENT_APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // Recruitment Application Form State
  const [applicantForm, setApplicantForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'US',
    roleApplied: 'moderator',
    department: 'Storefront Operations',
    experience: '',
    portfolioUrl: '',
    statement: '',
    agreeConfidentiality: true
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleApproveApplication = (app) => {
    if (currentUserRole !== 'admin') {
      showToast('Permission Denied: Only Category 1 Admin has authority to approve staff recruitments.', 'error');
      return;
    }

    // Add to Active Staff Directory
    const newUser = {
      id: `usr-${Date.now()}`,
      name: app.name,
      email: app.email,
      phone: app.phone,
      role: app.roleApplied,
      categoryName: ROLE_PERMISSIONS[app.roleApplied]?.title || app.categoryTarget,
      department: app.department,
      status: 'ACTIVE',
      accessPriority: ROLE_PERMISSIONS[app.roleApplied]?.priority || 3,
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: app.roleApplied === 'service_provider' ? '🏭' : app.roleApplied === 'customer_care' ? '🎧' : '👨‍💻',
      permissions: ROLE_PERMISSIONS[app.roleApplied]?.description || 'Authorized Personnel'
    };

    setUsers(prev => [...prev, newUser]);
    setApplications(prev => prev.filter(a => a.id !== app.id));
    showToast(`Recruitment Approved! ${app.name} is now registered as ${newUser.categoryName}.`);
  };

  const handleRejectApplication = (appId) => {
    if (currentUserRole !== 'admin') {
      showToast('Permission Denied: Only Category 1 Admin can reject applications.', 'error');
      return;
    }

    setApplications(prev => prev.filter(a => a.id !== appId));
    showToast('Applicant removed from approval queue.');
  };

  const handleSubmitRecruitment = (e) => {
    e.preventDefault();
    if (!applicantForm.name.trim() || !applicantForm.email.trim()) {
      showToast('Please fill in applicant full name and email.', 'error');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      name: applicantForm.name,
      email: applicantForm.email,
      phone: applicantForm.phone || '+1 (555) 000-0000',
      country: applicantForm.country,
      roleApplied: applicantForm.roleApplied,
      categoryTarget: ROLE_PERMISSIONS[applicantForm.roleApplied]?.title || 'Staff Role',
      department: applicantForm.department,
      experience: applicantForm.experience,
      portfolioUrl: applicantForm.portfolioUrl || 'Provided on request',
      statement: applicantForm.statement,
      status: 'PENDING_ADMIN_APPROVAL',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Application for "${applicantForm.name}" submitted! Awaiting Category 1 Admin approval.`);
    setActiveSubTab('applications');

    // Reset Form
    setApplicantForm({
      name: '',
      email: '',
      phone: '',
      country: 'US',
      roleApplied: 'moderator',
      department: 'Storefront Operations',
      experience: '',
      portfolioUrl: '',
      statement: '',
      agreeConfidentiality: true
    });
  };

  const handleDeleteUser = (userId) => {
    if (currentUserRole !== 'admin') {
      showToast('Only Admin can revoke staff access.', 'error');
      return;
    }
    if (window.confirm('Are you sure you want to revoke this user access?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      showToast('Staff access revoked.');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = applications.length;

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 ${isLight ? 'admin-light-mode text-slate-900' : 'text-slate-100'}`}>
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all ${
          toast.type === 'error'
            ? 'bg-rose-950/90 text-rose-200 border-rose-500/40'
            : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
        }`}>
          {toast.type === 'error' ? <XCircle className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner & Live Role Switcher */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl shadow-xl border ${
        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight">Admin User Panel & Access Control</h1>
              <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                RBAC Priority
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Preserve admin panel access based on priority: Admin (All Access) • Moderator (Cat 2) • Service Provider (Cat 3) • Customer Care (Cat 4)
            </p>
          </div>
        </div>

        {/* Interactive Active Role Simulator */}
        <div className={`p-2 rounded-xl border flex items-center space-x-2 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Simulate Active Role:</span>
            <span className="text-xs font-bold text-indigo-400">
              {ROLE_PERMISSIONS[currentUserRole]?.title}
            </span>
          </div>

          <select
            value={currentUserRole}
            onChange={(e) => onRoleChange && onRoleChange(e.target.value)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg px-2.5 py-1.5 focus:outline-none transition cursor-pointer"
          >
            <option value="admin">Priority 1: Admin (All Access)</option>
            <option value="moderator">Priority 2: Moderator (Operations)</option>
            <option value="service_provider">Priority 3: Service Provider (POD)</option>
            <option value="customer_care">Priority 4: Customer Care Rep</option>
          </select>
        </div>
      </div>

      {/* Role Priority Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(ROLE_PERMISSIONS).map(r => (
          <div 
            key={r.roleKey} 
            className={`p-4 rounded-xl border transition-all ${
              currentUserRole === r.roleKey 
                ? 'ring-2 ring-indigo-500 bg-indigo-950/20 border-indigo-500/50' 
                : isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${r.badgeColor}`}>
                Priority #{r.priority}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {r.allowedTabs.length} Tabs Open
              </span>
            </div>
            <h3 className="font-bold text-sm text-white">{r.title}</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{r.description}</p>
          </div>
        ))}
      </div>

      {/* Navigation Subtabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('directory')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'directory'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Active Staff Directory ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('applications')}
          className={`relative flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'applications'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Recruitment Approval Queue ({pendingCount})</span>
          {pendingCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-amber-500 text-slate-950 font-black">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('recruitment_form')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'recruitment_form'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Recruitment Application Form</span>
        </button>
      </div>

      {/* SUBTAB 1: Active Staff Directory */}
      {activeSubTab === 'directory' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search staff by name, email, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <span className="text-xs text-slate-400">
              Showing {filteredUsers.length} authorized staff members
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Staff Member</th>
                  <th className="px-4 py-3">Role & Category</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Access Priority</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredUsers.map(user => {
                  const perm = ROLE_PERMISSIONS[user.role] || {};
                  return (
                    <tr key={user.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-lg">{user.avatar}</span>
                          <div>
                            <div className="font-bold text-white text-xs">{user.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${perm.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                          {user.categoryName}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-300">
                        {user.department}
                      </td>

                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold text-indigo-400">
                          Priority #{user.accessPriority}
                        </span>
                        <span className="block text-[10px] text-slate-500">
                          {user.role === 'admin' ? 'Root System Access' : `${perm.allowedTabs?.length || 0} Tabs Permitted`}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-400 text-[11px]">
                        {user.joinedDate}
                      </td>

                      <td className="px-4 py-3 text-right">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition"
                            title="Revoke Access"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Recruitment Approval Queue (Admin Authority) */}
      {activeSubTab === 'applications' && (
        <div className="space-y-4">
          {currentUserRole !== 'admin' ? (
            <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs space-y-2">
              <div className="flex items-center space-x-2 font-bold text-sm text-amber-300">
                <Lock className="w-4 h-4" />
                <span>Admin Privileges Required for Recruitment Approvals</span>
              </div>
              <p>
                Recruitment approvals are strictly preserved for <strong>Category 1: Admin</strong>. 
                Please use the live role switcher above to switch to Admin if you wish to review and approve these applicants.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin Authority Active: You have approval rights to grant Category 2, 3, or 4 staff permissions.</span>
              </div>
              <span className="font-bold font-mono text-emerald-400">{applications.length} Pending</span>
            </div>
          )}

          {applications.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-500">
              <UserCheck className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              <p className="font-semibold text-sm">No pending recruitment applications.</p>
              <p className="text-xs mt-1">Use the "+ Recruitment Application Form" to submit a new candidate.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {applications.map(app => (
                <div 
                  key={app.id} 
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <h3 className="font-bold text-white text-sm">{app.name}</h3>
                        <span className="text-[11px] text-slate-400 font-mono">{app.email}</span>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                        PENDING
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Applied Category / Role:</span>
                        <span className="font-bold text-indigo-400">{app.categoryTarget}</span>
                      </div>

                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Department / Hub:</span>
                        <span className="text-slate-300">{app.department} ({app.country})</span>
                      </div>

                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Experience Background:</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                          {app.experience}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Statement of Purpose:</span>
                        <p className="text-slate-400 text-[11px] italic leading-relaxed">
                          "{app.statement}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">
                      Applied: {app.appliedDate}
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleRejectApplication(app.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 transition border border-rose-900/40"
                      >
                        Reject
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApproveApplication(app)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Role</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: Admin Panel Recruitment Application Form */}
      {activeSubTab === 'recruitment_form' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white tracking-tight">Admin Panel Recruitment Application Form</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Submit standard applicant credentials to recruit new team members into Moderator, Service Provider, or Customer Care roles.
            </p>
          </div>

          <form onSubmit={handleSubmitRecruitment} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Gallagher"
                  value={applicantForm.name}
                  onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Work / Business Email *</label>
                <input
                  type="email"
                  required
                  placeholder="applicant@company.com"
                  value={applicantForm.email}
                  onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Contact Phone</label>
                <input
                  type="text"
                  placeholder="+1 (555) 019-2834"
                  value={applicantForm.phone}
                  onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Location / Market</label>
                <select
                  value={applicantForm.country}
                  onChange={(e) => setApplicantForm({ ...applicantForm, country: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="US">🇺🇸 United States</option>
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="EU">🇪🇺 European Union</option>
                  <option value="GLOBAL">🌐 Global Remote</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Target Role Category *</label>
                <select
                  value={applicantForm.roleApplied}
                  onChange={(e) => setApplicantForm({ ...applicantForm, roleApplied: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="moderator">Category 2: Moderator</option>
                  <option value="service_provider">Category 3: Service Provider (POD)</option>
                  <option value="customer_care">Category 4: Customer Care Rep</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Specialization / Department *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. POD Print Quality, Omnichannel Support, Catalog QA"
                  value={applicantForm.department}
                  onChange={(e) => setApplicantForm({ ...applicantForm, department: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Resume / Portfolio / LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={applicantForm.portfolioUrl}
                  onChange={(e) => setApplicantForm({ ...applicantForm, portfolioUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Relevant Industry Experience & Qualifications *</label>
              <textarea
                rows="3"
                required
                placeholder="Detail past experience in eCommerce, POD printing, graphic layout, or omnichannel customer resolution..."
                value={applicantForm.experience}
                onChange={(e) => setApplicantForm({ ...applicantForm, experience: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Statement of Purpose / Why Join PrintFlow?</label>
              <textarea
                rows="2"
                placeholder="Provide a brief explanation of how the applicant will contribute to platform operations..."
                value={applicantForm.statement}
                onChange={(e) => setApplicantForm({ ...applicantForm, statement: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="confidentiality"
                required
                checked={applicantForm.agreeConfidentiality}
                onChange={(e) => setApplicantForm({ ...applicantForm, agreeConfidentiality: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <label htmlFor="confidentiality" className="text-slate-300 font-semibold cursor-pointer">
                I verify that applicant information is accurate and agrees to platform security and role restrictions
              </label>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setActiveSubTab('directory')}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition"
              >
                <UserPlus className="w-4 h-4" />
                <span>Submit for Admin Approval</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
