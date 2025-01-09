'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { cn } from '@/lib/utils';

type CarouselProps = {
    title: string;
    subtitle: string;
    items: CarouselItemProps[];
}

const Carousel: React.FC<CarouselProps> = ({title, subtitle, items}) => {
  return (
    <div
    >
        <SectionTitle className='text-center max-w-80' title={title} subtitle={subtitle}/>
        <div
        className='grid grid-cols-2 px-3 gap-2 overflow-x-scroll'
        >
            {items.map((item, index) => {
                const isFirstOdd = index === 0 && items.length % 2 !== 0;
                return (
                    <CarouselItem className={cn(isFirstOdd ? 'col-span-2 aspect-video' : 'aspect-square')} key={index} title={item.title} description={item.description} src={item.src} alt={item.alt}/>
                )
            })}
        </div>
    </div>
  )
}

type CarouselItemProps = {
    className?: string;
    title: string;
    description: string;
    src: string;
    alt: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({className, title, description, src, alt}) => {

    return (
        <div
        className={
            cn('group relative flex flex-col p-4 w-full md:max-w-60 bg-gray-200 rounded-2xl overflow-clip scrollbar-hide transition-all',
            className)}
        >
            <div
            className='flex flex-col items-start gap-4 z-10'
            >
                <span className='font-semibold text-xl lg:text-4xl text-white group-hover:text-2xl'>{title}</span>
                <p
                className='font-medium text-base text-white hidden group-hover:block'
                >{description}</p>
            </div>
            <Image
                className='absolute -z-0 object-fill'
                src={src}
                alt={alt}
                fill
                objectFit='cover'
                loading='lazy'
            />
        </div>
    )
}


export default Carousel