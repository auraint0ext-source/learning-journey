import React, { useState, useRef, useEffect } from 'react';
import { API_BASE } from '../config';
import { 
  Play, Save, Plus, Trash2, ArrowRight, CheckCircle2, 
  AlertCircle, Sparkles, RefreshCw, Zap, Sliders, Settings2,
  Box, Share2, Mail, Bell, ShieldCheck, Database, Layers
} from 'lucide-react';

const NODE_PALETTE = [
  {
    category: 'Triggers',
    items: [
      { 
        type: 'trigger', 
        label: '⚡ Order Placed (US, UK, CA)', 
        icon: Zap, 
        lightColor: 'border-amber-400 bg-amber-50 text-amber-950 font-bold hover:bg-amber-100 shadow-xs', 
        darkColor: 'border-amber-500/40 bg-amber-500/10 text-amber-300', 
        config: { trigger_event: 'order_placed' } 
      },
      { 
        type: 'trigger', 
        label: '🎯 New Social Lead (Meta/TikTok)', 
        icon: Sparkles, 
        lightColor: 'border-pink-300 bg-pink-50 text-pink-950 font-bold hover:bg-pink-100 shadow-xs', 
        darkColor: 'border-pink-500/40 bg-pink-500/10 text-pink-300', 
        config: { trigger_event: 'lead_generated' } 
      },
      { 
        type: 'trigger', 
        label: '🛒 Cart Abandoned (Retarget)', 
        icon: RefreshCw, 
        lightColor: 'border-orange-300 bg-orange-50 text-orange-950 font-bold hover:bg-orange-100 shadow-xs', 
        darkColor: 'border-orange-500/40 bg-orange-500/10 text-orange-300', 
        config: { trigger_event: 'cart_abandoned' } 
      },
    ]
  },
  {
    category: 'Regional Routing & POD',
    items: [
      { 
        type: 'action', 
        label: '🏭 Route to Regional POD Hub', 
        icon: Box, 
        lightColor: 'border-indigo-300 bg-indigo-50 text-indigo-950 font-bold hover:bg-indigo-100 shadow-xs', 
        darkColor: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300', 
        config: { action_type: 'pod_fulfill' } 
      },
      { 
        type: 'condition', 
        label: '🔍 Filter Target Market (US/UK/CA)', 
        icon: Sliders, 
        lightColor: 'border-cyan-300 bg-cyan-50 text-cyan-950 font-bold hover:bg-cyan-100 shadow-xs', 
        darkColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300', 
        config: { field: 'target_country', operator: 'equals', value: 'US' } 
      },
    ]
  },
  {
    category: 'Social Ads & Conversions',
    items: [
      { 
        type: 'action', 
        label: '📊 Meta CAPI (Purchase / Lead)', 
        icon: Share2, 
        lightColor: 'border-blue-300 bg-blue-50 text-blue-950 font-bold hover:bg-blue-100 shadow-xs', 
        darkColor: 'border-blue-500/40 bg-blue-500/10 text-blue-300', 
        config: { action_type: 'meta_capi', event_name: 'Purchase' } 
      },
      { 
        type: 'action', 
        label: '🎵 TikTok Events API (Pixel Server)', 
        icon: Share2, 
        lightColor: 'border-purple-300 bg-purple-50 text-purple-950 font-bold hover:bg-purple-100 shadow-xs', 
        darkColor: 'border-purple-500/40 bg-purple-500/10 text-purple-300', 
        config: { action_type: 'tiktok_events', event_name: 'Purchase' } 
      },
      { 
        type: 'action', 
        label: '📈 Google Ads Enhanced Conversion', 
        icon: Share2, 
        lightColor: 'border-emerald-300 bg-emerald-50 text-emerald-950 font-bold hover:bg-emerald-100 shadow-xs', 
        darkColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300', 
        config: { action_type: 'google_enhanced', event_name: 'Purchase' } 
      },
    ]
  },
  {
    category: 'CRM & Notifications',
    items: [
      { 
        type: 'action', 
        label: '✉️ Send Transactional / Voucher Email', 
        icon: Mail, 
        lightColor: 'border-sky-300 bg-sky-50 text-sky-950 font-bold hover:bg-sky-100 shadow-xs', 
        darkColor: 'border-sky-500/40 bg-sky-500/10 text-sky-300', 
        config: { action_type: 'send_email', subject: 'Your POD Order Confirmation' } 
      },
      { 
        type: 'action', 
        label: '🔄 Sync Lead to Klaviyo & HubSpot', 
        icon: Database, 
        lightColor: 'border-teal-300 bg-teal-50 text-teal-950 font-bold hover:bg-teal-100 shadow-xs', 
        darkColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300', 
        config: { action_type: 'crm_sync' } 
      },
      { 
        type: 'action', 
        label: '🔔 Slack Operations Alert', 
        icon: Bell, 
        lightColor: 'border-amber-300 bg-amber-50 text-amber-950 font-bold hover:bg-amber-100 shadow-xs', 
        darkColor: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300', 
        config: { action_type: 'slack_alert' } 
      },
    ]
  }
];

export default function WorkflowCanvas({ currentMarket, storeTheme = 'light' }) {
  const isLight = storeTheme === 'light';
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isConnectMode, setIsConnectMode] = useState(null); // source node id
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [saveStatus, setSaveStatus] = useState(null); // 'saving' | 'success' | 'error'
  const [saveToastMessage, setSaveToastMessage] = useState('');

  const canvasRef = useRef(null);

  // Fetch workflows
  const fetchWorkflows = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/workflows/`);
      if (res.ok) {
        const data = await res.json();
        setWorkflows(data);
        if (data.length > 0) {
          setSelectedWorkflow((prev) => prev || data[0]);
          if (!selectedWorkflow && (!nodes || nodes.length === 0)) {
            loadWorkflow(data[0]);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching workflows:', err);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const loadWorkflow = (wf) => {
    setSelectedWorkflow(wf);
    setNodes(wf.nodes || []);
    setEdges(wf.edges || []);
    setSelectedNode(null);
    setSimulationResult(null);
  };

  // Handle Drag from Palette
  const handleDragStartFromPalette = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  // Handle Drop on Canvas
  const handleDropOnCanvas = (e) => {
    e.preventDefault();
    const dataStr = e.dataTransfer.getData('application/json');
    if (!dataStr) return;

    try {
      const item = JSON.parse(dataStr);
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(20, Math.round(e.clientX - canvasRect.left - 120));
      const y = Math.max(20, Math.round(e.clientY - canvasRect.top - 40));

      const newNode = {
        id: `node-${Date.now()}`,
        type: item.type,
        label: item.label,
        config: { ...item.config },
        position: { x, y }
      };

      setNodes((prev) => [...prev, newNode]);
      setSelectedNode(newNode);
    } catch (err) {
      console.error('Failed to parse dropped node', err);
    }
  };

  // Move existing node on Canvas
  const handleNodeMouseDown = (e, node) => {
    if (e.target.closest('button') || e.target.closest('select')) return;
    setDraggingNodeId(node.id);
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - canvasRect.left - (node.position?.x || 50),
      y: e.clientY - canvasRect.top - (node.position?.y || 50),
    });
    setSelectedNode(node);
  };

  const handleCanvasMouseMove = (e) => {
    if (!draggingNodeId) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = Math.max(10, Math.min(canvasRect.width - 240, e.clientX - canvasRect.left - dragOffset.x));
    const newY = Math.max(10, Math.min(canvasRect.height - 120, e.clientY - canvasRect.top - dragOffset.y));

    setNodes((prev) =>
      prev.map((n) => (n.id === draggingNodeId ? { ...n, position: { x: newX, y: newY } } : n))
    );
  };

  const handleCanvasMouseUp = () => {
    setDraggingNodeId(null);
  };

  // Connect Nodes
  const handleStartConnect = (sourceId) => {
    setIsConnectMode(sourceId);
  };

  const handleCompleteConnect = (targetId) => {
    if (!isConnectMode || isConnectMode === targetId) {
      setIsConnectMode(null);
      return;
    }

    // Check if edge already exists
    const exists = edges.some((e) => e.source === isConnectMode && e.target === targetId);
    if (!exists) {
      const newEdge = {
        id: `e-${isConnectMode}-${targetId}-${Date.now()}`,
        source: isConnectMode,
        target: targetId,
        condition_branch: null
      };
      setEdges((prev) => [...prev, newEdge]);
    }
    setIsConnectMode(null);
  };

  // Delete Node
  const handleDeleteNode = (nodeId) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) => prev.filter((e) => e.source !== nodeId && e.target !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  // Delete Edge
  const handleDeleteEdge = (edgeId) => {
    setEdges((prev) => prev.filter((e) => e.id !== edgeId));
  };

  // Save Workflow
  const handleSaveWorkflow = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    try {
      const payload = {
        name: selectedWorkflow?.name || 'Custom Lead & POD Workflow',
        description: selectedWorkflow?.description || 'Workflow created via drag-and-drop builder',
        trigger_type: selectedWorkflow?.trigger_type || 'lead_generated',
        is_active: selectedWorkflow ? selectedWorkflow.is_active : true,
        nodes: nodes,
        edges: edges
      };

      const url = selectedWorkflow?.id ? `${API_BASE}/api/workflows/${selectedWorkflow.id}` : `${API_BASE}/api/workflows/`;
      const method = selectedWorkflow?.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updated = await res.json();
        setSelectedWorkflow(updated);
        fetchWorkflows();
        setSaveStatus('success');
        setSaveToastMessage('ওয়ার্কফ্লোটি সফলভাবে ডাটাবেজে সেভ হয়েছে!');
        setTimeout(() => setSaveStatus(null), 3500);
      } else {
        const err = await res.json().catch(() => ({}));
        setSaveStatus('error');
        setSaveToastMessage(err.detail || 'সেভ করতে সমস্যা হয়েছে!');
        setTimeout(() => setSaveStatus(null), 3500);
      }
    } catch (err) {
      setSaveStatus('error');
      setSaveToastMessage('সার্ভারে যোগাযোগ করা যায়নি: ' + err.message);
      setTimeout(() => setSaveStatus(null), 3500);
    } finally {
      setIsSaving(false);
    }
  };

  // Execute Simulation
  const handleRunSimulation = async () => {
    if (!selectedWorkflow) return;
    setIsSimulating(true);
    setSimulationResult(null);

    try {
      const testPayload = {
        order_number: `SIM-ORD-${currentMarket}-${Math.floor(1000 + Math.random() * 9000)}`,
        customer_name: 'Sarah Jenkins',
        customer_email: 'sarah.jenkins@example.com',
        target_country: currentMarket,
        currency: currentMarket === 'UK' ? 'GBP' : currentMarket === 'CA' ? 'CAD' : 'USD',
        total_amount: currentMarket === 'UK' ? 39.50 : currentMarket === 'CA' ? 68.20 : 49.99,
        items: [
          {
            product_id: 1,
            title: 'Heavyweight Unisex POD Vintage Hoodie',
            quantity: 1,
            unit_price: currentMarket === 'UK' ? 39.50 : currentMarket === 'CA' ? 68.20 : 49.99
          }
        ]
      };

      const targetWfId = selectedWorkflow?.id || 1;
      const res = await fetch(`${API_BASE}/api/workflows/${targetWfId}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload)
      });

      if (res.ok) {
        const result = await res.json();
        setSimulationResult(result);
      } else {
        const err = await res.json().catch(() => ({}));
        alert('Simulation failed: ' + (err.detail || 'Could not execute workflow'));
      }
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  // Calculate Bezier Paths for Edges
  const renderEdgePath = (edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);
    if (!sourceNode || !targetNode) return null;

    const sx = (sourceNode.position?.x || 50) + 240; // right edge of source
    const sy = (sourceNode.position?.y || 50) + 40;  // middle height
    const tx = (targetNode.position?.x || 50);       // left edge of target
    const ty = (targetNode.position?.y || 50) + 40;  // middle height

    const dx = Math.max(60, Math.abs(tx - sx) / 2);
    const path = `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`;

    return (
      <g key={edge.id} className="cursor-pointer group" onClick={() => handleDeleteEdge(edge.id)}>
        <path
          d={path}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className="transition-all group-hover:stroke-red-400 group-hover:stroke-[3.5]"
        />
        <circle cx={tx} cy={ty} r="4" fill="#818cf8" />
      </g>
    );
  };

  return (
    <div className={`flex h-[calc(100vh-4rem)] overflow-hidden transition-colors ${isLight ? 'bg-slate-100 text-slate-900 admin-light-mode' : 'bg-slate-950 text-white'}`}>
      {/* Left Sidebar: Palette & Workflows (Optimized w-64 width) */}
      <aside className={`w-64 border-r flex flex-col z-20 shrink-0 transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-900/60 border-slate-800 text-white'
      }`}>
        {/* Workflow Selector Bar */}
        <div className={`p-3.5 border-b ${isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Active Workflow
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
              Live
            </span>
          </div>
          <select
            value={selectedWorkflow?.id || ''}
            onChange={(e) => {
              const wf = workflows.find((w) => w.id === parseInt(e.target.value));
              if (wf) loadWorkflow(wf);
            }}
            className={`w-full text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-none ${
              isLight 
                ? 'bg-white border-slate-300 text-slate-900 shadow-xs focus:border-slate-600' 
                : 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500'
            }`}
          >
            {workflows.map((w) => (
              <option key={w.id} value={w.id} className="text-slate-900 bg-white dark:text-white dark:bg-slate-900">
                {w.name}
              </option>
            ))}
          </select>
          <p className={`text-[11px] mt-1.5 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {selectedWorkflow?.description}
          </p>
        </div>

        {/* Node Palette List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar">
          <div className={`flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Drag Nodes onto Canvas</span>
          </div>

          {NODE_PALETTE.map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <h4 className={`text-[11px] font-bold px-1 ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>{cat.category}</h4>
              <div className="space-y-1">
                {cat.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      draggable
                      onDragStart={(e) => handleDragStartFromPalette(e, item)}
                      className={`p-2 rounded-lg border text-xs font-semibold cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] flex items-center space-x-2 ${
                        isLight ? item.lightColor : item.darkColor
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Stats */}
        <div className={`p-3 border-t text-xs flex justify-between ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/90 border-slate-800 text-slate-400'
        }`}>
          <span>Nodes: <strong className={isLight ? 'text-slate-950' : 'text-white'}>{nodes.length}</strong></span>
          <span>Connections: <strong className={isLight ? 'text-slate-950' : 'text-white'}>{edges.length}</strong></span>
          <span>Market: <strong className="text-indigo-500 font-bold">{currentMarket}</strong></span>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className={`flex-1 flex flex-col relative overflow-hidden transition-colors ${isLight ? 'bg-slate-100/60' : 'bg-slate-950'}`}>
        {/* Top Control Bar */}
        <div className={`h-14 border-b px-6 flex items-center justify-between z-10 backdrop-blur-md ${
          isLight ? 'bg-white/95 border-slate-200 text-slate-900 shadow-xs' : 'bg-slate-900/80 border-slate-800 text-white'
        }`}>
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {selectedWorkflow?.name || 'Workflow Builder'}
            </span>
            {isConnectMode && (
              <span className="text-xs bg-amber-500/20 text-amber-500 border border-amber-500/30 px-2.5 py-1 rounded-full animate-pulse font-semibold">
                Click any node to connect as target
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleSaveWorkflow}
              disabled={isSaving}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shadow-md ${
                saveStatus === 'success'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                  : saveStatus === 'error'
                  ? 'bg-rose-600 text-white'
                  : isLight 
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-800' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {saveStatus === 'success' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              ) : (
                <Save className="w-3.5 h-3.5 text-slate-300" />
              )}
              <span>
                {isSaving
                  ? 'Saving...'
                  : saveStatus === 'success'
                  ? '✓ Saved to DB!'
                  : saveStatus === 'error'
                  ? '✗ Error Saving'
                  : 'Save Workflow'}
              </span>
            </button>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer ${
                isLight 
                  ? 'bg-slate-900 hover:bg-slate-800 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? 'Executing...' : 'Test Run / Simulate'}</span>
            </button>
          </div>
        </div>

        {/* Save Status Toast Notification */}
        {saveStatus && (
          <div
            className={`absolute top-16 right-6 z-50 px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-semibold backdrop-blur-md transition-all animate-bounce ${
              saveStatus === 'success'
                ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300'
                : 'bg-rose-950/90 border border-rose-500 text-rose-300'
            }`}
          >
            {saveStatus === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{saveToastMessage}</span>
          </div>
        )}

        {/* Canvas Body */}
        <div
          ref={canvasRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnCanvas}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          className="flex-1 relative overflow-auto canvas-grid select-none"
          style={{ minHeight: '600px', minWidth: '900px' }}
        >
          {/* SVG Overlay for Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-auto z-0" style={{ minWidth: '1200px', minHeight: '800px' }}>
            <defs>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            {edges.map(renderEdgePath)}
          </svg>

          {/* Render Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isConnectingSource = isConnectMode === node.id;

            return (
              <div
                key={node.id}
                onMouseDown={(e) => handleNodeMouseDown(e, node)}
                onClick={() => {
                  if (isConnectMode && isConnectMode !== node.id) {
                    handleCompleteConnect(node.id);
                  } else {
                    setSelectedNode(node);
                  }
                }}
                style={{
                  transform: `translate(${node.position?.x || 50}px, ${node.position?.y || 50}px)`,
                }}
                className={`absolute w-60 rounded-xl p-3 border transition-shadow cursor-move z-10 ${
                  isConnectingSource
                    ? 'border-amber-400 bg-amber-500/20 shadow-lg ring-2 ring-amber-400'
                    : isSelected
                    ? isLight 
                      ? 'border-slate-900 bg-white shadow-xl ring-2 ring-slate-800' 
                      : 'border-indigo-500 bg-slate-900/95 shadow-xl ring-2 ring-indigo-500'
                    : isLight 
                      ? 'border-slate-300 bg-white shadow-md hover:border-slate-400' 
                      : 'border-slate-800 bg-slate-900/90 shadow-lg hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      node.type === 'trigger'
                        ? isLight ? 'bg-amber-100 text-amber-950 border border-amber-300' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : node.type === 'condition'
                        ? isLight ? 'bg-cyan-100 text-cyan-950 border border-cyan-300' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : isLight ? 'bg-indigo-100 text-indigo-950 border border-indigo-300' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    }`}
                  >
                    {node.type}
                  </span>

                  <div className="flex items-center space-x-1">
                    <button
                      title="Connect this node to another"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartConnect(node.id);
                      }}
                      className={`p-1 rounded transition ${
                        isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-800'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Delete Node"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNode(node.id);
                      }}
                      className={`p-1 rounded transition ${
                        isLight ? 'text-slate-500 hover:text-rose-600 hover:bg-slate-100' : 'text-slate-400 hover:text-red-400 hover:bg-slate-800'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className={`text-xs font-bold mb-1.5 leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {node.label}
                </div>

                {node.config?.action_type && (
                  <div className={`text-[11px] rounded px-2 py-1 font-mono font-medium ${
                    isLight ? 'text-slate-800 bg-slate-100 border border-slate-200' : 'text-slate-400 bg-slate-800/60'
                  }`}>
                    action: {node.config.action_type}
                  </div>
                )}
                {node.config?.trigger_event && (
                  <div className={`text-[11px] rounded px-2 py-1 font-mono font-medium ${
                    isLight ? 'text-slate-800 bg-slate-100 border border-slate-200' : 'text-slate-400 bg-slate-800/60'
                  }`}>
                    event: {node.config.trigger_event}
                  </div>
                )}
                {node.config?.field && (
                  <div className={`text-[11px] rounded px-2 py-1 font-mono font-medium ${
                    isLight ? 'text-slate-800 bg-slate-100 border border-slate-200' : 'text-slate-400 bg-slate-800/60'
                  }`}>
                    if {node.config.field} == {node.config.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Simulation Execution Drawer / Modal */}
        {simulationResult && (
          <div className={`absolute bottom-0 left-0 right-0 max-h-80 border-t backdrop-blur-md z-30 p-4 overflow-y-auto ${
            isLight ? 'bg-white/95 border-slate-200 shadow-xl text-slate-900' : 'bg-slate-900/95 border-slate-800 text-white'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Workflow Execution Trace: {simulationResult.workflow_name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
                  STATUS: {simulationResult.status}
                </span>
              </div>
              <button
                onClick={() => setSimulationResult(null)}
                className={`text-xs px-2 py-1 rounded transition ${
                  isLight ? 'text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-300' : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                Close Trace
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {simulationResult.logs?.map((step, idx) => (
                <div key={idx} className={`border rounded-lg p-3 text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`font-bold truncate ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{step.node_label}</span>
                    <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono font-bold">
                      {step.status}
                    </span>
                  </div>
                  <pre className={`text-[10px] p-2 rounded overflow-x-auto font-mono max-h-24 ${
                    isLight ? 'text-slate-700 bg-white border border-slate-200' : 'text-slate-400 bg-slate-900'
                  }`}>
                    {JSON.stringify(step.output, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Right Properties Drawer */}
      {selectedNode && (
        <aside className={`w-72 border-l p-4 z-20 flex flex-col justify-between transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-800 shadow-lg' : 'bg-slate-900/80 border-slate-800 text-white'
        }`}>
          <div>
            <div className={`flex items-center justify-between pb-3 border-b mb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <div className={`flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-slate-800' : 'text-slate-300'
              }`}>
                <Settings2 className="w-4 h-4 text-indigo-500" />
                <span>Node Inspector</span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Step Label</label>
                <input
                  type="text"
                  value={selectedNode.label}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNodes((prev) =>
                      prev.map((n) => (n.id === selectedNode.id ? { ...n, label: val } : n))
                    );
                    setSelectedNode((prev) => ({ ...prev, label: val }));
                  }}
                  className={`w-full rounded px-2.5 py-1.5 border ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 font-medium' : 'bg-slate-800 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Node Type</label>
                <div className={`px-2.5 py-1.5 rounded font-mono ${
                  isLight ? 'bg-slate-100 text-slate-800 border border-slate-200' : 'bg-slate-800/60 text-slate-300'
                }`}>
                  {selectedNode.type}
                </div>
              </div>

              {selectedNode.type === 'action' && selectedNode.config?.action_type && (
                <div>
                  <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Action Type</label>
                  <div className={`px-2.5 py-1.5 rounded font-mono ${
                    isLight ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-bold' : 'bg-slate-800/60 text-indigo-300'
                  }`}>
                    {selectedNode.config.action_type}
                  </div>
                </div>
              )}

              {selectedNode.config?.event_name && (
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Conversion Event Name</label>
                  <select
                    value={selectedNode.config.event_name}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updatedConfig = { ...selectedNode.config, event_name: val };
                      setNodes((prev) =>
                        prev.map((n) =>
                          n.id === selectedNode.id ? { ...n, config: updatedConfig } : n
                        )
                      );
                      setSelectedNode((prev) => ({ ...prev, config: updatedConfig }));
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  >
                    <option value="Purchase">Purchase (CAPI Standard)</option>
                    <option value="Lead">Lead (Instant Form)</option>
                    <option value="AddToCart">AddToCart</option>
                    <option value="InitiateCheckout">InitiateCheckout</option>
                  </select>
                </div>
              )}

              {selectedNode.config?.field && (
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Condition Match Value</label>
                  <input
                    type="text"
                    value={selectedNode.config.value || 'US'}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updatedConfig = { ...selectedNode.config, value: val };
                      setNodes((prev) =>
                        prev.map((n) =>
                          n.id === selectedNode.id ? { ...n, config: updatedConfig } : n
                        )
                      );
                      setSelectedNode((prev) => ({ ...prev, config: updatedConfig }));
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <button
              onClick={() => handleDeleteNode(selectedNode.id)}
              className="w-full flex items-center justify-center space-x-1 px-3 py-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete This Step</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
