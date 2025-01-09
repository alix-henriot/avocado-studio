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
    const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section className='px-3 lg:px-0'>
      <motion.div
      ref={ref}
      style={{ y, opacity }}
      className='relative container grid grid-cols-1 p-6 lg:p-20 mx-auto max-w-screen md:max-w-5xl aspect-[3/4] md:aspect-video rounded-2xl lg:rounded-3xl overflow-clip'
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

export default FeatureCard