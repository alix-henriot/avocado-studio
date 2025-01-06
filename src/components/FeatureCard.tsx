import Image from 'next/image';
import React from 'react'

type FeatureCardProps = {
    title: string;
    subtitle: string;
    src: string;
    alt: string;
    children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({title, subtitle, src, alt, children}) => {
  return (
    <div
    className='relative container flex flex-col gap-5 p-20 mx-auto my-8 w-full h-[620px] rounded-3xl overflow-clip'
    >
        <div
        className='w-full h-full'
        />

        <div
        className='relative flex flex-col gap-2 items-center z-10'
        >
            <h2
            className='font-normal text-3xl tracking-tight'
            >
                {title}
            </h2>
            <h3
            className='font-bold text-6xl tracking-tight mb-3'
            >
                {subtitle}
            </h3>
            {children}
        </div>
        <Image
        className='absolute -z-0'
        src={src}
        alt={alt}
        layout='fill'
        objectFit='cover'
        loading='lazy'
        />
    </div>
  )
}

export default FeatureCard