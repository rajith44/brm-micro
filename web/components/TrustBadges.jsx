"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { trustBadges } from "@/lib/data";

export default function TrustBadges() {
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
    <div className="trustSwiper relative w-full min-w-0">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.1}
        onSwiper={(s) => {
          swiperRef.current = s;
          sync(s);
        }}
        onSlideChange={sync}
        onResize={sync}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {trustBadges.map((b) => (
          <SwiperSlide key={b.title} className="h-auto pb-6 pt-6">
            <div className="group h-full bg-white rounded-2xl p-7 text-center shadow-sm border border-[#eee3d2] transition-all duration-300 hover:-translate-y-1 hover:shadow-mega hover:border-[#e2cfa9]">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#f3eadb] ring-1 ring-[#e7d6b6] flex items-center justify-center text-gold text-2xl transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                {b.icon}
              </div>
              <h3 className="font-cormorant text-xl mb-2">{b.title}</h3>
              <p className="text-sm text-[#6a5844] leading-7">{b.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrows flank the carousel left & right (only where it scrolls) */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={atStart}
        aria-label="Previous"
        className={`${arrowBase} left-0 sm:-left-3 lg:hidden`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        disabled={atEnd}
        aria-label="Next"
        className={`${arrowBase} right-0 sm:-right-3 lg:hidden`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
