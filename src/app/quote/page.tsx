"use client"
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
import { v4 as uuidv4 } from "uuid"; 
import { useForm, FormProvider } from "react-hook-form";
import { useAsyncList } from "@react-stately/data";
import FormProgress from "@/components/form/FormProgress";
import { LoaderCircle } from "lucide-react";
import { debounce } from "lodash";
import FormStartChat from "@/components/form/FormStartChat";
import React, { Suspense } from "react";
import { quoteGenerator } from "@/components/server/quoteGenerator";
import saveForm from "@/components/server/saveForm";

export type FormData = {
  forEach(arg0: (value: any, key: any) => void): unknown;
  id?: string;
  material: "photos" | "videos" | "photos-videos";
  service: "fashion" | "business" | "food" | "product";
  name: string;
  company: string;
  email: string;
  city: string;
  setting: ("indoor" | "outdoor" | "studio")[];
  date: { day: number; month: number; year: number };
  from: { hour: number; minute: number };
  to: { hour: number; minute: number };
  options: ("editing" | "location-search" | "hotel-booking")[];
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
  {
    id: 4,
    name: "options",
    component: React.lazy(() => import("@/components/form/steps/OptionStep")),
  },
];

function Form() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const { control, handleSubmit, setValue, trigger, watch } = useForm<FormData>({
    mode: 'onChange',
    shouldUseNativeValidation: true,
    shouldUnregister: false,
    //defaultValues: {}
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

  const onSubmit = async (formData: FormData) => {
    //submit data, get an id and push to /quote/id
    const result = await saveForm(formData);

    if (result?.redirectUrl) {
      window.location.href = result.redirectUrl; // Perform the redirect manually
    }
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

export default Form;
