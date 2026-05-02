'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { FormValues, Unit } from '@/lib/types';
import { Steps } from './steps';
import { Step1 } from './step1';
import { Step2 } from './step2';
import { Step3 } from './step3';

export function App({ step3Instructions }: { step3Instructions: ReactNode }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<{ values: FormValues, unit: Unit } | null>(null);

  function handleStep1Next(values: FormValues, unit: Unit) {
    setFormData({ values, unit });
    setStep(2);
  }

  function handleReset() {
    setStep(1);
    setFormData(null);
  }

  return (
    <>
      <Steps current={step} />
      {step === 1 && (
        <Step1 onNext={handleStep1Next} />
      )}
      {step === 2 && formData && (
        <Step2
          form={formData.values}
          unit={formData.unit}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <Step3 onBack={() => setStep(2)} onReset={handleReset}>
          {step3Instructions}
        </Step3>
      )}
    </>
  );
}
