'use client';

import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import Image from "next/image";
import './slidesShow.css';

interface Props {
  images: string[];
  title: string;
  className?: string;
}


export const ProductMobilSlidesShow = ({ images, title, className }: Props) => {

  return (
    <div className={className} >

      <Swiper
        style={{
          width:'100vw',
          height: 'auto'
        }}
        loop={true}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
          images.map((img) => {
            return (
              <SwiperSlide key={img} >
                <Image
                  src={`/products/${img}`}
                  alt={title}
                  width={500}
                  height={500}
                  className="object-fill"
                />
              </SwiperSlide>
            );
          })
        }
      </Swiper>

    </div>
  );
};