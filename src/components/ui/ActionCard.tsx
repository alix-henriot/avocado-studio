'use client'
import React, { useRef } from 'react'
import SectionTitle from '@/components/ui/SectionTitle';

type ActionCardProps = {
    title: string;
    subtitle: string;
    src: string;
    alt: string;
    children?: React.ReactNode;
}

const ActionCard: React.FC<ActionCardProps> = ({title, subtitle, src, alt, children}) => {
  return (
    <section className='px-3 lg:px-0'>
    <div
    className='relative container grid sm:grid-cols-4 gap-3 p-6 lg:p-10 mx-auto my-16 items-center max-w-screen md:max-w-5xl sm:aspect-[4/1] rounded-2xl lg:rounded-3xl overflow-clip'
    >
        <SectionTitle className='text-center sm:text-left sm:col-span-3 text-white' title={title} subtitle={subtitle}/>
        <div className='z-10 mx-auto'>
            {children}
        </div>
        <div
            className='absolute z-[1] bg-gradient-to-t from-green-600 to-yellow-400 w-full h-full'
            />
        {/* <Image
        className='absolute -z-0 object-fill'
        src={src}
        alt={alt}
        //placeholder="blur"
        fill
        objectFit='cover'
        loading='lazy'
        /> */}
    </div>
    </section>
  )
}

export default ActionCard