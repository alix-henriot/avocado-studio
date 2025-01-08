import React from 'react'

type SectionTitleProps = {
    title: string;
    subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({title, subtitle}) => {
  return (
    <div
    className='relative flex flex-col text-center z-10'
    >
        <h2
        className='mb-2 font-medium text-2xl tracking-tight'
        >
            {title}
        </h2>
        <h3
        className='font-semibold text-5xl tracking-tight mb-3'
        >
            {subtitle}
        </h3>
    </div>
  )
}

export default SectionTitle