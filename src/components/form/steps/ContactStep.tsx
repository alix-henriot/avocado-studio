import { Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { Controller } from 'react-hook-form';

type ContactStepProps = {
    setValue?: any;
    control: any;
}

const ContactStep: React.FC<ContactStepProps>  = ({ control }) => {
    
    return (
        <div
        className='grid grid-flow-row gap-4'
        >
        <h4>What is your contact?</h4>
        <Controller
        name="name"
        rules={{required: true}}
        control={control}
        render={({ field }) => <Input isRequired label='Full Name' placeholder='John Doe' {...field} />}
        />
        <Controller
        name="email"
        rules={{required: true}}
        control={control}
        render={({ field }) => <Input type='email' label='Email' placeholder='john@company.com' isRequired {...field} />}
        />
        <Controller
        name="company"
        rules={{required: true}}
        control={control}
        render={({ field }) => <Input label='Company' placeholder='Tesla' isRequired {...field} />}
        />
      </div>
    )
}

export default ContactStep