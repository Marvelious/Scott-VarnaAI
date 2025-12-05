// ABOUTME: Step 3 of complaint wizard - Problem description
// ABOUTME: Collects detailed information about what went wrong

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ComplaintFormData } from '../types/complaint';

interface WizardStep3Props {
  register: UseFormRegister<ComplaintFormData>;
  errors: FieldErrors<ComplaintFormData>;
}

export default function WizardStep3({ register, errors }: WizardStep3Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Problem Description</h2>
        <p className="text-gray-400">Describe what went wrong and the financial impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date of Agreement <span className="text-error">*</span>
          </label>
          <input
            type="date"
            {...register('dateOfAgreement', { required: 'Date is required' })}
            className="input-field"
          />
          {errors.dateOfAgreement && (
            <p className="text-error text-sm mt-1">{errors.dateOfAgreement.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date Work Was Supposed to Finish <span className="text-error">*</span>
          </label>
          <input
            type="date"
            {...register('dateWorkSupposed', { required: 'Date is required' })}
            className="input-field"
          />
          {errors.dateWorkSupposed && (
            <p className="text-error text-sm mt-1">{errors.dateWorkSupposed.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Payment Amount <span className="text-error">*</span>
          </label>
          <input
            type="number"
            {...register('paymentAmount', {
              required: 'Amount is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Amount must be positive' }
            })}
            className="input-field"
            placeholder="0.00"
            step="0.01"
          />
          {errors.paymentAmount && (
            <p className="text-error text-sm mt-1">{errors.paymentAmount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Payment Method <span className="text-error">*</span>
          </label>
          <select
            {...register('paymentMethod', { required: 'Payment method is required' })}
            className="select-field"
          >
            <option value="">Select payment method</option>
            <option value="cash">Cash</option>
            <option value="bank-transfer">Bank Transfer</option>
            <option value="card">Credit/Debit Card</option>
            <option value="check">Check</option>
            <option value="other">Other</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-error text-sm mt-1">{errors.paymentMethod.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          What Was Promised <span className="text-error">*</span>
        </label>
        <textarea
          {...register('whatPromised', { required: 'This field is required' })}
          className="textarea-field"
          rows={3}
          placeholder="Describe what was agreed upon in the contract or verbal agreement"
        />
        {errors.whatPromised && (
          <p className="text-error text-sm mt-1">{errors.whatPromised.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          What Was NOT Delivered <span className="text-error">*</span>
        </label>
        <textarea
          {...register('whatNotDelivered', { required: 'This field is required' })}
          className="textarea-field"
          rows={3}
          placeholder="Describe specifically what work was not completed or done incorrectly"
        />
        {errors.whatNotDelivered && (
          <p className="text-error text-sm mt-1">{errors.whatNotDelivered.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Financial Impact (Cost to Fix) <span className="text-error">*</span>
        </label>
        <input
          type="number"
          {...register('financialImpact', {
            required: 'Amount is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Amount must be positive' }
          })}
          className="input-field"
          placeholder="0.00"
          step="0.01"
        />
        {errors.financialImpact && (
          <p className="text-error text-sm mt-1">{errors.financialImpact.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">How much will it cost you to complete or fix the work?</p>
      </div>
    </div>
  );
}