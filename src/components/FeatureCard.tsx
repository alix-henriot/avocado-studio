'use client'
import Image from 'next/image';
import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionTitle from './SectionTitle';

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

    //const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
    ref={ref}
    style={{ y, opacity }}
    className='relative container flex flex-col gap-5 p-20 mx-auto my-8 w-full h-[620px] rounded-3xl overflow-clip'
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

export default FeatureCard