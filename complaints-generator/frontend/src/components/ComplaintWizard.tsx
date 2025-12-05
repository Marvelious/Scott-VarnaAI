// ABOUTME: Main wizard component orchestrating all 5 steps
// ABOUTME: Handles form state, validation, and progress tracking

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ComplaintFormData, ComplaintType, ComplaintTone, Language } from '../types/complaint';
import WizardStep1 from './WizardStep1';
import WizardStep2 from './WizardStep2';
import WizardStep3 from './WizardStep3';
import WizardStep4 from './WizardStep4';
import WizardStep5 from './WizardStep5';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const TOTAL_STEPS = 5;

export default function ComplaintWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ComplaintFormData>({
    defaultValues: {
      complaintType: '' as ComplaintType,
      tone: '' as ComplaintTone,
      language: '' as Language,
      contactAttempts: 0,
      hasContract: false,
      hasReceipts: false,
      hasPhotos: false,
      hasMessages: false,
      hasWitnesses: false,
    }
  });

  const complaintType = watch('complaintType');
  const tone = watch('tone');
  const language = watch('language');

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: ComplaintFormData) => {
    console.log('Form submitted:', data);
    // TODO: Send to backend API for letter generation
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return complaintType !== '';
      case 5:
        return tone !== '' && language !== '';
      default:
        return true;
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gradient-cyberpunk py-12 px-4 liquid-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Complaints Letter Generator
          </h1>
          <p className="text-gray-400">
            Generate a professional, legally-safe demand letter in minutes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={`
                    step-indicator
                    ${currentStep === step ? 'step-active' : ''}
                    ${currentStep > step ? 'step-completed' : ''}
                    ${currentStep < step ? 'step-pending' : ''}
                  `}
                >
                  {currentStep > step ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step}</span>
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-2">
                  {step === 1 && 'Type'}
                  {step === 2 && 'Details'}
                  {step === 3 && 'Problem'}
                  {step === 4 && 'Evidence'}
                  {step === 5 && 'Tone'}
                </span>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Step Content */}
        <div className="card mb-8">
          {currentStep === 1 && (
            <WizardStep1
              selectedType={complaintType}
              onSelect={(type) => setValue('complaintType', type)}
            />
          )}
          {currentStep === 2 && (
            <WizardStep2 register={register} errors={errors} />
          )}
          {currentStep === 3 && (
            <WizardStep3 register={register} errors={errors} />
          )}
          {currentStep === 4 && (
            <WizardStep4 register={register} errors={errors} watch={watch} />
          )}
          {currentStep === 5 && (
            <WizardStep5
              selectedTone={tone}
              selectedLanguage={language}
              onToneSelect={(t) => setValue('tone', t)}
              onLanguageSelect={(l) => setValue('language', l)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`
              btn-secondary flex items-center space-x-2
              ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              className={`
                btn-primary flex items-center space-x-2
                ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={!canProceed()}
              className={`
                btn-primary flex items-center space-x-2
                ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <Check className="w-5 h-5" />
              <span>Generate Letter</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}