// ABOUTME: Step 2 of complaint wizard - Party details collection
// ABOUTME: Collects information about the business and parties involved

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ComplaintFormData } from '../types/complaint';

interface WizardStep2Props {
  register: UseFormRegister<ComplaintFormData>;
  errors: FieldErrors<ComplaintFormData>;
}

export default function WizardStep2({ register, errors }: WizardStep2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Party Details</h2>
        <p className="text-gray-400">Information about the business you're complaining about</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Business Name <span className="text-error">*</span>
          </label>
          <input
            {...register('businessName', { required: 'Business name is required' })}
            className="input-field"
            placeholder="e.g., George's Renovation Services"
          />
          {errors.businessName && (
            <p className="text-error text-sm mt-1">{errors.businessName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Business Type <span className="text-error">*</span>
          </label>
          <input
            {...register('businessType', { required: 'Business type is required' })}
            className="input-field"
            placeholder="e.g., Construction Contractor, Plumber, etc."
          />
          {errors.businessType && (
            <p className="text-error text-sm mt-1">{errors.businessType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location <span className="text-error">*</span>
          </label>
          <input
            {...register('location', { required: 'Location is required' })}
            className="input-field"
            placeholder="e.g., Varna, Bulgaria"
          />
          {errors.location && (
            <p className="text-error text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Name <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            {...register('yourName')}
            className="input-field"
            placeholder="Leave blank to keep anonymous"
          />
          <p className="text-xs text-gray-500 mt-1">Your name can be redacted from the final letter</p>
        </div>
      </div>
    </div>
  );
}