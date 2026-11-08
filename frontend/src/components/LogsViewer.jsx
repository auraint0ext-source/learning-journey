import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import { Terminal, CheckCircle2, AlertTriangle, RefreshCw, Layers, Clock } from 'lucide-react';

export default function LogsViewer() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/workflows/logs/recent`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
        if (data.length > 0 && !selectedLog) {
          setSelectedLog(data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch execution logs', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>Workflow Engine Live Audit & Execution Logs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time traces of automated triggers, Print-on-Demand order routing, and marketing conversion events.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={isLoading}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Log History List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2 max-h-[650px] overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Recent Executions ({logs.length})
          </div>

          {logs.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs">
              No workflow execution records yet.
            </div>
          ) : (
            logs.map((log) => {
              const isSelected = selectedLog?.id === log.id;
              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-md ring-1 ring-indigo-500'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white truncate max-w-[180px]">{log.workflow_name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400 text-[11px] mt-2">
                    <span>Source: <strong className="text-slate-300">{log.trigger_source}</strong></span>
                    <span>{log.steps_count} steps</span>
                  </div>

                  <div className="text-[10px] text-slate-500 mt-1 flex items-center space-x-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(log.created_at).toLocaleTimeString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Step-by-Step Execution Trace Details */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          {selectedLog ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-white">{selectedLog.workflow_name}</h2>
                  <p className="text-xs text-slate-400">
                    Triggered by: <span className="font-mono text-indigo-400">{selectedLog.trigger_source}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Execution Timestamp</span>
                  <span className="text-xs font-mono text-slate-300">
                    {new Date(selectedLog.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Step Breakdown ({selectedLog.steps_executed?.length || 0} Actions)
                </h3>

                <div className="space-y-3">
                  {selectedLog.steps_executed?.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[10px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-white">{step.node_label}</span>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                            {step.node_type}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {step.status}
                        </span>
                      </div>

                      <div className="mt-2">
                        <div className="text-[11px] text-slate-400 mb-1 font-medium">Output Details:</div>
                        <pre className="text-[11px] text-emerald-300 bg-slate-900 border border-slate-800/80 rounded-lg p-3 font-mono overflow-x-auto">
                          {JSON.stringify(step.output, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 text-xs">
              Select an execution log on the left to inspect its detailed trace.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
