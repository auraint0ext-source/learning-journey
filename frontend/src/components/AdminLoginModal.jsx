import React, { useState } from 'react';
import { Lock, ShieldCheck, X, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Admin authentication check (default: admin / admin123)
    setTimeout(() => {
      if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
        localStorage.setItem('printflow_admin_auth', 'true');
        onLoginSuccess();
        onClose();
      } else {
        setError('Invalid username or password! (Use: admin / admin123)');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 animate-fade-in relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Staff & Operations Portal</h2>
          <p className="text-xs text-slate-400">
            Enter credentials to access Workflow Automation, Social Inbox & Ads Engine.
          </p>
        </div>

        {error && (
          <div className="bg-rose-950/60 border border-rose-500/40 text-rose-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Admin Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono"
            />
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-0.5">
            <div>Default Credentials:</div>
            <div className="font-mono text-indigo-300 font-semibold">User: admin | Pass: admin123</div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{isLoading ? 'Verifying...' : 'Sign In to Operations Studio'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
