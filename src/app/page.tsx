import Carousel from "@/components/Carousel";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@nextui-org/react";


export default function Home() {
  return (
    <div
    className="min-h-screen flex flex-col"
    >
      <header
      className="bg-gray-800 text-white p-4"
      >
        <h1>Avocado Studio Pro</h1>
      </header>

      <main
      className='flex-grow'
      >
        <FeatureCard title='Chinese Photography in South France' subtitle='Creative Production in Montpellier' src='/hero-image.jpg' alt='Louis Vuitton Fashion shooting'>
          <Button color='default' size='lg' className="w-fit" radius='full'>Request a quote</Button>
        </FeatureCard>

        <Carousel/>

        <FeatureCard title='Audiovisual Studio' subtitle='Expert in Content' src='/feature-image-1.jpg' alt='Photographer editing photos'/>

        <FeatureCard title='Mobile throughout South France' subtitle='Available anywhere' src='/feature-image-2.jpg' alt='Photographer shooting high in the mountain'/>
      </main>

      <footer
      className="bg-gray-800 text-white p-4 text-center"
      >
        <p>© 2025 Avocado Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
