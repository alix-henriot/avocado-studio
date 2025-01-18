import { Calendar, DateInput, Select, SelectItem, TimeInput } from "@nextui-org/react";
import React from "react";
import { Controller } from "react-hook-form";

type DateStepProps = {
  control: any;
  setValue: any;
};

const DateStep: React.FC<DateStepProps> = ({ control, setValue }) => {
  return (
    <div
    className='grid grid-flow-row gap-4'
    >
      <h4>When would you like to shoot?</h4>
      <Controller
        name="date"
        rules={{required: true}}
        control={control}
        render={() => <DateInput label='Date' isRequired onChange={({day, month, year}: any) => setValue('date', {day, month, year})} />}
      />
      <Controller
        name="from"
        rules={{required: true}}
        control={control}
        render={() => <TimeInput label='From' hourCycle={24}  isRequired onChange={({ hour, minute }: any) => setValue('from', {hour, minute})} />}
      />
      <Controller
        name="to"
        rules={{required: true}}
        control={control}
        render={() => <TimeInput label='To' hourCycle={24}  isRequired onChange={({ hour, minute }: any) => setValue('to', {hour, minute})} />}
      />
      {/* onChange={(e) => {
          const { hour, minute }: any = e;
          const selectedFromTime = { hour, minute };
          setValue("from", selectedFromTime);
        }} */}
    </div>
  );
};

export default DateStep;
