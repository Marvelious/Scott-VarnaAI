// ABOUTME: Step 5 of complaint wizard - Tone and language selection
// ABOUTME: Allows user to choose letter aggression level and language

import { ComplaintTone, Language } from '../types/complaint';

interface WizardStep5Props {
  selectedTone: ComplaintTone | '';
  selectedLanguage: Language | '';
  onToneSelect: (tone: ComplaintTone) => void;
  onLanguageSelect: (language: Language) => void;
}

const tones = [
  {
    value: 'professional' as ComplaintTone,
    label: 'Professional',
    description: 'Formal, neutral, business-like tone',
    example: 'Polite request for resolution with professional language'
  },
  {
    value: 'firm' as ComplaintTone,
    label: 'Firm',
    description: 'Direct demands with mild consequences',
    example: 'Clear expectations with mention of next steps if unresolved'
  },
  {
    value: 'aggressive' as ComplaintTone,
    label: 'Aggressive',
    description: 'Strong language with legal threats',
    example: 'Explicit warnings about reviews, consumer protection, and legal action'
  },
  {
    value: 'maximum' as ComplaintTone,
    label: 'Maximum Legal Pressure',
    description: 'All legal options and escalation threats',
    example: 'Full threat of litigation, consumer protection complaints, and public reviews'
  },
];

const languages = [
  { value: 'bg' as Language, label: 'Bulgarian', flag: '🇧🇬' },
  { value: 'de' as Language, label: 'German', flag: '🇩🇪' },
  { value: 'en' as Language, label: 'English', flag: '🇬🇧' },
];

export default function WizardStep5({
  selectedTone,
  selectedLanguage,
  onToneSelect,
  onLanguageSelect
}: WizardStep5Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Tone & Language</h2>
        <p className="text-gray-400">Choose how aggressive the letter should be and in what language</p>
      </div>

      {/* Language Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Letter Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => onLanguageSelect(lang.value)}
              className={`
                text-center p-6 rounded-xl border-2 transition-all duration-300
                ${selectedLanguage === lang.value
                  ? 'border-primary bg-primary/10 shadow-glow-purple'
                  : 'border-dark-border bg-dark-card hover:border-primary/50 hover:bg-dark-surface'
                }
              `}
            >
              <div className="text-4xl mb-2">{lang.flag}</div>
              <h4 className="text-lg font-semibold text-white">{lang.label}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Letter Tone</h3>
        <div className="space-y-4">
          {tones.map((tone) => (
            <button
              key={tone.value}
              onClick={() => onToneSelect(tone.value)}
              className={`
                w-full text-left p-6 rounded-xl border-2 transition-all duration-300
                ${selectedTone === tone.value
                  ? 'border-primary bg-primary/10 shadow-glow-purple'
                  : 'border-dark-border bg-dark-card hover:border-primary/50 hover:bg-dark-surface'
                }
              `}
            >
              <h4 className="text-lg font-semibold text-white mb-2">{tone.label}</h4>
              <p className="text-sm text-gray-400 mb-2">{tone.description}</p>
              <p className="text-xs text-gray-500 italic">{tone.example}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-warning/10 border border-warning/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-warning text-xl">⚠️</span>
          <div className="flex-1">
            <p className="text-sm text-warning font-medium mb-1">Legal Safety Notice</p>
            <p className="text-xs text-gray-400">
              All generated letters are designed to be factual and legally defensible. However, this is NOT legal advice.
              For high-stakes disputes, consider consulting with a lawyer before sending.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}