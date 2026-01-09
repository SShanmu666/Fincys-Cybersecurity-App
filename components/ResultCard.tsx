
import React from 'react';
import { AnalysisResult, ScamType } from '../types';

interface ResultCardProps {
  type: ScamType;
  content: string;
  result: AnalysisResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ type, content, result }) => {
  const getVerdictStyles = () => {
    switch (result.verdict) {
      case 'SAFE': return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'fa-check-circle' };
      case 'SUSPICIOUS': return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: 'fa-exclamation-triangle' };
      case 'DANGEROUS': return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: 'fa-radiation' };
    }
  };

  const styles = getVerdictStyles();

  return (
    <div className={`mt-6 rounded-2xl border ${styles.border} ${styles.bg} p-6 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${styles.bg} ${styles.color} border ${styles.border}`}>
            <i className={`fas ${styles.icon}`}></i> {result.verdict}
          </span>
          <h3 className="text-xl font-bold text-white">Risk Analysis Report</h3>
          <p className="text-zinc-400 text-sm mt-1">{type} Scan Results</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-black ${styles.color}`}>{result.riskScore}%</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Risk Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-zinc-300 uppercase mb-2 flex items-center gap-2">
              <i className="fas fa-search"></i> Summary
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">{result.summary}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-300 uppercase mb-2 flex items-center gap-2">
              <i className="fas fa-skull-crossbones text-red-500/50"></i> Threats Detected
            </h4>
            <ul className="space-y-1">
              {result.threats.map((threat, i) => (
                <li key={i} className="text-zinc-400 text-sm flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span> {threat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
            <h4 className="text-sm font-bold text-purple-400 uppercase mb-3 flex items-center gap-2">
              <i className="fas fa-shield-alt"></i> Recommended Actions
            </h4>
            <div className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-3 items-center bg-zinc-900/50 p-2 rounded-lg text-xs text-zinc-300 border border-zinc-800">
                  <div className="w-5 h-5 flex items-center justify-center bg-purple-500/20 rounded text-purple-400 font-bold">{i + 1}</div>
                  {rec}
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-zinc-600 italic">
            Original content excerpt: "{content.substring(0, 100)}..."
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
