// components/Portfolio.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import { 
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Image,
    Skeleton,
    Tab,
    Tabs } from '@nextui-org/react';

type PortfolioItemProps = {
    className?: string;
    title?: string;
    description?: string;
    src: string;
    alt: string;
    category: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({className, title, description, src, alt, category}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <Image
            onClick={onOpen}
            className='aspect-square object-cover hover:cursor-pointer'
            loading='lazy'
            width='w-auto'
            height='h-auto'
            src={src}
            alt={alt}
            //isBlurred
            />
            <Modal backdrop='blur' placement='center' isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">{title || alt}</ModalHeader>
                    <ModalBody>
                        <Image
                        className='min-w-[40%] aspect-square object-cover'
                        src={src}
                        alt={alt}
                        />
                        {description && <p>{description}</p>}
                    </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}

const Portfolio = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<PortfolioItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        setCategories(data.categories);
        setItems(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (error) return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <section className=''>
        <div className='grid grid-flow-row gap-3 min-h-[50vh]'>
          <Tabs className='mx-auto' aria-label="portfolio" radius='full' size='md' color='default'>
            {isLoading ? (
              // Loading skeleton for tabs
              Array(5).fill(0).map((_, index) => (
                <Tab key={index} title={<Skeleton className="h-4 w-20 rounded-full" />}>
                  <div className="grid grid-flow-col grid-rows-3 sm:grid-rows-2 auto-cols-[40%] sm:auto-cols-[20%] px-4 lg:px-16 sm:my-5 mx-auto max-w-screen gap-3 sm:gap-4 overflow-x-auto scrollbar-hide">
                    {Array(4).fill(0).map((_, idx) => (
                      <Skeleton key={idx} className="aspect-square rounded-lg" />
                    ))}
                  </div>
                </Tab>
              ))
            ) : (
              categories.map((category, index) => (
                <Tab key={index} title={category}>
                  <div className="grid grid-flow-col grid-rows-3 sm:grid-rows-2 auto-cols-[40%] sm:auto-cols-[20%] px-4 lg:px-16 sm:my-5 mx-auto max-w-screen gap-3 sm:gap-4 overflow-x-auto scrollbar-hide">
                    {items
                      .filter(item => item.category === category)
                      .map((item, idx) => (
                        <PortfolioItem
                          key={`${category}-${idx}`}
                          category={item.category}
                          title={item.title}
                          description={item.description}
                          src={item.src}
                          alt={item.alt}
                        />
                      ))
                    }
                  </div>
                </Tab>
              ))
            )}
          </Tabs>
        </div>
    </section>
  )
}

export default Portfolio;