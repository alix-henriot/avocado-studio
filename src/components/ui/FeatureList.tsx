'use client'
import React, { useRef } from 'react'
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { Plus, PlusIcon } from 'lucide-react';
import SectionTitle from './SectionTitle';


type FeatureListProps = {
    title: string;
    subtitle: string;
    items: ListItemProps[];
}

type ListItemProps = {
    title: string;
    description?: string;
}

const FeatureList: React.FC<FeatureListProps> = ({title, subtitle, items}) => {
  return (
    <section className='px-3 lg:px-0'>
    <div
    className='relative container flex flex-col gap-4 px-4 lg:px-20 pb-4 lg:pb-20 pt-8 lg:pt-20 mx-auto max-w-screen md:max-w-5xl md:aspect-video rounded-2xl lg:rounded-3xl overflow-clip'
    >
        <SectionTitle className='text-center text-foreground max-w-80 md:max-w-full' title={title} subtitle={subtitle}/>

        <Accordion className='grid grid-cols-1 sm:grid-cols-2 lg:gap-4 mx-auto w-full' variant="splitted">
        {items.map((item, index) => (
                <AccordionItem className='col-span-1 h-fit' key={index} aria-label={item.title} title={item.title} indicator={({ isOpen }) => (<PlusIcon className={`bg-default rounded-full p-1 ${isOpen ? 'rotate-45' : ''}`}/>)}>
                {item.description}
                </AccordionItem>
        ))}
        </Accordion>
    </div>
    </section>
  )
}

export default FeatureList