import { Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { Controller } from 'react-hook-form';

type ServiceStepProps = {
    control: any;
    setValue?: any;
}

const ServiceStep: React.FC<ServiceStepProps>  = ({ control }) => {
    
    return (
    <div
    className='grid grid-flow-row gap-4'
    >
      <h4>What service would you like?</h4>
      <Controller
        name="material"
        control={control}
        rules={{required: true}}
        render={({ field }) => <Select
        placeholder="Photos, Videos..."
        label="Material"
        isRequired
        {...field}
        >
          <SelectItem key='photos'>Photos</SelectItem>
          <SelectItem key='videos'>Videos</SelectItem>
          <SelectItem key='photos-vdeos'>Photos & Videos</SelectItem>
        </Select>}
        />
        <Controller
        name="service"
        control={control}
        rules={{required: true}}
        render={({ field }) => <Select
        placeholder="Fashion, Business event..."
        label="Shooting type"
        isRequired
        {...field}
        >
          <SelectItem key='fashion'>Fashion</SelectItem>
          <SelectItem key='business'>Business event</SelectItem>
          <SelectItem key='product'>Product</SelectItem>
          <SelectItem key='food'>Food</SelectItem>
        </Select>}
      />
      </div>
    )
}

export default ServiceStep