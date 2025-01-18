"use client";
import React, { Suspense, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Calendar,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import { useForm, FormProvider } from "react-hook-form";
import { useAsyncList } from "@react-stately/data";
import FormProgress from "@/components/form/FormProgress";
import { LoaderCircle } from "lucide-react";
import { debounce } from "lodash";
import FormStartChat from "@/components/form/FormStartChat";

type FormData = {
  material: string;
  service: string;
  name: string;
  company: string;
  email: string;
  city: string;
  setting: string[];
  date: { day: number; month: number; year: number };
  from: { hour: number; minute: number };
  to: { hour: number; minute: number };
};

const steps = [
  {
    id: 0,
    name: "service",
    component: React.lazy(() => import("@/components/form/steps/ServiceStep")),
  },
  {
    id: 1,
    name: "contact",
    component: React.lazy(() => import("@/components/form/steps/ContactStep")),
  },
  {
    id: 2,
    name: "city",
    component: React.lazy(() => import("@/components/form/steps/PlaceStep")),
  },
  {
    id: 3,
    name: "date",
    component: React.lazy(() => import("@/components/form/steps/DateStep")),
  },
];

function Quote() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const { control, handleSubmit, setValue, trigger, watch } = useForm<FormData>({
    mode: 'onChange',
    shouldUseNativeValidation: true,
    shouldUnregister: false,
    defaultValues: {
      material: '',
      service: '',
      name: '',
      company: '',
      email: ''
    }
  })

  const handleNext = async () => {
    const isStepValid = await trigger();
    console.log('isStepValid',isStepValid)
    if (isStepValid) setCurrentStep((prevStep: number) => prevStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    alert(JSON.stringify(data));
  };

  const renderStep = React.useCallback(
    (stepIndex: number) => {
      const StepComponent = steps[stepIndex].component;
      return (
        <div key={steps[stepIndex].id}>
          <StepComponent
            control={control}
            setValue={setValue}
          />
        </div>
      );
    },
    [steps]
  );

  return (
    <main className="min-h-screen">
      <div className="container p-8 mx-auto md:max-w-xl">
        <FormProgress currentStep={currentStep} maxValue={steps.length} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Suspense
              fallback={
                <div>
                  <LoaderCircle className="animate-spin mx-auto" />
                </div>
              }
            >
              {renderStep(currentStep)}
            </Suspense>
            <div className="flex mt-4 w-full justify-between">
              {currentStep > 0 && (
                <Button onPress={handlePrevious}>Previous</Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type='button' onPress={handleNext}>Next</Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type='submit'>Get Quote</Button>
              )}
            </div>
          </form>
          <FormStartChat step={currentStep}/>
      </div>
    </main>
  );
}

export default Quote;
