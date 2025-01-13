import { Button } from '@nextui-org/react'
import React from 'react'

type FormNavProps = {
    currentStep: number; 
    maxValue: number;
    handleBack: () => void;
    handleNext: () => void;
}

const FormNav: React.FC<FormNavProps>  = ({currentStep, maxValue, handleBack, handleNext}) => {
  return (
    <div className="flex mt-4 w-full justify-between md:max-w-5xl">
        <Button
        color="default"
        isDisabled={currentStep < 1}
        onPress={handleBack}
        >
        Back
        </Button>
        {currentStep < maxValue ? (
        <Button color="success" onPress={handleNext} type="submit">
            Next
        </Button>
        ) : (
        <Button color="success" type="submit">
            Get a quote
        </Button>
        )}
    </div>
  )
}

export default FormNav