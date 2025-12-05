// ABOUTME: Type definitions for complaint data structure
// ABOUTME: Used throughout the complaint wizard and generation process

export type ComplaintType =
  | 'contractor'
  | 'product'
  | 'service'
  | 'online-service'
  | 'utilities'
  | 'travel'
  | 'automotive'
  | 'real-estate';

export type ComplaintTone =
  | 'professional'
  | 'firm'
  | 'aggressive'
  | 'maximum';

export type Language = 'bg' | 'de' | 'en';

export interface ComplaintFormData {
  // Step 1: Complaint Type
  complaintType: ComplaintType;

  // Step 2: Party Details
  businessName: string;
  businessType: string;
  location: string;
  yourName?: string; // Optional, can be redacted

  // Step 3: Problem Description
  dateOfAgreement: string;
  dateWorkSupposed: string;
  paymentAmount: number;
  paymentMethod: string;
  whatPromised: string;
  whatNotDelivered: string;
  specificIssues: string[];
  financialImpact: number;

  // Step 4: Evidence & Resolution Attempts
  hasContract: boolean;
  hasReceipts: boolean;
  hasPhotos: boolean;
  hasMessages: boolean;
  hasWitnesses: boolean;
  contactAttempts: number;
  contactDates: string[];
  responsesReceived: string;

  // Step 5: Tone & Language
  tone: ComplaintTone;
  language: Language;
}

export interface GeneratedLetter {
  id: string;
  content: string;
  language: Language;
  tone: ComplaintTone;
  createdAt: Date;
  complaintId: string;
  aiProvider: 'ollama' | 'openai' | 'claude';
}

export interface PlatformRecommendation {
  name: string;
  url: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  category: string;
}