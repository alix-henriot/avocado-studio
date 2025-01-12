import Image from 'next/image'
import React from 'react'
import { Marquee } from './Marquee';

type BackgroundMarqueeProps = {
    src?: string;
}

const BackgroundMarquee: React.FC<BackgroundMarqueeProps> = ({}) => {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=3104&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            src: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            src: 'https://images.unsplash.com/photo-1505632436162-719c53ad6a0d?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            src: 'https://images.unsplash.com/photo-1664076423411-e570cfdfcbed?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            src: 'https://images.unsplash.com/photo-1717844519001-a7b9f0adf682?q=80&w=2624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            src: 'https://images.unsplash.com/photo-1694675855596-fc9df08c615f?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ]

  return (
    <div
    className='absolute [perspective:300px]'
    >
        <Marquee
        className='opacity-35 transform'
        vertical
        /* style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
        }} */
        >
            {images.map((image, index) => (
                <img
                //className='absolute -z-0 object-fill'
                className='col-span-1 max-w-sm aspect-square object-cover rounded-2xl'
                key={index}
                src={image.src}
                alt={'alt'}
                //placeholder="blur"
                //fill
                //objectFit='cover'
                loading='lazy'
                />
            ))}
        </Marquee>
    </div>
  )
}

export default BackgroundMarquee