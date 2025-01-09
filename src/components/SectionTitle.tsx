import { cn } from '@/lib/utils';
import React from 'react'

type SectionTitleProps = {
    className?: string;
    title: string;
    subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({className, title, subtitle}) => {
  return (
    <div
    className={cn('relative z-10 mx-auto', className)}
    >
        <h2
        className='font-medium lg:mb-1 text-lg lg:text-2xl tracking-tight'
        >
            {title}
        </h2>
        <h3
        className='font-semibold text-3xl lg:text-5xl tracking-tight mb-3'
        >
            {subtitle}
        </h3>
    </div>
  )
}

export default SectionTitle