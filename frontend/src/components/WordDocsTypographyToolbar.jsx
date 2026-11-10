import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight,
  Type, ChevronDown, ChevronUp, Palette, Sliders, Sparkles, Check, RotateCcw, MousePointerClick,
  Pin, PinOff, Lock, Unlock
} from 'lucide-react';
import { SUPPORTED_FONTS, TYPOGRAPHY_TARGET_ITEMS } from '../config/storefrontConfig';

// 1. Google Docs / Word Style Top Horizontal Persistent Formatting Ribbon
export function WordDocsTopRibbon({
  selectedTarget = 'heroTitle',
  onSelectTarget,
  typographyConfig = {},
  onTypographyChange,
  isLight = false,
  isSidebarCollapsed = false
}) {
  const [isPinned, setIsPinned] = useState(true); // Default: Frozen / pinned to top
  const [isCollapsed, setIsCollapsed] = useState(false); // Google Docs collapse / expand arrow

  const current = typographyConfig[selectedTarget] || {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '400',
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    letterSpacing: 0,
    lineHeight: 1.3,
    color: isLight ? '#0f172a' : '#ffffff',
    align: 'left',
    transform: 'none'
  };

  const update = (patch) => {
    if (onTypographyChange) {
      onTypographyChange(selectedTarget, { ...current, ...patch });
    }
  };

  const PRESET_COLORS = [
    { label: 'White', hex: '#ffffff' },
    { label: 'Dark Slate', hex: '#0f172a' },
    { label: 'Muted Slate', hex: '#94a3b8' },
    { label: 'Indigo', hex: '#6366f1' },
    { label: 'Violet', hex: '#a855f7' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Amber', hex: '#f59e0b' },
    { label: 'Rose Red', hex: '#f43f5e' }
  ];

  const currentItemInfo = TYPOGRAPHY_TARGET_ITEMS.find(i => i.id === selectedTarget) || { label: selectedTarget };

  // Collapsed Minimal State (when user clicks Google Docs ChevronUp arrow)
  if (isCollapsed) {
    return (
      <>
        <div className={isPinned ? `fixed top-16 right-0 z-30 transition-all duration-300 ${isSidebarCollapsed ? 'left-16' : 'left-64'}` : 'relative w-full'}>
          <div className={`w-full px-4 sm:px-6 lg:px-8 py-2 border-b flex items-center justify-between text-xs transition-all shadow-xs backdrop-blur-md ${
            isLight ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50' : 'bg-slate-900/95 border-slate-800 text-slate-100 shadow-black/40'
          }`}>
            <div className="flex items-center space-x-2">
              <MousePointerClick className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="font-bold text-[11px] text-indigo-400">Target:</span>
              <select
                value={selectedTarget}
                onChange={(e) => onSelectTarget && onSelectTarget(e.target.value)}
                className="appearance-none bg-transparent font-bold text-xs focus:outline-none cursor-pointer pr-4"
              >
                {TYPOGRAPHY_TARGET_ITEMS.map(item => (
                  <option key={item.id} value={item.id} className="bg-slate-900 text-white font-medium">
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-1.5">
              {/* Freeze / Pin Toggle */}
              <button
                type="button"
                onClick={() => setIsPinned(!isPinned)}
                title={isPinned ? 'Toolbar is Frozen to top (ক্লিক করলে আনফ্রিজ হবে)' : 'Toolbar is Unfrozen (ক্লিক করলে উপরে ফ্রিজ হবে)'}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border transition cursor-pointer ${
                  isPinned
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs ring-1 ring-indigo-400/50'
                    : isLight ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Pin className={`w-3 h-3 ${isPinned ? 'rotate-45 text-white' : ''}`} />
                <span>{isPinned ? 'Frozen 📌' : 'Unfrozen 📍'}</span>
              </button>

              {/* Show / Expand Arrow */}
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                title="Expand Google Docs formatting toolbar (টুলবার খুলুন)"
                className="px-2.5 py-1 rounded-lg font-bold text-[10px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 border border-indigo-500/30 flex items-center space-x-1 transition cursor-pointer"
              >
                <span>Show Toolbar</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
        {/* Spacer so page content below does not jump when frozen */}
        {isPinned && <div className="h-10 w-full pointer-events-none" aria-hidden="true" />}
      </>
    );
  }

  return (
    <>
      <div className={isPinned ? `fixed top-16 right-0 z-30 transition-all duration-300 ${isSidebarCollapsed ? 'left-16' : 'left-64'}` : 'relative w-full'}>
        <div className={`w-full px-4 sm:px-6 lg:px-8 py-2.5 border-b transition-all shadow-xs backdrop-blur-md ${
          isLight 
            ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50' 
            : 'bg-slate-900/95 border-slate-800 text-slate-100 shadow-black/40'
        }`}>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
        {/* Item Selection Dropdown (Google Docs Active Style) */}
        <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl border font-semibold ${
          isLight 
            ? 'bg-indigo-50 border-indigo-200 text-indigo-900' 
            : 'bg-indigo-950/60 border-indigo-500/40 text-indigo-200'
        }`}>
          <MousePointerClick className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 shrink-0 hidden sm:inline">
            Active Item:
          </span>
          <div className="relative">
            <select
              value={selectedTarget}
              onChange={(e) => onSelectTarget && onSelectTarget(e.target.value)}
              className="appearance-none bg-transparent pr-5 font-bold focus:outline-none cursor-pointer text-xs"
            >
              {TYPOGRAPHY_TARGET_ITEMS.map(item => (
                <option key={item.id} value={item.id} className="bg-slate-900 text-white font-medium">
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 absolute right-0.5 top-1 pointer-events-none opacity-60" />
          </div>
        </div>

        <div className={`w-[1px] h-6 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* Font Family Dropdown */}
        <div className="relative min-w-[130px] sm:min-w-[160px]">
          <select
            value={current.fontFamily || 'Plus Jakarta Sans'}
            onChange={(e) => update({ fontFamily: e.target.value })}
            className={`w-full appearance-none px-2.5 py-1 text-xs font-semibold rounded-lg border pr-6 focus:outline-none ${
              isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-800' 
                : 'bg-slate-950 border-slate-700 text-slate-100'
            }`}
            style={{ fontFamily: current.fontFamily }}
          >
            {SUPPORTED_FONTS.map(f => (
              <option key={f.id} value={f.id} style={{ fontFamily: f.id }}>
                {f.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-2 pointer-events-none text-slate-400" />
        </div>

        <div className={`w-[1px] h-6 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* Font Size Stepper [-] [ 16 ] [+] */}
        <div className="flex items-center space-x-0.5">
          <button
            type="button"
            title="Decrease font size"
            onClick={() => update({ fontSize: Math.max(9, (Number(current.fontSize) || 16) - 1) })}
            className={`w-6 h-6 flex items-center justify-center rounded-l-md font-bold text-xs border transition ${
              isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            -
          </button>
          <div className={`flex items-center px-1 h-6 text-xs font-mono font-bold border-t border-b ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
          }`}>
            <input
              type="number"
              value={current.fontSize || 16}
              onChange={(e) => update({ fontSize: Number(e.target.value) || 12 })}
              className="w-7 text-center bg-transparent focus:outline-none font-bold text-xs"
              min="8"
              max="96"
            />
            <span className="text-[9px] text-slate-400">px</span>
          </div>
          <button
            type="button"
            title="Increase font size"
            onClick={() => update({ fontSize: Math.min(96, (Number(current.fontSize) || 16) + 1) })}
            className={`w-6 h-6 flex items-center justify-center rounded-r-md font-bold text-xs border transition ${
              isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            +
          </button>
        </div>

        <div className={`w-[1px] h-6 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* Bold, Italic, Underline, Strikethrough */}
        <div className="flex items-center space-x-0.5">
          <button
            type="button"
            title="Bold (গাঢ়)"
            onClick={() => update({ bold: !current.bold, fontWeight: !current.bold ? '700' : '400' })}
            className={`w-6 h-6 flex items-center justify-center rounded-md font-extrabold text-xs transition border ${
              current.bold
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bold className="w-3 h-3" />
          </button>

          <button
            type="button"
            title="Italic (বাঁকা)"
            onClick={() => update({ italic: !current.italic })}
            className={`w-6 h-6 flex items-center justify-center rounded-md text-xs italic transition border ${
              current.italic
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Italic className="w-3 h-3" />
          </button>

          <button
            type="button"
            title="Underline (নিচে দাগ)"
            onClick={() => update({ underline: !current.underline })}
            className={`w-6 h-6 flex items-center justify-center rounded-md text-xs underline transition border ${
              current.underline
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Underline className="w-3 h-3" />
          </button>

          <button
            type="button"
            title="Strikethrough"
            onClick={() => update({ strike: !current.strike })}
            className={`w-6 h-6 flex items-center justify-center rounded-md text-xs line-through transition border ${
              current.strike
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Strikethrough className="w-3 h-3" />
          </button>
        </div>

        <div className={`w-[1px] h-6 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* Alignment */}
        <div className="flex items-center space-x-0.5">
          <button
            type="button"
            title="Align Left"
            onClick={() => update({ align: 'left' })}
            className={`w-6 h-6 flex items-center justify-center rounded-md text-xs transition border ${
              (current.align || 'left') === 'left'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <AlignLeft className="w-3 h-3" />
          </button>

          <button
            type="button"
            title="Align Center"
            onClick={() => update({ align: 'center' })}
            className={`w-6 h-6 flex items-center justify-center rounded-md text-xs transition border ${
              current.align === 'center'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <AlignCenter className="w-3 h-3" />
          </button>

          <button
            type="button"
            title="Align Right"
            onClick={() => update({ align: 'right' })}
            className={`w-6 h-6 flex items-center justify-center rounded-md text-xs transition border ${
              current.align === 'right'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <AlignRight className="w-3 h-3" />
          </button>
        </div>

        <div className={`w-[1px] h-6 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* Letter Spacing Dropdown */}
        <div className="relative">
          <select
            value={current.letterSpacing !== undefined ? current.letterSpacing : 0}
            onChange={(e) => update({ letterSpacing: Number(e.target.value) })}
            title="Letter Spacing (স্পেসিং)"
            className={`appearance-none px-2 py-1 text-xs font-semibold rounded-md border pr-5 focus:outline-none ${
              isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-800' 
                : 'bg-slate-950 border-slate-700 text-slate-100'
            }`}
          >
            <option value="-1">Tight Spacing (-1px)</option>
            <option value="0">Normal Spacing (0px)</option>
            <option value="1">Wide (+1px)</option>
            <option value="2">Wider (+2px)</option>
            <option value="4">Tracked (+4px)</option>
          </select>
          <ChevronDown className="w-2.5 h-2.5 absolute right-1.5 top-2 pointer-events-none text-slate-400" />
        </div>

        {/* Transform (Aa) */}
        <div className="relative">
          <select
            value={current.transform || 'none'}
            onChange={(e) => update({ transform: e.target.value })}
            title="Case Transform"
            className={`appearance-none px-1.5 py-1 text-xs font-bold rounded-md border pr-4 focus:outline-none ${
              isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-800' 
                : 'bg-slate-950 border-slate-700 text-slate-100'
            }`}
          >
            <option value="none">Aa</option>
            <option value="uppercase">AA</option>
            <option value="lowercase">aa</option>
            <option value="capitalize">Ab</option>
          </select>
          <ChevronDown className="w-2.5 h-2.5 absolute right-1 top-2 pointer-events-none text-slate-400" />
        </div>

        <div className={`w-[1px] h-6 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* Color Palette & Custom Picker */}
        <div className="flex items-center space-x-1">
          <div 
            className="w-5 h-5 rounded-md border border-slate-600 shadow-xs cursor-pointer relative overflow-hidden"
            title={`Current Text Color: ${current.color}`}
          >
            <div className="w-full h-full" style={{ backgroundColor: current.color || '#ffffff' }} />
            <input
              type="color"
              value={current.color || '#ffffff'}
              onChange={(e) => update({ color: e.target.value })}
              className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
            />
          </div>
          <div className="hidden lg:flex items-center space-x-0.5">
            {PRESET_COLORS.map(c => (
              <button
                key={c.hex}
                type="button"
                title={c.label}
                onClick={() => update({ color: c.hex })}
                className={`w-3.5 h-3.5 rounded-full border transition transform hover:scale-125 ${
                  (current.color || '').toLowerCase() === c.hex.toLowerCase()
                    ? 'ring-2 ring-indigo-500 border-white'
                    : 'border-slate-500/50'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className={`w-[1px] h-6 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* Freeze / Pin Toggle Button */}
        <button
          type="button"
          onClick={() => setIsPinned(!isPinned)}
          title={isPinned ? 'Toolbar is Frozen to top of screen (উপরে আটকানো আছে — স্ক্রল করলেও সরবে না)' : 'Click to freeze toolbar to top (স্ক্রলে উপরে আটকাতে ক্লিক করুন)'}
          className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 border transition cursor-pointer ${
            isPinned
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs ring-1 ring-indigo-400/50'
              : isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200' 
                : 'bg-slate-950 border-slate-700 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Pin className={`w-3.5 h-3.5 ${isPinned ? 'rotate-45 text-white' : ''}`} />
          <span className="hidden sm:inline">{isPinned ? 'Frozen 📌' : 'Freeze'}</span>
        </button>

        {/* Google Docs Collapse Arrow (ChevronUp) */}
        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          title="Hide formatting toolbar (টুলবার লুকান — গুগল ডক স্টাইল)"
          className={`p-1 rounded-lg border transition cursor-pointer flex items-center justify-center ${
            isLight 
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' 
              : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-300'
          }`}
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        {/* Live Typography Preview Pill */}
        <div className={`ml-auto hidden md:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-lg border text-[11px] truncate max-w-[200px] ${
          isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
        }`}
        style={{
          fontFamily: current.fontFamily,
          fontWeight: current.bold ? '800' : '400',
          fontStyle: current.italic ? 'italic' : 'normal',
          textDecoration: current.underline ? 'underline' : 'none',
          letterSpacing: `${current.letterSpacing || 0}px`,
          color: current.color,
          textTransform: current.transform
        }}>
          <span className="truncate">{currentItemInfo.label.split('(')[0]}</span>
        </div>
      </div>
    </div>
  </div>
  {/* Spacer so page content below does not jump when toolbar is frozen to top */}
  {isPinned && <div className="h-14 w-full pointer-events-none" aria-hidden="true" />}
</>
  );
}

// 2. Full Section-Level Typography Toolbar
export default function WordDocsTypographyToolbar({
  label,
  value = {},
  onChange,
  isLight = false,
  sampleText = 'The quick brown fox jumps over the lazy dog (লাইভ ফন্ট প্রিভিউ)'
}) {
  const current = {
    fontFamily: value?.fontFamily || 'Plus Jakarta Sans',
    fontSize: Number(value?.fontSize) || 16,
    fontWeight: value?.fontWeight || (value?.bold ? '700' : '400'),
    bold: value?.bold !== undefined ? value.bold : (value?.fontWeight === '700' || value?.fontWeight === '800'),
    italic: !!value?.italic,
    underline: !!value?.underline,
    strike: !!value?.strike,
    letterSpacing: value?.letterSpacing !== undefined ? Number(value.letterSpacing) : 0,
    lineHeight: value?.lineHeight !== undefined ? Number(value.lineHeight) : 1.3,
    color: value?.color || (isLight ? '#0f172a' : '#ffffff'),
    align: value?.align || 'left',
    transform: value?.transform || 'none'
  };

  const update = (patch) => {
    if (onChange) {
      onChange({ ...current, ...patch });
    }
  };

  const PRESET_COLORS = [
    { label: 'White', hex: '#ffffff' },
    { label: 'Dark Slate', hex: '#0f172a' },
    { label: 'Muted Slate', hex: '#94a3b8' },
    { label: 'Indigo', hex: '#6366f1' },
    { label: 'Violet', hex: '#a855f7' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Amber', hex: '#f59e0b' },
    { label: 'Rose Red', hex: '#f43f5e' },
    { label: 'Sky Blue', hex: '#38bdf8' }
  ];

  return (
    <div className={`rounded-2xl border transition-all ${
      isLight 
        ? 'bg-slate-50 border-slate-200 shadow-sm' 
        : 'bg-slate-950/80 border-slate-800 shadow-lg'
    } p-3.5 space-y-3`}>
      {label && (
        <div className={`flex items-center justify-between border-b pb-2 text-xs font-semibold ${
          isLight ? 'border-slate-200 text-slate-700' : 'border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center space-x-1.5">
            <Type className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-bold">{label}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold">
            MS Word / Google Docs Style
          </span>
        </div>
      )}

      {/* Main Google Docs / Word Formatting Toolbar Row */}
      <div className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border ${
        isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
      }`}>
        {/* 1. Font Family Dropdown */}
        <div className="relative min-w-[170px] flex-1 max-w-[240px]">
          <select
            value={current.fontFamily}
            onChange={(e) => update({ fontFamily: e.target.value })}
            className={`w-full appearance-none px-2.5 py-1.5 text-xs font-semibold rounded-lg border pr-7 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
              isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-800' 
                : 'bg-slate-950 border-slate-700 text-slate-100'
            }`}
            style={{ fontFamily: current.fontFamily }}
          >
            {SUPPORTED_FONTS.map(f => (
              <option key={f.id} value={f.id} style={{ fontFamily: f.id }}>
                {f.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2.5 pointer-events-none text-slate-400" />
        </div>

        <div className={`w-[1px] h-5 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* 2. Font Size Stepper [-] [ 16px ] [+] */}
        <div className="flex items-center space-x-0.5">
          <button
            type="button"
            title="Decrease font size"
            onClick={() => update({ fontSize: Math.max(9, current.fontSize - 1) })}
            className={`w-6 h-7 flex items-center justify-center rounded-l-md font-bold text-xs border transition ${
              isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            -
          </button>
          <div className={`flex items-center px-1.5 h-7 text-xs font-mono font-bold border-t border-b ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
          }`}>
            <input
              type="number"
              value={current.fontSize}
              onChange={(e) => update({ fontSize: Number(e.target.value) || 12 })}
              className="w-8 text-center bg-transparent focus:outline-none font-bold"
              min="8"
              max="96"
            />
            <span className="text-[10px] text-slate-400">px</span>
          </div>
          <button
            type="button"
            title="Increase font size"
            onClick={() => update({ fontSize: Math.min(96, current.fontSize + 1) })}
            className={`w-6 h-7 flex items-center justify-center rounded-r-md font-bold text-xs border transition ${
              isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            +
          </button>
        </div>

        <div className={`w-[1px] h-5 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* 3. Bold [B], Italic [I], Underline [U], Strike [S] */}
        <div className="flex items-center space-x-0.5">
          <button
            type="button"
            title="Bold (গাঢ়)"
            onClick={() => update({ bold: !current.bold, fontWeight: !current.bold ? '700' : '400' })}
            className={`w-7 h-7 flex items-center justify-center rounded-md font-extrabold text-xs transition border ${
              current.bold
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title="Italic (বাঁকা)"
            onClick={() => update({ italic: !current.italic })}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-xs italic transition border ${
              current.italic
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title="Underline (নিচে দাগ)"
            onClick={() => update({ underline: !current.underline })}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-xs underline transition border ${
              current.underline
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title="Strikethrough"
            onClick={() => update({ strike: !current.strike })}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-xs line-through transition border ${
              current.strike
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className={`w-[1px] h-5 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* 4. Alignment */}
        <div className="flex items-center space-x-0.5">
          <button
            type="button"
            title="Align Left"
            onClick={() => update({ align: 'left' })}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-xs transition border ${
              current.align === 'left'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title="Align Center"
            onClick={() => update({ align: 'center' })}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-xs transition border ${
              current.align === 'center'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title="Align Right"
            onClick={() => update({ align: 'right' })}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-xs transition border ${
              current.align === 'right'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className={`w-[1px] h-5 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* 5. Text Transform */}
        <div className="relative">
          <select
            value={current.transform}
            onChange={(e) => update({ transform: e.target.value })}
            title="Text Transform"
            className={`appearance-none px-2 py-1 text-xs font-bold rounded-md border pr-5 focus:outline-none ${
              isLight 
                ? 'bg-slate-100 border-slate-300 text-slate-800' 
                : 'bg-slate-950 border-slate-700 text-slate-100'
            }`}
          >
            <option value="none">Aa (Normal)</option>
            <option value="uppercase">AA (UPPERCASE)</option>
            <option value="lowercase">aa (lowercase)</option>
            <option value="capitalize">Ab (Capitalize)</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-2 pointer-events-none text-slate-400" />
        </div>

        <div className={`w-[1px] h-5 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* 6. Color Picker Swatch */}
        <div className="flex items-center space-x-1.5">
          <div 
            className="w-6 h-6 rounded-md border border-slate-600 shadow-xs cursor-pointer flex items-center justify-center relative overflow-hidden"
            title={`Current Color: ${current.color}`}
          >
            <div className="w-full h-full" style={{ backgroundColor: current.color }} />
            <input
              type="color"
              value={current.color}
              onChange={(e) => update({ color: e.target.value })}
              className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
            />
          </div>
          <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">
            {current.color}
          </span>
        </div>
      </div>

      {/* Row 2: Secondary Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1 text-xs">
        {/* Letter Spacing */}
        <div className="flex items-center justify-between space-x-2">
          <label className={`font-semibold text-[11px] whitespace-nowrap ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Letter Spacing:
          </label>
          <div className="flex items-center space-x-1">
            {[
              { id: -1, label: 'Tight (-1)' },
              { id: 0, label: '0' },
              { id: 1, label: '+1' },
              { id: 2, label: '+2' },
              { id: 4, label: '+4' }
            ].map(sp => (
              <button
                key={sp.id}
                type="button"
                onClick={() => update({ letterSpacing: sp.id })}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition ${
                  current.letterSpacing === sp.id
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : isLight 
                      ? 'bg-slate-200/70 border-slate-300 text-slate-700' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Line Height */}
        <div className="flex items-center justify-between space-x-2">
          <label className={`font-semibold text-[11px] whitespace-nowrap ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Line Height:
          </label>
          <div className="flex items-center space-x-1">
            {[
              { val: 1.1, label: '1.1' },
              { val: 1.3, label: '1.3' },
              { val: 1.5, label: '1.5' },
              { val: 1.8, label: '1.8' }
            ].map(lh => (
              <button
                key={lh.val}
                type="button"
                onClick={() => update({ lineHeight: lh.val })}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition ${
                  current.lineHeight === lh.val
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : isLight 
                      ? 'bg-slate-200/70 border-slate-300 text-slate-700' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lh.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Color Swatches */}
        <div className="flex items-center space-x-1 justify-end">
          {PRESET_COLORS.map(c => (
            <button
              key={c.hex}
              type="button"
              title={c.label}
              onClick={() => update({ color: c.hex })}
              className={`w-4 h-4 rounded-full border transition transform hover:scale-125 ${
                current.color.toLowerCase() === c.hex.toLowerCase()
                  ? 'ring-2 ring-indigo-500 ring-offset-1 border-white'
                  : 'border-slate-500/50'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Row 3: Live Interactive Preview Strip */}
      <div className={`p-3 rounded-xl border transition-all ${
        isLight ? 'bg-white border-slate-200 shadow-inner' : 'bg-slate-900/90 border-slate-800 shadow-inner'
      }`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Live Typography Preview (তাৎক্ষণিক লাইভ আউটপুট)
          </span>
          <span className="text-[10px] font-mono text-indigo-400">
            {current.fontFamily} • {current.fontSize}px • {current.bold ? 'Bold' : 'Regular'} • {current.color}
          </span>
        </div>
        <div 
          style={{
            fontFamily: current.fontFamily,
            fontSize: `${current.fontSize}px`,
            fontWeight: current.bold ? '800' : '400',
            fontStyle: current.italic ? 'italic' : 'normal',
            textDecoration: current.underline 
              ? (current.strike ? 'underline line-through' : 'underline')
              : (current.strike ? 'line-through' : 'none'),
            letterSpacing: `${current.letterSpacing}px`,
            lineHeight: current.lineHeight,
            color: current.color,
            textAlign: current.align,
            textTransform: current.transform
          }}
          className="transition-all py-1 break-words overflow-hidden"
        >
          {sampleText}
        </div>
      </div>
    </div>
  );
}

// Utility function to convert typography config object to React inline style
export function getTypographyInlineStyle(typoConfig, fallbackColor = null) {
  if (!typoConfig) return {};
  return {
    fontFamily: typoConfig.fontFamily ? `${typoConfig.fontFamily}, sans-serif` : undefined,
    fontSize: typoConfig.fontSize ? `${typoConfig.fontSize}px` : undefined,
    fontWeight: typoConfig.bold ? '800' : (typoConfig.fontWeight || '400'),
    fontStyle: typoConfig.italic ? 'italic' : 'normal',
    textDecoration: typoConfig.underline 
      ? (typoConfig.strike ? 'underline line-through' : 'underline')
      : (typoConfig.strike ? 'line-through' : 'none'),
    letterSpacing: typoConfig.letterSpacing !== undefined ? `${typoConfig.letterSpacing}px` : undefined,
    lineHeight: typoConfig.lineHeight !== undefined ? typoConfig.lineHeight : undefined,
    color: typoConfig.color || fallbackColor || undefined,
    textAlign: typoConfig.align || undefined,
    textTransform: typoConfig.transform || undefined
  };
}
