"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "@/components/ProductCard";

export default function ProductCarousel({ products }) {
  const swiperRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = (s) => {
    setAtStart(s.isBeginning);
    setAtEnd(s.isEnd);
  };

  const arrowBase =
    "absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 inline-flex items-center justify-center rounded-full border border-[#d8c5a6] text-ink bg-white shadow-md hover:bg-gold hover:text-white hover:border-gold transition disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div className="productSwiper relative w-full min-w-0">
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        onSwiper={(s) => {
          swiperRef.current = s;
          sync(s);
        }}
        onSlideChange={sync}
        onResize={sync}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id} className="h-auto pb-2 pt-2">
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={atStart}
        aria-label="Previous products"
        className={`${arrowBase} left-0 lg:-left-3`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        disabled={atEnd}
        aria-label="Next products"
        className={`${arrowBase} right-0 lg:-right-3`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
