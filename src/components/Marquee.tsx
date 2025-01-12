'use client'
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";

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

export { Marquee }


type MarqueeItemProps = {
    title: string;
    date?: string;
    place?: string,
    customer?: string;
    src: string;
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({title, customer, src}) => {

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
        className='w-1/3 aspect-square bg-default rounded-2xl'
        >
          <Image
          //className='w-10 h-10'
          src={src}
          alt={title}
          width={100}
          height={100}
          //placeholder="blur"
          //fill
          objectFit='cover'
          loading='lazy'
          /> 
        </div>
        </Tooltip>
    )
}