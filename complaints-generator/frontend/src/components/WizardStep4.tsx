// ABOUTME: Step 4 of complaint wizard - Evidence and resolution attempts
// ABOUTME: Tracks what evidence exists and how many times contact was attempted

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { ComplaintFormData } from '../types/complaint';

interface WizardStep4Props {
  register: UseFormRegister<ComplaintFormData>;
  errors: FieldErrors<ComplaintFormData>;
  watch: UseFormWatch<ComplaintFormData>;
}

export default function WizardStep4({ register, errors, watch }: WizardStep4Props) {
  const contactAttempts = watch('contactAttempts') || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Evidence & Resolution Attempts</h2>
        <p className="text-gray-400">Document what evidence you have and your attempts to resolve</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Available Evidence</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-4 bg-dark-card border border-dark-border rounded-lg cursor-pointer hover:border-primary/50 transition-all">
            <input
              type="checkbox"
              {...register('hasContract')}
              className="w-5 h-5 rounded border-dark-border bg-dark-surface text-primary focus:ring-primary focus:ring-2"
            />
            <span className="text-gray-300">I have a written contract or agreement</span>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-dark-card border border-dark-border rounded-lg cursor-pointer hover:border-primary/50 transition-all">
            <input
              type="checkbox"
              {...register('hasReceipts')}
              className="w-5 h-5 rounded border-dark-border bg-dark-surface text-primary focus:ring-primary focus:ring-2"
            />
            <span className="text-gray-300">I have payment receipts</span>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-dark-card border border-dark-border rounded-lg cursor-pointer hover:border-primary/50 transition-all">
            <input
              type="checkbox"
              {...register('hasPhotos')}
              className="w-5 h-5 rounded border-dark-border bg-dark-surface text-primary focus:ring-primary focus:ring-2"
            />
            <span className="text-gray-300">I have photos of the work/problem</span>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-dark-card border border-dark-border rounded-lg cursor-pointer hover:border-primary/50 transition-all">
            <input
              type="checkbox"
              {...register('hasMessages')}
              className="w-5 h-5 rounded border-dark-border bg-dark-surface text-primary focus:ring-primary focus:ring-2"
            />
            <span className="text-gray-300">I have messages/emails with the business</span>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-dark-card border border-dark-border rounded-lg cursor-pointer hover:border-primary/50 transition-all">
            <input
              type="checkbox"
              {...register('hasWitnesses')}
              className="w-5 h-5 rounded border-dark-border bg-dark-surface text-primary focus:ring-primary focus:ring-2"
            />
            <span className="text-gray-300">I have witnesses who can confirm</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Contact Attempts</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of Contact Attempts <span className="text-error">*</span>
          </label>
          <input
            type="number"
            {...register('contactAttempts', {
              required: 'This field is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Must be 0 or greater' }
            })}
            className="input-field"
            placeholder="0"
            min="0"
          />
          {errors.contactAttempts && (
            <p className="text-error text-sm mt-1">{errors.contactAttempts.message}</p>
          )}
        </div>

        {contactAttempts > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Responses Received
            </label>
            <textarea
              {...register('responsesReceived')}
              className="textarea-field"
              rows={3}
              placeholder="Describe any responses you received (or 'No response' if ignored)"
            />
          </div>
        )}
      </div>
    </div>
  );
}