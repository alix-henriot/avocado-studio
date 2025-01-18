import { Progress } from '@nextui-org/react';
import React from 'react'

type FormProgressProps = {
    minValue?: number;
    maxValue: number;
    currentStep: number;
}

const FormProgress: React.FC<FormProgressProps> = ({minValue = 0, maxValue, currentStep}) => {
  return (
    <nav className='p-4 max-w-sm mx-auto'>
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