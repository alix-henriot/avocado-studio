import React from 'react'

type FeatureCardProps = {
    title: String;
    subtitle: String;
    children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({title, subtitle, children}) => {
  return (
    <div
    className='container flex flex-col gap-5 p-20 mx-auto w-full h-[620px] bg-gray-500 rounded-3xl'
    >
        <div
        className='w-full h-full'
        />

        <div
        className='flex flex-col gap-3 text-center'
        >
            <h2
            className='font-normal text-3xl tracking-tight'
            >
                {title}
            </h2>
            <h3
            className='font-bold text-6xl tracking-tight'
            >
                {subtitle}
            </h3>
        </div>
        {children}
    </div>
  )
}

export default FeatureCard