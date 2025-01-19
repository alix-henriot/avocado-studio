'use server'
import ActionCard from "@/components/ui/ActionCard";
import BrandShowcase from "@/components/ui/BrandShowcase";
import Portfolio from "@/components/ui/Portfolio";
import FeatureCard from "@/components/ui/FeatureCard";
import FeatureList from "@/components/ui/FeatureList";
import { FlipWords } from "@/components/ui/FlipWords";
import Footer from "@/components/ui/Footer";
import Nav from "@/components/ui/Nav";
import { Button, Divider } from "@nextui-org/react";
import { Camera, Video } from "lucide-react";
import Hero from "@/components/ui/Hero";
import Link from "next/link";


export default async function Home() {

  const carouselData = {
    categories: ['Fashion', 'Business', 'Food', 'Product'],
    items: [
      {
        src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
        alt: 'A',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1544957992-20514f595d6f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D',
        alt: 'B',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'C',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1601597565151-70c4020dc0e1?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'C',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'D',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1551113006-731674fbb3ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGZhc2hpb258ZW58MHx8MHx8fDA%3D',
        alt: 'E',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1591567462127-1f25099900ab?q=80&w=2866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'F',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1596993100471-c3905dafa78e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'G',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1618142628642-62a239cb9b5e?q=80&w=2978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'H',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1530884814558-1e316305211a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'I',
        category: 'Fashion',
      },
      {
        src: 'https://images.unsplash.com/photo-1660866838287-d2239bb99976?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'J',
        category: 'Fashion',
      },
      {
        title: 'Historic Bridge',
        description: 'A historic stone bridge over a calm river.',
        src: 'https://picsum.photos/400',
        alt: 'A stone bridge crossing a river',
        category: 'Business',
      },
      {
        title: 'Historic Bridge',
        description: 'A historic stone bridge over a calm river.',
        src: 'https://picsum.photos/800',
        alt: 'A stone bridge crossing a river',
        category: 'Business',
      },
      {
        title: 'Historic Bridge',
        description: 'A historic stone bridge over a calm river.',
        src: 'https://picsum.photos/300',
        alt: 'A stone bridge crossing a river',
        category: 'Business',
      },
      {
        title: 'Historic Bridge',
        description: 'A historic stone bridge over a calm river.',
        src: 'https://picsum.photos/200',
        alt: 'A stone bridge crossing a river',
        category: 'Business',
      },
      {
        title: 'Historic Bridge',
        description: 'A historic stone bridge over a calm river.',
        src: 'https://picsum.photos/200',
        alt: 'A stone bridge crossing a river',
        category: 'Business',
      },
      {
        title: 'Historic Bridge',
        description: 'A historic stone bridge over a calm river.',
        src: 'https://picsum.photos/200',
        alt: 'A stone bridge crossing a river',
        category: 'Business',
      },
      {
        title: 'Historic Bridge',
        description: 'A historic stone bridge over a calm river.',
        src: 'https://picsum.photos/200',
        alt: 'A stone bridge crossing a river',
        category: 'Business',
      },
      {
        title: 'Historic Bridge',
        description: 'A historic stone bridge over a calm river.',
        src: 'https://picsum.photos/200',
        alt: 'A stone bridge crossing a river',
        category: 'Business',
      },
      {
        src: 'https://picsum.photos/200',
        alt: 'A freshly baked pizza with toppings',
        category: 'Food',
      },
      {
        src: 'https://picsum.photos/200',
        alt: 'A platter with assorted fresh fruits',
        category: 'Food',
      },
      {
        title: 'Cutting-Edge Laptop',
        description: 'A sleek laptop on a modern desk.',
        src: 'https://picsum.photos/200',
        alt: 'A laptop on a desk',
        category: 'Product',
      },
      {
        title: 'Smartphone Design',
        description: 'A high-end smartphone with a minimalistic design.',
        src: 'https://picsum.photos/200',
        alt: 'A smartphone on a table',
        category: 'Product',
      },
    ],
  };  

  const featureCardData = [
    {
      title: 'Audiovisual Studio',
      subtitle: 'Images that moves',
      //src: '/business-service.jpg',
      className: 'from-green-800 to-default',
      alt: 'Photographer editing photos',
      children: <div className='grid grid-flow-col gap-4 sm:gap-16 text-green-500'>
        <Camera className='w-16 sm:w-24 h-16 sm:h-24'/>
        <Divider className='bg-default' orientation='vertical' />
        <Video className='w-16 sm:w-24 h-16 sm:h-24'/>
      </div>
    },
    {
      className: 'from-black',
      title: 'Mobile throughout South France',
      subtitle: 'Available anywhere',
      src: '/feature-image-2.jpg',
      alt: 'Photographer shooting high in the mountain',
      children: <FlipWords className='font-semibold tracking-tight text-white text-5xl sm:text-8xl md:text-9xl' words={['Nice', 'Marseille', 'Toulouse', 'Montpellier','Cannes']}/>
    },
  ]

  const featureListData = {
    title: 'All-in-one service',
    subtitle: 'Tailored for foreign needs',
    items: [
      {
        title: 'Shooting authorizations',
        description: 'We take care of shooting authorizations.',
      },
      {
        title: 'Location search',
        description: 'We take care of location search.'
      },
      {
        title: 'Hotel reservations',
        description: 'We take care of hotel reservations.'
      },
      {
        title: 'Supply management',
        description: 'We take care of supply management.'
      },
      {
        title: 'Rebilling',
        description: 'We take care of rebilling.'
      },
      {
        title: 'Photo & Video Edting',
        description: 'We take care of photo and video editing.'
      }
    ]
  }

  const brandShowcaseData = {
    title: 'Backed by companies',
    subtitle: 'Inspiring trust',
    items: [
      {
        name: 'Shanghai Film Festival',
        src: '/shanghai-film-festival.jpg'
      },
      {
        name: 'PhotoVogue',
        src: '/photovogue-logo.svg'
      },
      {
        name: 'Cosmopolitan',
        src: '/cosmopolitan-logo.png'
      },
      {
        name: 'Jinghui',
        src: '/jinghui-logo.svg'
      },
      {
        name: 'Lanvin',
        src: '/lanvin-logo.svg'
      },
      {
        name: 'TCL',
        src: '/tcl-logo.svg'
      },
    ]
  }

  const actionCardData =  {
    title: 'Let\'s make it pro',
    subtitle: 'Leverage your brand image',
    src: '/action-image.jpg',
    alt: 'Photographer shooting high in the mountain',
    children: <Link href="/quote" passHref><Button variant='shadow' color='success' size='md' className='w-fit mb-8 z-10 mx-auto' radius='full'>Instant quote</Button></Link>
  }

  const footerData = {
    links: [
      {
          title: "Product",
          items: ["Overview", "Features", "Solutions", "Tutorials"],
      },
      {
          title: "Company",
          items: ["About us", "Careers", "Press", "News"],
      },
      {
          title: "Resource",
          items: ["Blog", "Newsletter", "Events", "Help center"],
      },
    ]
  };

  return (
    <div
    className=''
    >
      <main className='snap-y snap-proximity h-screen overflow-y-scroll scroll-p-4'>
        <Nav/>
        <Hero title='Photography in South France' subtitle='Exposure for your company' src='/hero-image.jpg' alt='Louis Vuitton Fashion shooting'/>
        
        <Portfolio {...carouselData}/>

        <FeatureCard {...featureCardData[0]}/>

        <FeatureList {...featureListData}/>

        <FeatureCard {...featureCardData[1]}/>

        <BrandShowcase {...brandShowcaseData}/>

        <ActionCard {...actionCardData}/>
        <Footer {...footerData}/>
      </main>
    </div>
  );
}
