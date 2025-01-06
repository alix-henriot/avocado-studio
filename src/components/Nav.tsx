import { Button, ButtonProps, ButtonVariantProps, Chip } from '@nextui-org/react'
import React from 'react'

type NavProps = {
    items: ButtonVariantProps[];
}

const Nav: React.FC<NavProps> = ({items}) => {
  return (
    <div
    className='container sticky top-0 flex flex-row p-4 mx-auto justify-between'
    >
        <div
        className='flex flex-row gap-1 font-medium text-lg tracking-tight'
        >
        <h1>Avocado Studio</h1>
        <Chip color='primary' size='md' radius='sm'>Pro</Chip>
        </div>
        <div className='flex flex-row gap-3'>
            <Button color='default' size='sm' radius='full' href=''>Portfolio</Button>
            <Button color='primary' size='sm' radius='full' href=''>Contact</Button>
        </div>
    </div>
  )
}

export default Nav