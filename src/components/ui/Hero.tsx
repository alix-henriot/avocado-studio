'use client'
import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { Button } from '@nextui-org/react';
import BackgroundMarquee from './BackgroundMarquee';
import Link from 'next/link';

type HeroProps = {
    title: string;
    subtitle: string;
    src: string;
    alt: string;
    children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({title, subtitle, src, alt, children}) => {

  return (
    <section className='px-3 lg:px-0'>
        <div
        className='relative container flex flex-col justify-center items-center mx-auto mb-4 sm:mb-20 max-w-screen md:max-w-5xl min-h-[60vh] overflow-hidden snap-start'
        >

            <SectionTitle className='text-center text-foreground max-w-72 md:max-w-full mb-4' title={title} subtitle={subtitle}/>
            <Link href="/quote" passHref>
              <Button variant='shadow' color='success' size='md' className='w-fit mb-8 z-10 mx-auto' radius='full'>Instant quote</Button>
            </Link>
            <BackgroundMarquee/>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background"></div>
        </div>
    </section>
  )
}

export default Hero