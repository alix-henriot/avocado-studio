'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

type CarouselProps = {
    title: string;
    subtitle: string;
    items: CarouselItemProps[];
}

const Carousel: React.FC<CarouselProps> = ({title, subtitle, items}) => {
  return (
    <div
    className='flex flex-col my-16 text-center'
    >
        <SectionTitle title={title} subtitle={subtitle}/>
        <div
        className='flex flex-row items-end px-5 gap-5 h-[520px] overflow-x-scroll'
        >
            {items.map((item, index) => (
                <CarouselItem key={index} title={item.title} description={item.description} src={item.src} alt={item.alt}/>
            ))}
        </div>
    </div>
  )
}

type CarouselItemProps = {
    title: string;
    description: string;
    src: string;
    alt: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({title, description, src, alt}) => {

    return (
        <div
        className='group relative flex flex-col p-6 w-[400px] h-[400px] bg-gray-200 rounded-3xl flex-shrink-0 overflow-clip scrollbar-hide transition-all hover:w-[480px] hover:h-[480px] hover:p-8'
        >
            <div
            className='flex flex-col items-start gap-2 z-10'
            >
                <span className='font-semibold text-4xl tracking-tight text-white group-hover:text-5xl'>{title}</span>
                <p
                className='font-medium text-lg text-white hidden group-hover:block'
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