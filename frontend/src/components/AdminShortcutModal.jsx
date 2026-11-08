import React, { useState } from 'react';
import { KeyRound, Shield, CheckCircle2, RotateCcw, X, Command, Sparkles } from 'lucide-react';

export default function AdminShortcutModal({ isOpen, onClose, shortcutConfig, onSaveConfig }) {
  if (!isOpen) return null;

  const [modifier, setModifier] = useState(shortcutConfig.modifier || 'CmdOrCtrl+Shift');
  const [key, setKey] = useState(shortcutConfig.key || 'A');
  const [secretParam, setSecretParam] = useState(shortcutConfig.secretParam || 'admin=1');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const cleanKey = (key.trim().slice(-1) || 'A').toUpperCase();
    const updated = {
      modifier,
      key: cleanKey,
      secretParam: secretParam.trim() || 'admin=1'
    };
    onSaveConfig(updated);
    showToast('Stealth shortcut saved successfully!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setModifier('CmdOrCtrl+Shift');
    setKey('A');
    setSecretParam('admin=1');
  };

  const getModifierLabelMac = (mod) => {
    switch (mod) {
      case 'CmdOrCtrl+Shift': return '⌘ Command + ⇧ Shift';
      case 'CmdOrCtrl+Alt': return '⌘ Command + ⌥ Option';
      case 'Alt+Shift': return '⌥ Option + ⇧ Shift';
      case 'CmdOrCtrl': return '⌘ Command';
      default: return '⌘ Command + ⇧ Shift';
    }
  };

  const getModifierLabelWin = (mod) => {
    switch (mod) {
      case 'CmdOrCtrl+Shift': return 'Ctrl + Shift';
      case 'CmdOrCtrl+Alt': return 'Ctrl + Alt';
      case 'Alt+Shift': return 'Alt + Shift';
      case 'CmdOrCtrl': return 'Ctrl';
      default: return 'Ctrl + Shift';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-5">
        {/* Toast */}
        {toast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toast}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Customize Stealth Admin Key</h3>
              <p className="text-[11px] text-slate-400">Configure your secret hotkey to open Admin Studio</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <span className="text-[11px] uppercase font-bold text-slate-400">Active Hotkey Combination</span>
          <div className="flex items-center justify-center space-x-2 pt-1">
            <kbd className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 font-mono font-bold text-sm shadow">
              {getModifierLabelMac(modifier)} + {key.toUpperCase()}
            </kbd>
          </div>
          <p className="text-[10px] text-slate-500">
            Windows / Linux: <span className="font-mono text-slate-400">{getModifierLabelWin(modifier)} + {key.toUpperCase()}</span>
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* Modifier Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Modifier Keys</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'CmdOrCtrl+Shift', label: 'Cmd/Ctrl + Shift' },
                { id: 'CmdOrCtrl+Alt', label: 'Cmd/Ctrl + Alt' },
                { id: 'Alt+Shift', label: 'Alt + Shift' },
                { id: 'CmdOrCtrl', label: 'Cmd/Ctrl Only' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModifier(m.id)}
                  className={`p-2 rounded-xl border text-center transition font-semibold text-xs ${
                    modifier === m.id
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Key */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Trigger Key (Single Letter or Digit)</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                maxLength="1"
                required
                value={key}
                onChange={(e) => setKey(e.target.value.toUpperCase())}
                className="w-16 text-center font-mono font-bold text-lg bg-slate-950 border border-slate-800 rounded-xl py-2 text-white uppercase focus:outline-none focus:border-amber-400"
              />
              <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
                {['A', 'K', 'M', 'X', 'P', 'S', 'Z'].map(k => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKey(k)}
                    className={`w-8 h-8 rounded-lg font-mono font-bold text-xs transition border ${
                      key.toUpperCase() === k
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Secret URL Param */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Alternative Secret URL Query Parameter</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-[11px]">/?</span>
              <input
                type="text"
                placeholder="admin=1"
                value={secretParam}
                onChange={(e) => setSecretParam(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Visiting this URL also opens the admin login modal.</p>
          </div>

          {/* Security Tip */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-start space-x-2 text-[11px] text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              The public footer link is removed from the customer storefront. Only staff using this hotkey or secret URL can access the admin login.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center space-x-1 text-slate-500 hover:text-slate-300 text-xs font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Default</span>
            </button>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20"
              >
                Save Hotkey
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
