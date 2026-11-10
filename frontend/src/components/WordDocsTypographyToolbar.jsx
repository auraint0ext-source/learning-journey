import React, { useState } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight,
  Type, ChevronDown, ChevronUp, Palette, Sliders, Sparkles, Check, RotateCcw, MousePointerClick,
  Pin, PinOff, Lock, Unlock
} from 'lucide-react';
import { SUPPORTED_FONTS, TYPOGRAPHY_TARGET_ITEMS } from '../config/storefrontConfig';

// 1. Google Docs / Word Style Ultra-Compact Single-Line Top Horizontal Formatting Ribbon
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
      <div className={isPinned ? 'fixed top-16 inset-x-0 w-full z-40 h-9' : 'relative w-full'}>
        <div className={`w-full h-9 px-3 sm:px-4 border-b flex items-center justify-between text-xs transition-all shadow-xs backdrop-blur-md ${
          isLight ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/40' : 'bg-slate-900/95 border-slate-800 text-slate-100 shadow-black/40'
        }`}>
          <div className="flex items-center space-x-2">
            <MousePointerClick className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="font-bold text-[11px] text-indigo-400">Target:</span>
            <select
              value={selectedTarget}
              onChange={(e) => onSelectTarget && onSelectTarget(e.target.value)}
              className="appearance-none bg-transparent font-bold text-xs focus:outline-none cursor-pointer pr-3"
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
              className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1 border transition cursor-pointer ${
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
              className="px-2 py-0.5 rounded font-bold text-[10px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 border border-indigo-500/30 flex items-center space-x-1 transition cursor-pointer"
            >
              <span>Show Toolbar</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isPinned ? 'fixed top-16 inset-x-0 w-full z-40 h-11' : 'relative w-full'}>
      <div className={`w-full h-11 px-3 sm:px-4 border-b flex items-center justify-between text-xs transition-all shadow-xs backdrop-blur-md ${
        isLight 
          ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/40' 
          : 'bg-slate-900/95 border-slate-800 text-slate-100 shadow-black/40'
      }`}>
        {/* Left Side: Single-line controls arranged from left corner */}
        <div className="flex items-center space-x-2 min-w-0 overflow-x-auto no-scrollbar py-0.5">
          {/* 1. Target Item Selector Dropdown */}
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg border font-semibold shrink-0 ${
            isLight 
              ? 'bg-indigo-50 border-indigo-200 text-indigo-900' 
              : 'bg-indigo-950/60 border-indigo-500/40 text-indigo-200'
          }`}>
            <MousePointerClick className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 shrink-0 hidden sm:inline">
              Item:
            </span>
            <div className="relative">
              <select
                value={selectedTarget}
                onChange={(e) => onSelectTarget && onSelectTarget(e.target.value)}
                className="appearance-none bg-transparent pr-4 font-bold focus:outline-none cursor-pointer text-xs"
              >
                {TYPOGRAPHY_TARGET_ITEMS.map(item => (
                  <option key={item.id} value={item.id} className="bg-slate-900 text-white font-medium">
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-2.5 h-2.5 absolute right-0 top-1 pointer-events-none opacity-60" />
            </div>
          </div>

          {/* 2. Text Color Palette & Custom Swatch (Moved to left corner as requested) */}
          <div className="flex items-center space-x-1 shrink-0 pl-0.5">
            <div 
              className="w-5 h-5 rounded-md border border-slate-400 shadow-xs cursor-pointer relative overflow-hidden shrink-0"
              title={`Text Color: ${current.color}`}
            >
              <div className="w-full h-full" style={{ backgroundColor: current.color || '#ffffff' }} />
              <input
                type="color"
                value={current.color || '#ffffff'}
                onChange={(e) => update({ color: e.target.value })}
                className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
              />
            </div>
            <div className="flex items-center space-x-1">
              {PRESET_COLORS.map(c => (
                <button
                  key={c.hex}
                  type="button"
                  title={c.label}
                  onClick={() => update({ color: c.hex })}
                  className={`w-3.5 h-3.5 rounded-full border transition transform hover:scale-125 shrink-0 ${
                    (current.color || '').toLowerCase() === c.hex.toLowerCase()
                      ? 'ring-2 ring-indigo-500 border-white'
                      : 'border-slate-500/50'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className={`w-[1px] h-5 shrink-0 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

          {/* 3. Font Family Dropdown */}
          <div className="relative min-w-[120px] max-w-[145px] shrink-0">
            <select
              value={current.fontFamily || 'Plus Jakarta Sans'}
              onChange={(e) => update({ fontFamily: e.target.value })}
              className={`w-full appearance-none px-2 py-1 text-xs font-semibold rounded-md border pr-5 focus:outline-none truncate ${
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

          <div className={`w-[1px] h-5 shrink-0 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

          {/* 4. Font Size Stepper [-] [ 16px ] [+] */}
          <div className="flex items-center space-x-0.5 shrink-0">
            <button
              type="button"
              title="Decrease font size"
              onClick={() => update({ fontSize: Math.max(9, (Number(current.fontSize) || 16) - 1) })}
              className={`w-5 h-5 flex items-center justify-center rounded-l font-bold text-xs border transition ${
                isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              -
            </button>
            <div className={`flex items-center px-1 h-5 text-xs font-mono font-bold border-t border-b ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
            }`}>
              <input
                type="number"
                value={current.fontSize || 16}
                onChange={(e) => update({ fontSize: Number(e.target.value) || 12 })}
                className="w-6 text-center bg-transparent focus:outline-none font-bold text-xs"
                min="8"
                max="96"
              />
              <span className="text-[9px] text-slate-400">px</span>
            </div>
            <button
              type="button"
              title="Increase font size"
              onClick={() => update({ fontSize: Math.min(96, (Number(current.fontSize) || 16) + 1) })}
              className={`w-5 h-5 flex items-center justify-center rounded-r font-bold text-xs border transition ${
                isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              +
            </button>
          </div>

          <div className={`w-[1px] h-5 shrink-0 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

          {/* 5. Bold, Italic, Underline, Strikethrough */}
          <div className="flex items-center space-x-0.5 shrink-0">
            <button
              type="button"
              title="Bold"
              onClick={() => update({ bold: !current.bold, fontWeight: !current.bold ? '700' : '400' })}
              className={`w-5 h-5 flex items-center justify-center rounded font-extrabold text-xs transition border ${
                current.bold
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Bold className="w-2.5 h-2.5" />
            </button>

            <button
              type="button"
              title="Italic"
              onClick={() => update({ italic: !current.italic })}
              className={`w-5 h-5 flex items-center justify-center rounded text-xs italic transition border ${
                current.italic
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Italic className="w-2.5 h-2.5" />
            </button>

            <button
              type="button"
              title="Underline"
              onClick={() => update({ underline: !current.underline })}
              className={`w-5 h-5 flex items-center justify-center rounded text-xs underline transition border ${
                current.underline
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Underline className="w-2.5 h-2.5" />
            </button>

            <button
              type="button"
              title="Strikethrough"
              onClick={() => update({ strike: !current.strike })}
              className={`w-5 h-5 flex items-center justify-center rounded text-xs line-through transition border ${
                current.strike
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Strikethrough className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className={`w-[1px] h-5 shrink-0 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

          {/* 6. Alignment */}
          <div className="flex items-center space-x-0.5 shrink-0">
            <button
              type="button"
              title="Align Left"
              onClick={() => update({ align: 'left' })}
              className={`w-5 h-5 flex items-center justify-center rounded text-xs transition border ${
                (current.align || 'left') === 'left'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <AlignLeft className="w-2.5 h-2.5" />
            </button>

            <button
              type="button"
              title="Align Center"
              onClick={() => update({ align: 'center' })}
              className={`w-5 h-5 flex items-center justify-center rounded text-xs transition border ${
                current.align === 'center'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <AlignCenter className="w-2.5 h-2.5" />
            </button>

            <button
              type="button"
              title="Align Right"
              onClick={() => update({ align: 'right' })}
              className={`w-5 h-5 flex items-center justify-center rounded text-xs transition border ${
                current.align === 'right'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : isLight 
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <AlignRight className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className={`w-[1px] h-5 shrink-0 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`} />

          {/* 7. Letter Spacing */}
          <div className="relative shrink-0">
            <select
              value={current.letterSpacing !== undefined ? current.letterSpacing : 0}
              onChange={(e) => update({ letterSpacing: Number(e.target.value) })}
              title="Letter Spacing"
              className={`appearance-none px-1.5 py-1 text-[11px] font-semibold rounded-md border pr-4 focus:outline-none ${
                isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-800' 
                  : 'bg-slate-950 border-slate-700 text-slate-100'
              }`}
            >
              <option value="-1">Tighter</option>
              <option value="0">Normal</option>
              <option value="1">Wide (+1)</option>
              <option value="2">Wider (+2)</option>
              <option value="4">Tracked (+4)</option>
            </select>
            <ChevronDown className="w-2.5 h-2.5 absolute right-1 top-2 pointer-events-none text-slate-400" />
          </div>

          {/* 8. Transform (Aa) */}
          <div className="relative shrink-0">
            <select
              value={current.transform || 'none'}
              onChange={(e) => update({ transform: e.target.value })}
              title="Case Transform"
              className={`appearance-none px-1.5 py-1 text-[11px] font-bold rounded-md border pr-4 focus:outline-none ${
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

          {/* 9. Reset Button */}
          <button
            type="button"
            title="Reset Typography for this item"
            onClick={() => update({
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
            })}
            className={`w-5 h-5 flex items-center justify-center rounded border transition shrink-0 ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-500 hover:text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCcw className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Right Side: Live preview pill in top-right corner + Pin & Collapse */}
        <div className="flex items-center space-x-1.5 shrink-0 pl-2">
          {/* Live Typography Preview Pill (Shifted to right corner as requested) */}
          <div className={`hidden md:flex items-center space-x-1 px-2.5 py-0.5 rounded-lg border text-xs truncate max-w-[220px] shadow-xs ${
            isLight ? 'bg-indigo-50/70 border-indigo-200 text-indigo-900' : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200'
          }`}
          style={{
            fontFamily: current.fontFamily,
            fontWeight: current.bold ? '800' : '400',
            fontStyle: current.italic ? 'italic' : 'normal',
            textDecoration: current.underline ? 'underline' : 'none',
            letterSpacing: `${current.letterSpacing || 0}px`,
            color: current.color,
            textTransform: current.transform
          }}
          title="Live typography style preview for this item">
            <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
            <span className="truncate font-semibold">{currentItemInfo.label.split('(')[0]}</span>
          </div>

          {/* Freeze / Pin Toggle Button */}
          <button
            type="button"
            onClick={() => setIsPinned(!isPinned)}
            title={isPinned ? 'Toolbar is Frozen to top (ক্লিক করলে আনফ্রিজ হবে)' : 'Toolbar is Unfrozen (ক্লিক করলে উপরে ফ্রিজ হবে)'}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center space-x-1 border transition cursor-pointer shrink-0 ${
              isPinned
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs ring-1 ring-indigo-400/50'
                : isLight ? 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <Pin className={`w-3 h-3 ${isPinned ? 'rotate-45 text-white' : ''}`} />
            <span>{isPinned ? 'Frozen 📌' : 'Unfrozen 📍'}</span>
          </button>

          {/* Collapse Chevron Arrow */}
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            title="Hide formatting toolbar (টুলবার লুকান)"
            className={`p-1 rounded-lg border transition cursor-pointer shrink-0 ${
              isLight 
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' 
                : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
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
    fontFamily: value.fontFamily || 'Plus Jakarta Sans',
    fontSize: value.fontSize || 16,
    fontWeight: value.fontWeight || '400',
    bold: value.bold || false,
    italic: value.italic || false,
    underline: value.underline || false,
    strike: value.strike || false,
    letterSpacing: value.letterSpacing || 0,
    lineHeight: value.lineHeight || 1.3,
    color: value.color || (isLight ? '#0f172a' : '#ffffff'),
    align: value.align || 'left',
    transform: value.transform || 'none'
  };

  const update = (patch) => {
    if (onChange) {
      onChange({ ...current, ...patch });
    }
  };

  return (
    <div className={`p-4 rounded-xl border space-y-3 ${
      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
    }`}>
      <div className="flex items-center justify-between">
        <label className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
          {label}
        </label>
        <button
          type="button"
          onClick={() => update({
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
          })}
          className="text-[10px] text-slate-400 hover:text-indigo-400 flex items-center space-x-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block mb-1">Font</span>
          <select
            value={current.fontFamily}
            onChange={(e) => update({ fontFamily: e.target.value })}
            className={`w-full p-1.5 rounded-lg border text-xs ${
              isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-700 text-white'
            }`}
          >
            {SUPPORTED_FONTS.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 block mb-1">Size ({current.fontSize}px)</span>
          <input
            type="range"
            min="10"
            max="72"
            value={current.fontSize}
            onChange={(e) => update({ fontSize: Number(e.target.value) })}
            className="w-full accent-indigo-600"
          />
        </div>

        <div>
          <span className="text-[10px] text-slate-400 block mb-1">Color</span>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={current.color}
              onChange={(e) => update({ color: e.target.value })}
              className="w-7 h-7 rounded border border-slate-700 cursor-pointer"
            />
            <span className="font-mono text-[10px] text-slate-400">{current.color}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 block mb-1">Transform</span>
          <select
            value={current.transform}
            onChange={(e) => update({ transform: e.target.value })}
            className={`w-full p-1.5 rounded-lg border text-xs ${
              isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-700 text-white'
            }`}
          >
            <option value="none">Normal</option>
            <option value="uppercase">UPPERCASE</option>
            <option value="lowercase">lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </div>
      </div>

      {/* Live Sample Text Preview */}
      <div 
        className={`p-3 rounded-lg border text-center transition-all ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
        style={{
          fontFamily: current.fontFamily,
          fontSize: `${Math.min(28, Math.max(12, current.fontSize))}px`,
          fontWeight: current.bold ? '700' : current.fontWeight,
          fontStyle: current.italic ? 'italic' : 'normal',
          textDecoration: current.underline ? 'underline' : current.strike ? 'line-through' : 'none',
          letterSpacing: `${current.letterSpacing}px`,
          lineHeight: current.lineHeight,
          color: current.color,
          textAlign: current.align,
          textTransform: current.transform
        }}
      >
        {sampleText}
      </div>
    </div>
  );
}

// 3. Helper to convert typography config object into inline CSS style
export function getTypographyInlineStyle(typo = {}) {
  if (!typo) return {};
  return {
    fontFamily: typo.fontFamily ? `"${typo.fontFamily}", sans-serif` : undefined,
    fontSize: typo.fontSize ? `${typo.fontSize}px` : undefined,
    fontWeight: typo.bold ? '700' : (typo.fontWeight || 'normal'),
    fontStyle: typo.italic ? 'italic' : 'normal',
    textDecoration: typo.underline ? 'underline' : typo.strike ? 'line-through' : 'none',
    letterSpacing: typo.letterSpacing !== undefined ? `${typo.letterSpacing}px` : undefined,
    lineHeight: typo.lineHeight ? `${typo.lineHeight}` : undefined,
    color: typo.color || undefined,
    textAlign: typo.align || undefined,
    textTransform: typo.transform || undefined
  };
}
