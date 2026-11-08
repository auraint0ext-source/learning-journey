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
      { type: 'trigger', label: '⚡ Order Placed (US, UK, CA)', icon: Zap, color: 'border-amber-500/40 bg-amber-500/10 text-amber-300', config: { trigger_event: 'order_placed' } },
      { type: 'trigger', label: '🎯 New Social Lead (Meta/TikTok)', icon: Sparkles, color: 'border-pink-500/40 bg-pink-500/10 text-pink-300', config: { trigger_event: 'lead_generated' } },
      { type: 'trigger', label: '🛒 Cart Abandoned (Retarget)', icon: RefreshCw, color: 'border-orange-500/40 bg-orange-500/10 text-orange-300', config: { trigger_event: 'cart_abandoned' } },
    ]
  },
  {
    category: 'Regional Routing & POD',
    items: [
      { type: 'action', label: '🏭 Route to Regional POD Hub', icon: Box, color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300', config: { action_type: 'pod_fulfill' } },
      { type: 'condition', label: '🔍 Filter by Target Market (US/UK/CA)', icon: Sliders, color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300', config: { field: 'target_country', operator: 'equals', value: 'US' } },
    ]
  },
  {
    category: 'Social Ads & Conversions',
    items: [
      { type: 'action', label: '📊 Meta CAPI (Purchase / Lead)', icon: Share2, color: 'border-blue-500/40 bg-blue-500/10 text-blue-300', config: { action_type: 'meta_capi', event_name: 'Purchase' } },
      { type: 'action', label: '🎵 TikTok Events API (Pixel Server)', icon: Share2, color: 'border-purple-500/40 bg-purple-500/10 text-purple-300', config: { action_type: 'tiktok_events', event_name: 'Purchase' } },
      { type: 'action', label: '📈 Google Ads Enhanced Conversion', icon: Share2, color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300', config: { action_type: 'google_enhanced', event_name: 'Purchase' } },
    ]
  },
  {
    category: 'CRM & Notifications',
    items: [
      { type: 'action', label: '✉️ Send Transactional / Voucher Email', icon: Mail, color: 'border-sky-500/40 bg-sky-500/10 text-sky-300', config: { action_type: 'send_email', subject: 'Your POD Order Confirmation' } },
      { type: 'action', label: '🔄 Sync Lead to Klaviyo & HubSpot', icon: Database, color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300', config: { action_type: 'crm_sync' } },
      { type: 'action', label: '🔔 Slack Operations Team Alert', icon: Bell, color: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300', config: { action_type: 'slack_alert' } },
    ]
  }
];

export default function WorkflowCanvas({ currentMarket }) {
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
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-950">
      {/* Left Sidebar: Palette & Workflows */}
      <aside className="w-80 border-r border-slate-800 bg-slate-900/60 flex flex-col z-20">
        {/* Workflow Selector Bar */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Workflow</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Live
            </span>
          </div>
          <select
            value={selectedWorkflow?.id || ''}
            onChange={(e) => {
              const wf = workflows.find((w) => w.id === parseInt(e.target.value));
              if (wf) loadWorkflow(wf);
            }}
            className="w-full bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            {workflows.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2">{selectedWorkflow?.description}</p>
        </div>

        {/* Node Palette List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Drag Nodes onto Canvas</span>
          </div>

          {NODE_PALETTE.map((cat, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 px-1">{cat.category}</h4>
              <div className="space-y-1.5">
                {cat.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      draggable
                      onDragStart={(e) => handleDragStartFromPalette(e, item)}
                      className={`p-2.5 rounded-lg border text-xs font-medium cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] flex items-center space-x-2.5 ${item.color}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Stats */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 text-xs text-slate-400 flex justify-between">
          <span>Nodes: <strong className="text-white">{nodes.length}</strong></span>
          <span>Connections: <strong className="text-white">{edges.length}</strong></span>
          <span>Market: <strong className="text-indigo-400">{currentMarket}</strong></span>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
        {/* Top Control Bar */}
        <div className="h-14 border-b border-slate-800 bg-slate-900/80 px-6 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-white">{selectedWorkflow?.name || 'Workflow Builder'}</span>
            {isConnectMode && (
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full animate-pulse">
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
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {saveStatus === 'success' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              ) : (
                <Save className="w-3.5 h-3.5 text-slate-400" />
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
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
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
                className={`absolute w-60 rounded-xl p-3.5 border transition-shadow cursor-move z-10 ${
                  isConnectingSource
                    ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                    : isSelected
                    ? 'border-indigo-500 bg-slate-900/95 shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-500'
                    : 'border-slate-800 bg-slate-900/90 shadow-lg hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      node.type === 'trigger'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : node.type === 'condition'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
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
                      className="p-1 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Delete Node"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNode(node.id);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs font-semibold text-white mb-1.5 leading-snug">{node.label}</div>

                {node.config?.action_type && (
                  <div className="text-[11px] text-slate-400 bg-slate-800/60 rounded px-2 py-1 font-mono">
                    action: {node.config.action_type}
                  </div>
                )}
                {node.config?.trigger_event && (
                  <div className="text-[11px] text-slate-400 bg-slate-800/60 rounded px-2 py-1 font-mono">
                    event: {node.config.trigger_event}
                  </div>
                )}
                {node.config?.field && (
                  <div className="text-[11px] text-slate-400 bg-slate-800/60 rounded px-2 py-1 font-mono">
                    if {node.config.field} == {node.config.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Simulation Execution Drawer / Modal */}
        {simulationResult && (
          <div className="absolute bottom-0 left-0 right-0 max-h-80 border-t border-slate-800 bg-slate-900/95 backdrop-blur-md z-30 p-4 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">
                  Workflow Execution Trace: {simulationResult.workflow_name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  STATUS: {simulationResult.status}
                </span>
              </div>
              <button
                onClick={() => setSimulationResult(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                Close Trace
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {simulationResult.logs?.map((step, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-200 truncate">{step.node_label}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
                      {step.status}
                    </span>
                  </div>
                  <pre className="text-[10px] text-slate-400 bg-slate-900 p-2 rounded overflow-x-auto font-mono max-h-24">
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
        <aside className="w-72 border-l border-slate-800 bg-slate-900/80 p-4 z-20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <Settings2 className="w-4 h-4 text-indigo-400" />
                <span>Node Inspector</span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Step Label</label>
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
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Node Type</label>
                <div className="px-2.5 py-1.5 bg-slate-800/60 rounded text-slate-300 font-mono">
                  {selectedNode.type}
                </div>
              </div>

              {selectedNode.type === 'action' && selectedNode.config?.action_type && (
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Action Type</label>
                  <div className="px-2.5 py-1.5 bg-slate-800/60 rounded text-indigo-300 font-mono">
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
