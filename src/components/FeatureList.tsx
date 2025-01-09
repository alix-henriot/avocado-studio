'use client'

import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import SectionTitle from './SectionTitle';


type FeatureListProps = {
    title: string;
    subtitle: string;
    items: ListItemProps[];
}

const FeatureList: React.FC<FeatureListProps> = ({title, subtitle, items}) => {
    
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
    className='relative container flex flex-col gap-4 p-4 lg:p-20 mx-auto my-8 max-w-screen md:max-w-5xl md:aspect-video bg-default rounded-3xl overflow-clip'
    >
        <SectionTitle className='text-center max-w-80' title={title} subtitle={subtitle}/>
        <div
        className='grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mx-auto w-full'
        >
            {items.map((item, index) => (
                <ListItem key={index} title={item.title}/>
            ))}
        </div>
    </motion.div>
    </section>
  )
}

export default FeatureList

type ListItemProps = {
    title: string;
    description?: string;
}

const ListItem: React.FC<ListItemProps> = ({title, description}) => {
    return (
        <div className='flex flex-row p-4 lg:p-6 items-baseline justify-between font-medium text-lg w-full bg-white rounded-xl lg:rounded-2xl'>
            <span>{title}</span>
            <Button color='default' size='sm' radius='full' isIconOnly>
                <Plus className='w-4 h-4'/>
            </Button>
        </div>
    )
}