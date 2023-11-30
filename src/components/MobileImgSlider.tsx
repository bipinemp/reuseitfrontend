"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./mblslider.css";

// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";

interface ImageSliderProps {
  ImageArr: Image[];
}

const MobileImgSlider: React.FC<ImageSliderProps> = ({ ImageArr }) => {
  const imgurl = "http://127.0.0.1:8000/images/";
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="w-full h-full sm:hidden mySwiper rounded-lg"
      >
        {ImageArr.map((image, index) => (
          <SwiperSlide
            key={index}
            className="relative w-[300px] h-[300px]"
            style={{
              background: "black",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="relative aspect-square h-[280px]">
              <Image
                fill
                src={imgurl + image.image_url}
                alt={image.image_url}
                className="object-contain brightness-90"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MobileImgSlider;
