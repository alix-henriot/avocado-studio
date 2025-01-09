'use client'
import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from './SectionTitle';
import { Button } from '@nextui-org/react';

type ActionCardProps = {
    title: string;
    subtitle: string;
    src: string;
    alt: string;
    children?: React.ReactNode;
}

const ActionCard: React.FC<ActionCardProps> = ({title, subtitle, src, alt, children}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section className='px-3 lg:px-0'>
    <motion.div
    ref={ref}
    style={{ y, opacity }}
    className='relative container grid gap-3 p-6 lg:p-20 mx-auto my-16 max-w-screen md:max-w-5xl  md:aspect-[4/1] rounded-2xl lg:rounded-3xl overflow-clip'
    >

        <SectionTitle className='text-center text-white' title={title} subtitle={subtitle}/>
        <div className='z-10 mx-auto'>
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
    </section>
  )
}

export default ActionCard