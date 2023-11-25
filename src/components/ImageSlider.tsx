"use client";

import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ImageSliderProps {
  ImageArr: EImage[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ ImageArr }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const imgurl = "http://127.0.0.1:8000/images/";

  return (
    <div className="">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[300px] w-[800px] rounded-lg bg-black"
      >
        {ImageArr.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex h-[90%] w-[40%] rounded-full mx-auto my-3 items-center justify-center">
              <Image
                fill
                src={imgurl + image.image_url}
                alt={image.image_url}
                className="block h-full w-full rounded-lg object-fill"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="relative thumbs mt-3 h-[160px] w-[800px] rounded-lg bg-black"
      >
        {ImageArr.map((image, index) => (
          <SwiperSlide key={index}>
            <button className="relative flex h-[85%] w-[87%] rounded-lg mx-auto my-3 items-center justify-center">
              <Image
                fill
                src={imgurl + image.image_url}
                alt={image.image_url}
                className="block h-full w-full object-fill rounded-lg"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
