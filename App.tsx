
import React, { useState, useEffect } from 'react';
import Scanner from './components/Scanner';
import ResultCard from './components/ResultCard';
import { ScamType, AnalysisResult, ScanHistoryItem } from './types';

const App: React.FC = () => {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [lastResult, setLastResult] = useState<{type: ScamType, content: string, result: AnalysisResult} | null>(null);

  const handleNewScan = (type: ScamType, content: string, result: AnalysisResult) => {
    const newItem: ScanHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      type,
      content,
      result
    };
    setHistory(prev => [newItem, ...prev].slice(0, 5));
    setLastResult({ type, content, result });
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-0">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              <i className="fas fa-fingerprint text-white"></i>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic gradient-text">FINCYS</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-purple-400 transition-colors">DASHBOARD</a>
            <a href="#" className="hover:text-purple-400 transition-colors">THREAT MAP</a>
            <a href="#" className="hover:text-purple-400 transition-colors">SETTINGS</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:bg-zinc-800 transition-all">
              PRO SECURE
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-24">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-in fade-in zoom-in duration-700">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Protect Your <span className="gradient-text">Financial Identity</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            Advanced AI-driven protection against banking scams, fraudulent calls, and malicious messages.
          </p>
          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <i className="fas fa-check-circle text-purple-500"></i> 256-bit Encryption
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <i className="fas fa-check-circle text-purple-500"></i> AI Threat Analysis
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <i className="fas fa-check-circle text-purple-500"></i> Banking Safe
            </div>
          </div>
        </section>

        {/* Action Center */}
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <Scanner onResult={handleNewScan} />
            {lastResult && (
              <ResultCard 
                type={lastResult.type} 
                content={lastResult.content} 
                result={lastResult.result} 
              />
            )}
          </div>

          {/* Side Info / Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-900/30 rounded-xl cyber-border text-center">
              <div className="text-2xl font-black text-purple-400">12K+</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Threats Neutralized</div>
            </div>
            <div className="p-4 bg-zinc-900/30 rounded-xl cyber-border text-center">
              <div className="text-2xl font-black text-pink-400">0.2s</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Analysis Speed</div>
            </div>
            <div className="p-4 bg-zinc-900/30 rounded-xl cyber-border text-center">
              <div className="text-2xl font-black text-white">99.9%</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Accuracy Rating</div>
            </div>
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <section className="mt-16">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-history text-zinc-500"></i>
              Recent Activity
            </h3>
            <div className="space-y-3">
              {history.map(item => (
                <div key={item.id} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex items-center justify-between group hover:bg-zinc-800/40 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.result.verdict === 'SAFE' ? 'bg-green-500/10 text-green-500' : 
                      item.result.verdict === 'DANGEROUS' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      <i className={`fas ${
                        item.type === ScamType.EMAIL ? 'fa-envelope' : 
                        item.type === ScamType.VOICE ? 'fa-phone' : 'fa-comment-dots'
                      }`}></i>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{item.type} Analysis</div>
                      <div className="text-[10px] text-zinc-500">{new Date(item.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                      item.result.verdict === 'SAFE' ? 'border-green-500/20 text-green-500' : 
                      item.result.verdict === 'DANGEROUS' ? 'border-red-500/20 text-red-500' : 'border-yellow-500/20 text-yellow-500'
                    }`}>
                      {item.result.riskScore}%
                    </span>
                    <i className="fas fa-chevron-right text-zinc-700 group-hover:text-purple-500 transition-colors"></i>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="mt-24 py-12 border-t border-zinc-900 text-center">
        <div className="flex flex-col items-center gap-4 opacity-50">
          <div className="flex items-center gap-2">
             <i className="fas fa-fingerprint text-xl text-purple-500"></i>
             <span className="text-lg font-black tracking-tighter uppercase italic">FINCYS CYBERSECURITY</span>
          </div>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">Next-Gen Digital Defense Protocol</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
