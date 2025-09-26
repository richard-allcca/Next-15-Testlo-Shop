'use client';

import { useState } from "react";
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slidesShow.css';
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}


export const ProductSlidesShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();



  return (
    <div className={className} >

      <Swiper
        style={
          {
            // Styles for Arrows comented because they are not visible with the current images
            // '--swiper-navigation-color': '#fff',
            // '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        loop={true}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map((img) => {
            return (
              <SwiperSlide key={img} >
                <Image
                  src={`/products/${img}`}
                  alt={title}
                  width={1024}
                  height={800}
                  className="rounded-lg object-fill"
                />
              </SwiperSlide>
            );
          })
        }
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map((img) => {
            return (
              <SwiperSlide key={img} >
                <Image
                  src={`/products/${img}`}
                  alt={title}
                  width={1024}
                  height={800}
                  className="rounded-lg object-fill"
                />
              </SwiperSlide>
            );
          })
        }
      </Swiper>

    </div>
  );
};