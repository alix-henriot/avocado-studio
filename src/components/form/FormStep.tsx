import React, { useState } from "react";
import { useAsyncList } from "@react-stately/data";
import {
  Autocomplete,
  AutocompleteItem,
  Calendar,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";

//DEPRECATED

type FieldType =
  | "input"
  | "select"
  | "autocomplete"
  | "checkboxGroup"
  | "calendar"
  | "timeRange";

interface FieldConfig {
  type: FieldType;
  label: string;
  name?: string;
  placeholder?: string;
  isRequired?: boolean;
  options?: {
    key?: string;
    value?: string;
    label: string;
    isDisabled?: boolean;
  }[];
  fromName?: string;
  toName?: string;
}

export interface StepConfig {
  title: string;
  fields: FieldConfig[];
}

interface FormStepProps {
  step: number;
  data: Record<string, any>;
  stepsConfig: StepConfig[];
  onChange: (fieldName: string, value: any) => void; // Callback for updating form values
}

type FrenchCitiesProps = {
  nom: string;
  code: string;
  _score: number;
  departement: { code: number; nom: string };
};

const FormStep: React.FC<FormStepProps> = ({
  step,
  stepsConfig,
  data,
  onChange,
}) => {
  const stepConfig = stepsConfig[step - 1];

  let list = useAsyncList<FrenchCitiesProps>({
    async load({ signal, filterText }) {
      let res = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${filterText}&boost=population`,
        { signal }
      );
      let json = await res.json();

      return {
        items: json,
      };
    },
  });

  return (
    <div className="grid grid-flow-row gap-4">
      <h4>{stepConfig.title}</h4>
      {stepConfig.fields.map((field: any, index: number) => {
        switch (field.type) {
          case "input":
            return (
              <Input
                key={index}
                label={field.label}
                placeholder={field.placeholder}
                isRequired={field.isRequired && !data[field.name]}
                onChange={(e) => onChange(field.name, e.target.value)}
                errorMessage={
                  field.isRequired && !data[field.name] ? "This field is required" : null
                }
              />
            );
          case "select":
            return (
              <Select
                key={index}
                label={field.label}
                placeholder={field.placeholder}
                isRequired={field.isRequired}
                //value={data[field.name]}
                onChange={(e) => onChange(field.name, e.target.value)}
              >
                {field.options.map((option: any) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            );
          case "autocomplete":
            return (
              <Autocomplete
                key={index}
                label={field.label}
                placeholder={field.placeholder}
                //value={data[field.name]}
                onSelectionChange={(value) => onChange(field.name, value)}
                //defaultItems={field.options}
                inputValue={list.filterText}
                isLoading={list.isLoading}
                items={list.items}
                onInputChange={list.setFilterText}
                isRequired={field.isRequired && !data[field.name]}
                errorMessage={
                  field.isRequired && !data[field.name] ? "This field is required" : null
                }
              >
                {(item) => (
                  <AutocompleteItem key={item.code} className="capitalize">
                    {item.nom}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            );
          case "checkboxGroup":
            return (
              <CheckboxGroup
                key={index}
                label={field.label}
                onChange={(value) => onChange(field.name, value)}
                isRequired={field.isRequired && !data[field.name]}
                errorMessage={
                  field.isRequired && !data[field.name] ? "This field is required" : null
                }
              >
                {field.options.map((option: any) => (
                  <Checkbox
                    key={option.value}
                    value={option.value}
                    isDisabled={option.isDisabled}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            );
          case "calendar":
            return (
              <Calendar
                key={index}
                color="success"
                value={data[field.name]}
                onChange={(value) => onChange(field.name, value)}
                errorMessage={
                  field.isRequired && !data[field.name] ? "Calendar is required" : null
                }
              />
            );
          case "timeRange":
            return (
              <div key={index} className="flex gap-4">
                <TimeInput
                  label="From"
                  hourCycle={24}
                  //value={data[field.fromName]}
                  onChange={(value) =>
                    onChange(field.fromName, {
                      hour: value?.hour,
                      minute: value?.minute,
                    })
                  }
                  isRequired={field.isRequired && !data[field.name]}
                  errorMessage={
                    field.isRequired && !data[field.name] ? "From is required" : null
                  }
                />
                <TimeInput
                  label="To"
                  hourCycle={24}
                  //value={data[field.toName]}
                  onChange={(value) =>
                    onChange(field.toName, {
                      hour: value?.hour,
                      minute: value?.minute,
                    })
                  }
                  isRequired={field.isRequired && !data[field.name]}
                  errorMessage={
                    field.isRequired && !data[field.name] ? "To is required" : null
                  }
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FormStep;
