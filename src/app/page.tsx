"use server"
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
  
  const dbPortfolio = [
    {
      "id": 1,
      "src": "https://picsum.photos/400",
      "alt": "A beautiful nature scene",
      "description": "A breathtaking view of a lush forest with sunlight streaming through the trees.",
      "title": "Serene Nature",
      "category": "fashion"
    },
    {
      "id": 2,
      "src": "https://picsum.photos/400",
      "alt": "A bustling cityscape",
      "description": "A panoramic view of a modern city with skyscrapers and busy streets.",
      "title": "Urban Jungle",
      "category": "business"
    },
    {
      "id": 3,
      "src": "https://picsum.photos/400",
      "alt": "A calm ocean view",
      "description": "A tranquil scene of a pristine beach with crystal clear waters and a blue sky.",
      "title": "Ocean Bliss",
      "category": "fashion"
    },
    {
      "id": 4,
      "src": "https://picsum.photos/400",
      "alt": "Majestic mountain peaks",
      "description": "Snow-capped mountains under a clear blue sky, surrounded by dense forests.",
      "title": "Mountain Majesty",
      "category": "product"
    },
    {
      "id": 5,
      "src": "https://picsum.photos/400",
      "alt": "Wildlife in its natural habitat",
      "description": "A deer standing gracefully in a meadow surrounded by tall grass.",
      "title": "Wildlife Wonders",
      "category": "food"
    },
    {
      "id": 6,
      "src": "https://picsum.photos/400",
      "alt": "A stylish outfit",
      "description": "A model showcasing the latest fashion trends in a sleek modern outfit.",
      "title": "Fashion Forward",
      "category": "fashion"
    },
    {
      "id": 7,
      "src": "https://picsum.photos/400",
      "alt": "A corporate meeting",
      "description": "Business professionals engaged in a discussion at a modern office table.",
      "title": "Corporate Collaboration",
      "category": "business"
    },
    {
      "id": 8,
      "src": "https://picsum.photos/400",
      "alt": "A high-tech gadget",
      "description": "A close-up shot of a cutting-edge smartphone with a sleek design.",
      "title": "Tech Marvel",
      "category": "product"
    },
    {
      "id": 9,
      "src": "https://picsum.photos/400",
      "alt": "A gourmet dish",
      "description": "A delicious plate of gourmet food with vibrant ingredients and elegant plating.",
      "title": "Culinary Art",
      "category": "food"
    },
    {
      "id": 10,
      "src": "https://picsum.photos/400",
      "alt": "Modern architecture",
      "description": "A strikingly modern building with unique and bold geometric shapes.",
      "title": "Architectural Wonder",
      "category": "business"
    },
    {
      "id": 11,
      "src": "https://picsum.photos/400",
      "alt": "Makeup products",
      "description": "An assortment of colorful makeup products arranged on a vanity.",
      "title": "Beauty Essentials",
      "category": "fashion"
    },
    {
      "id": 12,
      "src": "https://picsum.photos/400",
      "alt": "A modern workspace",
      "description": "A clean and minimalistic workspace setup with a laptop and coffee.",
      "title": "Work From Home",
      "category": "business"
    },
    {
      "id": 13,
      "src": "https://picsum.photos/400",
      "alt": "Stylish shoes",
      "description": "A pair of trendy shoes placed elegantly on a wooden surface.",
      "title": "Step in Style",
      "category": "fashion"
    },
    {
      "id": 14,
      "src": "https://picsum.photos/400",
      "alt": "A decadent dessert",
      "description": "A rich chocolate cake garnished with fresh fruits and powdered sugar.",
      "title": "Sweet Indulgence",
      "category": "food"
    },
    {
      "id": 15,
      "src": "https://picsum.photos/400",
      "alt": "Luxury watch",
      "description": "A premium wristwatch with a leather strap and elegant dial design.",
      "title": "Timeless Elegance",
      "category": "product"
    },
    {
      "id": 16,
      "src": "https://picsum.photos/400",
      "alt": "A high-performance laptop",
      "description": "A sleek and modern laptop designed for business and productivity.",
      "title": "Tech Efficiency",
      "category": "business"
    },
    {
      "id": 17,
      "src": "https://picsum.photos/400",
      "alt": "A cup of coffee",
      "description": "A steaming cup of coffee served in a ceramic mug on a wooden table.",
      "title": "Morning Brew",
      "category": "food"
    },
    {
      "id": 18,
      "src": "https://picsum.photos/400",
      "alt": "Elegant jewelry",
      "description": "A set of gold necklaces and rings placed on a velvet background.",
      "title": "Golden Charm",
      "category": "fashion"
    },
    {
      "id": 19,
      "src": "https://picsum.photos/400",
      "alt": "Wireless headphones",
      "description": "A pair of wireless headphones with a stylish and modern design.",
      "title": "Audio Bliss",
      "category": "product"
    },
    {
      "id": 20,
      "src": "https://picsum.photos/400",
      "alt": "A freshly baked pizza",
      "description": "A delicious pizza with melted cheese, fresh toppings, and a golden crust.",
      "title": "Italian Delight",
      "category": "food"
    },
    {
      "id": 21,
      "src": "https://picsum.photos/400",
      "alt": "A designer handbag",
      "description": "A luxurious leather handbag in an elegant setting.",
      "title": "Luxury Carry",
      "category": "fashion"
    },
    {
      "id": 22,
      "src": "https://picsum.photos/400",
      "alt": "A professional meeting",
      "description": "Colleagues collaborating around a table in a stylish conference room.",
      "title": "Teamwork in Action",
      "category": "business"
    },
    {
      "id": 23,
      "src": "https://picsum.photos/400",
      "alt": "A sleek water bottle",
      "description": "A minimalistic stainless steel water bottle on a wooden surface.",
      "title": "Hydration On-The-Go",
      "category": "product"
    },
    {
      "id": 24,
      "src": "https://picsum.photos/400",
      "alt": "A gourmet burger",
      "description": "A juicy burger with fresh lettuce, tomatoes, and a perfectly grilled patty.",
      "title": "Burger Bliss",
      "category": "food"
    },
    {
      "id": 25,
      "src": "https://picsum.photos/400",
      "alt": "Luxury perfume bottle",
      "description": "A premium perfume bottle elegantly designed and displayed on a marble table.",
      "title": "Fragrant Elegance",
      "category": "fashion"
    },
    {
      "id": 26,
      "src": "https://picsum.photos/400",
      "alt": "Luxury perfume bottle",
      "description": "A premium perfume bottle elegantly designed and displayed on a marble table.",
      "title": "Fragrant Elegance",
      "category": "fashion"
    },
    {
      "id": 27,
      "src": "https://picsum.photos/400",
      "alt": "Luxury perfume bottle",
      "description": "A premium perfume bottle elegantly designed and displayed on a marble table.",
      "title": "Fragrant Elegance",
      "category": "fashion"
    },
    {
      "id": 28,
      "src": "https://picsum.photos/400",
      "alt": "Luxury perfume bottle",
      "description": "A premium perfume bottle elegantly designed and displayed on a marble table.",
      "title": "Fragrant Elegance",
      "category": "fashion"
    },
    {
      "id": 29,
      "src": "https://picsum.photos/400",
      "alt": "Luxury perfume bottle",
      "description": "A premium perfume bottle elegantly designed and displayed on a marble table.",
      "title": "Fragrant Elegance",
      "category": "fashion"
    }
  ]

  const featureCardData = [
    {
      title: 'Audiovisual Studio',
      subtitle: 'Images that moves',
      //src: '/business-service.jpg',
      className: 'from-green-800 to-default',
      alt: 'Photographer editing photos',
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
      <main className='h-screen'>
        <Nav/>
        <Hero title='Photography in South France' subtitle='Exposure for your company' src='/hero-image.jpg' alt='Louis Vuitton Fashion shooting'/>
        
        <Portfolio />

        <FeatureCard {...featureCardData[0]} className='from-green-800 to-default'>
          <div className='grid grid-flow-col gap-4 sm:gap-16 text-green-500'>
            <Camera className='w-16 sm:w-24 h-16 sm:h-24'/>
            <Divider className='bg-default' orientation='vertical' />
            <Video className='w-16 sm:w-24 h-16 sm:h-24'/>
          </div>
        </FeatureCard>

        <FeatureList {...featureListData}/>

        <FeatureCard {...featureCardData[1]}/>

        <BrandShowcase {...brandShowcaseData}/>

        <ActionCard {...actionCardData}/>
        <Footer {...footerData}/>
      </main>
    </div>
  );
}
