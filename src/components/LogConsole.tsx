import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const SAMPLE_LOGS = [
  "System initialized...",
  "Connecting to neural network...",
  "Agent Alpha: Task completed successfully.",
  "Agent Beta: Awaiting new instructions.",
  "Data stream synchronized.",
  "Warning: Latency spike detected in sector 4.",
  "Optimizing memory usage...",
  "Network handshake established.",
];

const LogConsole = () => {
  const [logs, setLogs] = useState<string[]>(["Initializing Nexus Protocol..."]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = SAMPLE_LOGS[Math.floor(Math.random() * SAMPLE_LOGS.length)];
      const timestamp = new Date().toLocaleTimeString();
      
      setLogs(prev => [...prev, `[${timestamp}] ${randomLog}`].slice(-8)); // Simpan max 8 log terakhir
    }, 2000); // Tambah log setiap 2 detik

    return () => clearInterval(interval);
  }, []);

  // Auto scroll ke bawah setiap ada log baru
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-xl border border-slate-700 shadow-inner h-64 overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2 text-slate-400">
        <Terminal size={16} />
        <span className="font-bold tracking-widest text-xs uppercase">System Live Logs</span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className="opacity-90 hover:opacity-100 transition-opacity">
            <span className="mr-2 text-blue-500">{'>'}</span>
            {log}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default LogConsole;