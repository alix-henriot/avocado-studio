'use client'
import { Button, ButtonProps, ButtonVariantProps, Chip } from '@nextui-org/react'
import React from 'react'

type NavProps = {
    items: ButtonProps[];
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
            {items.map((item, index) => (
              <Button key={index} color={item.color} size={item.size} radius={item.radius} href={item.href}>{item.content}</Button>
            ))}
        </div>
    </div>
  )
}

export default Nav