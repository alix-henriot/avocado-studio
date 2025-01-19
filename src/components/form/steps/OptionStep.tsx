import {
    Checkbox,
    CheckboxGroup,
  } from "@nextui-org/react";
  import React from "react";
  import { Controller, useController } from "react-hook-form";
  
  type OptionStepProps = {
    setValue: any;
    control: any;
  };
  
  const OptionStep: React.FC<OptionStepProps> = ({ setValue, control }) => {
  
  
    return (
      <div
      className='grid grid-flow-row gap-4'
      >
        <h4>Where would you like to shoot?</h4>
        <Controller
          name="options"
          control={control}
          rules={{ required: true }}
          render={() => (
            <CheckboxGroup
            label='Options'
            isRequired
            onChange={(setting) => setValue('options', setting)}
            >
              <Checkbox value='location-search'>Location Search</Checkbox>
              <Checkbox value='hotel-booking'>Hotel reservations</Checkbox>
              <Checkbox value='editing'>Editing</Checkbox>
            </CheckboxGroup>
          )}
        />
      </div>
    );
  };
  
  export default OptionStep;
  