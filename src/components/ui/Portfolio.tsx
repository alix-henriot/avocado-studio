'use client'
//import Image from 'next/image'
import React, { useRef } from 'react'
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

type PortfolioProps = {
    categories: string[];
    items: PortfolioItemProps[];
}

const Portfolio: React.FC<PortfolioProps> = ({categories, items}) => {
  return (
    <section className=''>
        <div className='grid grid-flow-row gap-3 min-h-[50vh] snap-start snap-always'>
          <Tabs className='mx-auto' aria-label="portfolio" radius='full' size='md' color='default'>
            {categories.map((category, index) => (
              <Tab key={index} title={category}>
                <div
                className="grid grid-flow-col grid-rows-2 auto-cols-[minmax(40%,_1fr)] sm:auto-cols-[minmax(20%,_1fr)] px-4 lg:px-16 sm:my-5 mx-auto max-w-screen gap-3 sm:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory snap-center snap-always"
                >
                {items
                .filter(item => item.category === category)
                .map((item, index) => (
                    <PortfolioItem category={item.category} key={index} title={item.title} description={item.description} src={item.src} alt={item.alt}/>
                ))
                }
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
    </section>
  )
}

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
            isZoomed
            //isBlurred
            width='w-auto'
            height='h-auto'
            src={src}
            alt={alt}
            />
            <Modal backdrop='blur' placement='center' isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">{title ? title : alt }</ModalHeader>
                    <ModalBody>
                        <Image
                        onClick={onOpen}
                        className='aspect-square object-cover hover:cursor-pointer'
                        loading='lazy'
                        isZoomed
                        //isBlurred
                        width='min-w-[40%]'
                        height='h-auto'
                        src={src}
                        alt={alt}
                        />
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                        Action
                        </Button> */}
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}


export default Portfolio