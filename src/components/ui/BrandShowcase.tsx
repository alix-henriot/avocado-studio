'use client'
import React from 'react'
import SectionTitle from './SectionTitle'
import { Image } from '@nextui-org/react';

type BrandShowcaseProps = {
    title: string;
    subtitle: string;
    items: BrandItemProps[]
}

const BrandShowcase: React.FC<BrandShowcaseProps> = ({title, subtitle, items}) => {
  return (
    <section className='snap-center snap-always'>
        <div
        className='relative container flex flex-col gap-4 px-4 lg:px-20 pb-4 lg:pb-20 pt-8 lg:pt-20 my-auto mx-auto max-w-screen md:max-w-5xl md:aspect-video rounded-2xl lg:rounded-3xl overflow-clip'
        >
            <SectionTitle className='text-center' title={title} subtitle={subtitle}/>
            <div
            className='grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mx-auto '
            >
                {items.map((item, index) => (
                    <Image
                    key={index}
                    src={item.src}
                    alt={item.name}
                    className='p-3 sm:p-6 max-w-32 sm:max-w-1/3 aspect-square bg-default-100 rounded-3xl mx-auto'
                    />
                ))}
            </div>

        </div>
    </section>
  )
}

type BrandItemProps = {
    name: string;
    src: string;
}

export default BrandShowcase