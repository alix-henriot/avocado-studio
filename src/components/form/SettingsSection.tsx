import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

export function SettingsSection() {
  const { control } = useFormContext();

  return (
    <Controller
      name="setting"
      control={control}
      render={({ field }) => (
        <CheckboxGroup
          label="Setting"
          isRequired
          value={field.value}
          onValueChange={field.onChange}
          orientation="horizontal"
        >
          {settings.map((setting) => (
            <Checkbox key={setting.value} value={setting.value}>
              {setting.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      )}
    />
  );
}

const settings = [
  { value: "1", label: "Outdoor" },
  { value: "2", label: "Indoor" },
  { value: "3", label: "Studio" },
];