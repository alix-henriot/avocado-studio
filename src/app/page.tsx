import Carousel from "@/components/Carousel";
import FeatureCard from "@/components/FeatureCard";
import FeatureList from "@/components/FeatureList";
import HeroCard from "@/components/HeroCard";
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

        <FeatureCard {...featureCardData[1]}/>

        <FeatureList {...featureListData}/>
      </main>

      <footer
      className="bg-gray-800 text-white p-4 text-center"
      >
        <p>© 2025 Avocado Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
