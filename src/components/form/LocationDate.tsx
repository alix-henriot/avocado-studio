import { Input } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { CityAutocomplete } from "./CityAutoComplete";


export function LocationDate() {
  return (
    <>
      <CityAutocomplete />
      <Controller
        name="date"
        control={useFormContext().control}
        render={({ field }) => (
          <Input 
            type="date" 
            label="Date" 
            isRequired 
            {...field} 
          />
        )}
      />
    </>
  );
}