'use client'
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion"; 
import { cn } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";
import SectionTitle from "./SectionTitle";


type MarqueeSectionProps = {
    title: string;
    subtitle: string;
    items: MarqueeItemProps[];
}

const MarqueeSection: React.FC<MarqueeSectionProps> = ({title, subtitle, items, ...props}) => {
    const firstRow = items.slice(0, items.length / 2);
    const secondRow = items.slice(items.length / 2);
    
    return (
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background">
        <SectionTitle title={title} subtitle={subtitle}/>
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((item, index) => (
            <MarqueeItem key={index} {...item} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((item, index) => (
            <MarqueeItem key={index} {...item} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    );
}

export default MarqueeSection


type MarqueeProps = {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
}

const Marquee: React.FC<MarqueeProps> = ({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ...props
  }) => {

  return (
    <div
    {...props}
    className={cn(
      "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
      {
        "flex-row": !vertical,
        "flex-col": vertical,
      },
      className,
    )}
  >
    {Array(repeat)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
  </div>
  )
}

type MarqueeItemProps = {
    title: string;
    date?: string;
    place?: string,
    customer?: string;
    src?: string;
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({title, customer}) => {

    return (
        <Tooltip
        content={
          <div className="px-1 py-2">
            <div className="text-small font-bold">{title}</div>
            <div className="text-tiny">{customer}</div>
          </div>
        }
        >
        <div
        className='w-20 h-20 bg-default rounded-2xl'
        />
        </Tooltip>
    )
}