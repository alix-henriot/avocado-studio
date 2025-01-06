'use client'
import Image from 'next/image';
import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

type FeatureCardProps = {
    title: string;
    subtitle: string;
    src: string;
    alt: string;
    children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({title, subtitle, src, alt, children}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
    ref={ref}
    style={{ scale, opacity }}
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
        className='absolute -z-0 object-fill'
        src={src}
        alt={alt}
        //placeholder="blur"
        fill
        objectFit='cover'
        loading='lazy'
        />
    </motion.div>
  )
}

export default FeatureCard