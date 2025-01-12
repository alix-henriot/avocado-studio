'use client'
import Image from 'next/image';
import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { cn } from '@/lib/utils';

type FeatureCardProps = {
    className?: string;
    title: string;
    subtitle: string;
    src?: string;
    alt: string;
    children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({className, title, subtitle, src, alt, children}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    //const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [24, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section className='px-3 lg:px-0 snap-center snap-always'>
      <motion.div
      //ref={ref}
      //style={{ y, opacity }}
      className='relative container grid grid-cols-1 place-items-end p-6 lg:p-20 my-3 sm:my-5 mx-auto max-w-screen md:max-w-5xl aspect-[3/4] sm:aspect-video rounded-2xl lg:rounded-3xl overflow-clip'
      >
          <span className='mx-auto z-10'>{children}</span>
          <SectionTitle className='text-center text-white max-w-80 md:max-w-full' title={title} subtitle={subtitle}/>
        <div
          className={cn('absolute z-[1] bg-gradient-to-t opacity-50 w-full h-full', className)}
          />
        {src && (
          <Image
          className='absolute -z-0 object-fill'
          src={src}
          alt={alt}
          //placeholder="blur"
          fill
          objectFit='cover'
          loading='lazy'
          />
        )}
      </motion.div>
    </section>
  )
}

export default FeatureCard