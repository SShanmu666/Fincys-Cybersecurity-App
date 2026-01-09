
export enum ScamType {
  EMAIL = 'Email',
  WHATSAPP = 'WhatsApp',
  SMS = 'SMS',
  VOICE = 'Voice Call',
  BANKING = 'Banking Credential'
}

export interface AnalysisResult {
  riskScore: number;
  verdict: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
  summary: string;
  threats: string[];
  recommendations: string[];
}

export interface ScanHistoryItem {
  id: string;
  timestamp: number;
  type: ScamType;
  content: string;
  result: AnalysisResult;
}
