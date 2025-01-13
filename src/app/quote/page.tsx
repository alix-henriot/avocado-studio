"use client";

import React, { useState } from "react";
import { Form } from "@nextui-org/react";

import FormProgress from "@/components/form/FormProgress";
import FormNav from "@/components/form/FormNav";
import FormStartChat from "@/components/form/FormStartChat";
import FormStep, { StepConfig } from "@/components/form/FormStep";

export default function Quote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const stepsConfig: StepConfig[] = [
    {
      title: "What service do you need?",
      fields: [
        {
          type: "select",
          label: "Material",
          name: "material",
          options: [
            { key: "photos", label: "Photos" },
            { key: "videos", label: "Videos" },
            { key: "photos-videos", label: "Photos and videos" },
          ],
          isRequired: true,
          placeholder: "Photos, videos, or both",
        },
        {
          type: "select",
          label: "Shooting type",
          name: "shootingType",
          options: [
            { key: "fashion", label: "Fashion" },
            { key: "business", label: "Business event" },
            { key: "product", label: "Product" },
            { key: "food", label: "Food" },
            { key: "concert", label: "Concert" },
            { key: "tourism", label: "Tourism" },
          ],
          isRequired: true,
          placeholder: "Select shooting type",
        },
      ],
    },
    {
      title: "What is your contact?",
      fields: [
        { type: "input", label: "Name", name: "name", isRequired: true },
        {
          type: "input",
          label: "Email",
          name: "email",
          isRequired: true,
          placeholder: "Enter your email",
        },
        { type: "input", label: "Company", name: "company" },
      ],
    },
    {
      title: "Where do you want to shoot?",
      fields: [
        {
          type: "autocomplete",
          label: "Cities",
          name: "city",
          isRequired: true,
          placeholder: "Type a city name",
        },
        {
          type: "checkboxGroup",
          label: "Select setting",
          name: "setting",
          options: [
            { value: "outdoor", label: "Outdoor" },
            { value: "indoor", label: "Indoor" },
          ],
          isRequired: true,
        },
      ],
    },
    {
      title: "When do you want to shoot?",
      fields: [
        {
          type: "calendar",
          label: "Select a date",
          name: "date",
          isRequired: true,
        },
        {
          type: "timeRange",
          label: "Time range",
          fromName: "from",
          toName: "to",
          isRequired: true,
        },
      ],
    },
    {
      title: "What else would you like us to take care of?",
      fields: [
        {
          type: "checkboxGroup",
          label: "Additional services",
          name: "additionals",
          options: [
            { value: "editing", label: "Editing (included)", isDisabled: true },
            {
              value: "authorizations",
              label: "Shooting authorizations (included)",
              isDisabled: true,
            },
            { value: "hotel", label: "Hotel booking" },
            { value: "car", label: "Car rentals" },
            { value: "rebill", label: "Rebilling" },
            { value: "location", label: "Location search" },
          ],
        },
      ],
    },
  ];

  const maxValue = stepsConfig.length;

  const handleNext = () => {
    if (currentStep < maxValue) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
  };

  return (
    <main className="h-screen">
      <div className="container mx-auto sm:max-w-xl">
        {/* Form Progress */}
        <FormProgress maxValue={maxValue} currentStep={currentStep} />

        {/* Form content */}
        <div className="container px-4 sm-px0 my-8 min-h-[50vh]">
          <Form
            className="grid grid-flow-row gap-4 mx-auto w-full max-w-xs"
            onSubmit={handleSubmit}
            validationBehavior="native"
          >
            {/* Form steps */}
            <FormStep
              stepsConfig={stepsConfig}
              step={currentStep}
              data={formData}
              onChange={handleChange}
            />

            {/* Form navigation */}
            <FormNav
              currentStep={currentStep}
              maxValue={maxValue}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          </Form>
        </div>
        {/* Form start chat */}
        <FormStartChat step={currentStep} />
      </div>
    </main>
  );
}
