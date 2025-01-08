'use client'
import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

type ActionCardProps = {
    title: string;
    subtitle?: string;
    src: string;
    alt: string;
}

const ActionCard: React.FC<ActionCardProps> = ({title, subtitle, src, alt}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
    ref={ref}
    style={{ y, opacity }}
    className='relative container flex flex-col gap-5 p-20 mx-auto my-8 w-full h-[310px] rounded-3xl overflow-clip'
    >
        <div
        className='w-full h-full'
        />

        <SectionTitle title={title} subtitle={subtitle}/>
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

export default ActionCard