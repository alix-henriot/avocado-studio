'use client'
import Image from 'next/image';
import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionTitle from './SectionTitle';

type HeroCardProps = {
    title: string;
    subtitle: string;
    src: string;
    alt: string;
    children?: React.ReactNode;
}

const HeroCard: React.FC<HeroCardProps> = ({title, subtitle, src, alt, children}) => {
    /* const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]); */

  return (
    <section className='px-3 lg:px-0'>
        <motion.div
        className='relative container flex flex-col gap-5 p-6 lg:p-20 mx-auto mb-8 max-w-screen md:max-w-5xl aspect-[3/4] md:aspect-video rounded-2xl lg:rounded-3xl overflow-clip'
        >
            <div
            className='w-full h-full'
            />

            <SectionTitle className='text-center' title={title} subtitle={subtitle}/>
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
    </section>
  )
}

export default HeroCard