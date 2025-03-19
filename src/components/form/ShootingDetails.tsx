import { Switch, Input } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

export function ShootingDetails({ materialValue }: { materialValue: number }) {
  const { control, register } = useFormContext();

  return (
    <>
      {materialValue !== 1 && (
        <Controller
          name="editing"
          control={control}
          render={({ field }) => (
            <Switch 
              isSelected={field.value}
              onValueChange={field.onChange}
            >
              Do you need editing?
            </Switch>
          )}
        />
      )}

      <Input
        label="Quantity"
        isRequired
        type="number"
        defaultValue="1"
        description="Specify the quantity required for this shoot."
        {...register("quantity", { valueAsNumber: true })}
      />
    </>
  );
}