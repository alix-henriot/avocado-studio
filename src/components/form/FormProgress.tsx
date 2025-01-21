import { Progress } from '@nextui-org/react';
import React from 'react'
import { cn } from '@/lib/utils'

type FormProgressProps = {
    className?: string;
    minValue?: number;
    maxValue: number;
    currentStep: number;
}

const FormProgress: React.FC<FormProgressProps> = ({minValue = 0, maxValue, currentStep, className}) => {
  return (
    <nav className={cn('p-4 max-w-sm mx-auto', className)}>
          <Progress
            minValue={minValue}
            maxValue={maxValue - 1}
            value={currentStep}
            color='success'
          />
    </nav>
  )
}

export default FormProgress