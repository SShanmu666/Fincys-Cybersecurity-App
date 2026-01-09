
import React, { useState } from 'react';
import { ScamType, AnalysisResult } from '../types';
import { analyzeThreat } from '../services/geminiService';

interface ScannerProps {
  onResult: (type: ScamType, content: string, result: AnalysisResult) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onResult }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<ScamType>(ScamType.WHATSAPP);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeThreat(content, type);
      onResult(type, content, result);
      setContent('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 p-6 rounded-2xl cyber-border border-purple-500/20">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-shield-virus text-purple-500"></i>
            New Scan
          </h2>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value as ScamType)}
            className="bg-black border border-zinc-700 text-sm rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {Object.values(ScamType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Paste ${type} content here (emails, text messages, URLs)...`}
          className="w-full h-40 bg-black/50 border border-zinc-800 rounded-xl p-4 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-zinc-600"
        />

        {error && (
          <div className="text-red-400 text-sm bg-red-900/10 p-3 rounded-lg border border-red-900/20">
            {error}
          </div>
        )}

        <button
          onClick={handleScan}
          disabled={loading || !content.trim()}
          className={`py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
            ${loading ? 'bg-zinc-800 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/20'}
          `}
        >
          {loading ? (
            <><i className="fas fa-circle-notch animate-spin"></i> Analyzing...</>
          ) : (
            <><i className="fas fa-bolt"></i> Run Deep Scan</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Scanner;
