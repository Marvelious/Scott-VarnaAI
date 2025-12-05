// ABOUTME: Step 1 of complaint wizard - Complaint type selection
// ABOUTME: Allows user to choose the category of their complaint

import { ComplaintType } from '../types/complaint';

interface WizardStep1Props {
  selectedType: ComplaintType | '';
  onSelect: (type: ComplaintType) => void;
}

const complaintTypes = [
  { value: 'contractor' as ComplaintType, label: 'Contractors/Tradespeople', description: 'Renovation, construction, plumbing, electrical' },
  { value: 'product' as ComplaintType, label: 'Retail/Products', description: 'Defective goods, wrong items, missing parts' },
  { value: 'service' as ComplaintType, label: 'Professional Services', description: 'Lawyers, accountants, consultants' },
  { value: 'online-service' as ComplaintType, label: 'Online Services', description: 'Subscriptions, digital products, SaaS' },
  { value: 'utilities' as ComplaintType, label: 'Utilities', description: 'Internet, phone, electricity, water' },
  { value: 'travel' as ComplaintType, label: 'Travel', description: 'Hotels, airlines, tours' },
  { value: 'automotive' as ComplaintType, label: 'Automotive', description: 'Repairs, dealers, mechanics' },
  { value: 'real-estate' as ComplaintType, label: 'Real Estate', description: 'Landlords, property management' },
];

export default function WizardStep1({ selectedType, onSelect }: WizardStep1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Select Complaint Type</h2>
        <p className="text-gray-400">Choose the category that best describes your complaint</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complaintTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onSelect(type.value)}
            className={`
              text-left p-6 rounded-xl border-2 transition-all duration-300
              ${selectedType === type.value
                ? 'border-primary bg-primary/10 shadow-glow-purple'
                : 'border-dark-border bg-dark-card hover:border-primary/50 hover:bg-dark-surface'
              }
            `}
          >
            <h3 className="text-lg font-semibold text-white mb-2">{type.label}</h3>
            <p className="text-sm text-gray-400">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}