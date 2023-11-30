"use client";

import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper as SwiperClass } from "swiper";
type Swiper = InstanceType<typeof SwiperClass>;

interface ImageSliderProps {
  ImageArr: Image[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ ImageArr }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0); // Add state for the active index
  const imgurl = "http://127.0.0.1:8000/images/";

  const handleSlideChange = (swiper: Swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleSwiper = (swiper: Swiper) => {
    setThumbsSwiper(swiper);
  };

  return (
    <div className="hidden md:block ">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper:
            thumbsSwiper && !(thumbsSwiper as any).destroyed
              ? thumbsSwiper
              : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        onSlideChange={handleSlideChange}
        className="h-[350px] w-[700px] lg:w-[600px]  xl:w-[800px] bg-black rounded-tl-md rounded-tr-md"
      >
        {ImageArr.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex h-full w-[45%] mx-auto items-center justify-center">
              <Image
                fill
                src={imgurl + image.image_url}
                alt={image.image_url}
                className="block h-full w-full  object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail */}
      <Swiper
        onSwiper={handleSwiper}
        spaceBetween={30}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="relative thumbs h-[160px] w-[700px] lg:w-[600px] xl:w-[800px] bg-zinc-300 rounded-bl-md rounded-br-md"
      >
        {ImageArr.map((image, index) => (
          <SwiperSlide key={index}>
            <button
              className={`relative flex h-[70%] aspect-square rounded mx-auto my-5 items-center justify-center ${
                index === activeIndex ? "border-[2px] border-black/70" : ""
              }`}
            >
              <Image
                fill
                src={imgurl + image.image_url}
                alt={image.image_url}
                className="block object-cover object-center rounded"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
