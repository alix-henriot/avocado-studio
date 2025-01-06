'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion';

type CarouselProps = {
    items: CarouselItemProps[]
}

const Carousel: React.FC<CarouselProps> = ({items}) => {
  return (
    <div
    className='flex flex-row items-end gap-5 p-5 my-8 h-[620px] overflow-x-scroll'
    >
        {items.map((item, index) => (
            <CarouselItem key={index} title={item.title} description={item.description} src={item.src} alt={item.alt}/>
        ))}
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
        <motion.div
        whileHover={{ width: 480, height: 480 }}
        transition={{ ease: 'easeInOut', duration: 0.2 }}
        className='relative flex flex-col p-6 w-[400px] h-[400px] bg-gray-200 rounded-3xl flex-shrink-0 overflow-clip scrollbar-hide'
        >
            <div
            className='flex flex-col gap-2 z-10'
            >
                <span className='font-medium text-4xl text-white'>{title}</span>
                <p className='text-lg text-white'>{description}</p>
            </div>
            <Image
                className='absolute -z-0 object-fill'
                src={src}
                alt={alt}
                fill
                objectFit='cover'
                loading='lazy'
            />
        </motion.div>
    )
}


export default Carousel