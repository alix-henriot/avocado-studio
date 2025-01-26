'use server'
import { promises as fs } from "fs";
import path from "path";
import ActionCard from "@/components/ui/ActionCard";
import BrandShowcase from "@/components/ui/BrandShowcase";
import Portfolio from "@/components/ui/Portfolio";
import FeatureCard from "@/components/ui/FeatureCard";
import FeatureList from "@/components/ui/FeatureList";
import { FlipWords } from "@/components/ui/FlipWords";
import Footer from "@/components/ui/Footer";
import Nav from "@/components/ui/Nav";
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Camera, Ellipsis, Video } from "lucide-react";
import Hero from "@/components/ui/Hero";
import Link from "next/link";


export default async function Home() {
    const dbPath = path.join(process.cwd(), "db", "portfolio.json");
    const dbContent = await fs.readFile(dbPath, "utf-8");
    const dbPortfolio = JSON.parse(dbContent);

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
        
        <Portfolio categories={['fashion', 'business', 'food', 'product']} items={dbPortfolio}/>

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
