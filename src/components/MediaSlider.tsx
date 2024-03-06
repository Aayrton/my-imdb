'use client';

import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface MediaSliderItem {
  img: string;
  label: string;
  link: string;
}

interface MediaSliderProps {
  items: MediaSliderItem[];
}

const MediaSlider: React.FC<MediaSliderProps> = ({ items }) => {
  const slider: any = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
  };

  return (
    <div>
      <button className="mb-5" onClick={() => slider.current.slickPrev()}>
        <ArrowBackIosIcon />
      </button>
      <button onClick={() => slider.current.slickNext()}>
        <ArrowForwardIosIcon />
      </button>
      <Slider ref={slider} {...settings}>
        {items.map(({ img, link, label }, index) => (
          <Link key={index} href={link} className="relative w-auto">
            <Image src={img} alt={label} width={185} height={278} />
            <div className="absolute w-full inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity">
              <p className="text-white text-center absolute inset-0 flex items-center justify-center">
                {label}
              </p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default MediaSlider;
