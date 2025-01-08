import ActionCard from "@/components/ActionCard";
import Carousel from "@/components/Carousel";
import FeatureCard from "@/components/FeatureCard";
import FeatureList from "@/components/FeatureList";
import Footer from "@/components/Footer";
import HeroCard from "@/components/HeroCard";
import MarqueeSection from "@/components/Marquee";
import Nav from "@/components/Nav";
import { Button } from "@nextui-org/react";


export default function Home() {
  const navitems = [
    {
      content: 'Portfolio',
      color: 'default',
      size: 'sm',
      radius: 'full',
      href: '/portfolio'
    },
    {
      content: 'Contact',
      color: 'primary',
      size: 'sm',
      radius: 'full',
      href: '/contact'
    }
  ]

  const carouselData = {
    title: 'Unique exposure for your company',
    subtitle: 'Empower your brand image in South France.',
    items: [
      {
        title: 'Business Event',
        description: 'We provide business event shooting.',
        src: '/business-service.jpg',
        alt: 'business photo',
      },
      {
        title: 'Fashion',
        description: 'We provide fashion shooting.',
        src: '/fashion-service.jpg',
        alt: 'fashion photo',
      },
      {
        title: 'Concert',
        description: 'We provide concert shooting.',
        src: '/concert-service.jpg',
        alt: 'concert photo',
      },
      {
        title: 'Food Shooting',
        description: 'We provide food shooting.',
        src: '/food-service.jpg',
        alt: 'food photo',
      },
      {
        title: 'Product Shooting',
        description: 'We provide product shooting.',
        src: '/product-service.jpg',
        alt: 'product photo',
      },
    ]
  }

  const featureCardData = [
    {
      title: 'Audiovisual Studio',
      subtitle: 'Expert in Content',
      src: '/feature-image-1.jpg',
      alt: 'Photographer editing photos'
    },
    {
      title: 'Mobile throughout South France',
      subtitle: 'Available anywhere',
      src: '/feature-image-2.jpg',
      alt: 'Photographer shooting high in the mountain'
    },
  ]

  const featureListData = {
    title: 'All-in-one service',
    subtitle: 'Designed for foreign companies',
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

  const marqueeSectionData = {
    title: 'Backed by companies',
    subtitle: 'Our latest work',
    items: [
      {
        title: 'photo-1',
        customer: 'company-1'
      },
      {
        title: 'photo-2',
        customer: 'company-2'
      },
      {
        title: 'photo-3',
        customer: 'company-3'
      },
      {
        title: 'photo-4',
        customer: 'company-4'
      },
      {
        title: 'photo-5',
        customer: 'company-5'
      },
      {
        title: 'photo-6',
        customer: 'company-6'
      },
      {
        title: 'photo-7',
        customer: 'company-7'
      },
      {
        title: 'photo-8',
        customer: 'company-8'
      },
      {
        title: 'photo-9',
        customer: 'company-9'
      },
      {
        title: 'photo-10',
        customer: 'company-10'
      },
    ]
  }

  const actionCardData =  {
    title: 'Let\'s make it pro',
    src: '/feature-image-2.jpg',
    alt: 'Photographer shooting high in the mountain'
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
  }

  return (
    <div
    className='min-h-screen flex flex-col'
    >
      <header>
        <Nav items={navitems}/>
      </header>

      <main>
        <HeroCard title='Chinese Photography in South France' subtitle='Creative Production in Montpellier' src='/hero-image.jpg' alt='Louis Vuitton Fashion shooting'>
          <Button color='default' size='lg' className='w-fit' radius='full'>Request a quote</Button>
        </HeroCard>

        <Carousel {...carouselData}/>

        <FeatureCard {...featureCardData[0]}/>

        <FeatureList {...featureListData}/>
        
        <FeatureCard {...featureCardData[1]}/>

        <MarqueeSection {...marqueeSectionData}/>
        
        <ActionCard {...actionCardData}/>
      </main>
      <Footer {...footerData}/>
    </div>
  );
}
