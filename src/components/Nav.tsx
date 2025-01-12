'use client'
import { Button, ButtonProps, Chip } from '@nextui-org/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Ellipsis } from 'lucide-react';
import React from 'react'

type NavProps = {
  children?: React.ReactNode
}

const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <header className="px-3 lg:px-0 snap-start">
      <div className="container top-0 flex flex-row mb-3 pt-3 mx-auto max-w-screen md:max-w-5xl items-end justify-between">
        <div className="flex items-baseline font-medium text-xl tracking-tight">
          <h5>Avocado Studio</h5>
        </div>
        <div className="flex flex-row gap-3">
          {/* Hide Contact button on small screens */}
          <Button
            color="default"
            variant='flat'
            radius="full"
            size="md"
            className="hidden sm:block"
          >
            About
          </Button>
          <Button
            color="default"
            variant='flat'
            radius="full"
            size="md"
            className="hidden sm:block"
          >
            Contact
          </Button>
          <Button
            radius="full"
            color='success'
            variant='bordered'
            size="md"
            className="hidden sm:block"
          >
            Portfolio
          </Button>
          {/* Show Dropdown on small screens */}
          <div className="block sm:hidden" >
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  color="default"
                  radius="full"
                  variant="solid"
                  size="sm"
                >
                  <Ellipsis />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="portfolio">Portfolio</DropdownItem>
                <DropdownItem key="contact">Contact</DropdownItem>
                <DropdownItem key="about">About</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav