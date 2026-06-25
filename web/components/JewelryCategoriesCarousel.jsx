"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { jewelryCategories } from "@/lib/data";

export default function JewelryCategoriesCarousel({ items }) {
  const cats = items && items.length ? items : jewelryCategories;
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
    <div className="jewelrySwiper relative w-full min-w-0">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        onSwiper={(s) => {
          swiperRef.current = s;
          sync(s);
        }}
        onSlideChange={sync}
        onResize={sync}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {cats.map((c) => (
          <SwiperSlide key={c.slug} className="h-auto pb-2 pt-2">
            <Link
              href={`/jewelry/${c.slug}`}
              className="group block h-full bg-clay rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-mega"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/jewelry/${c.slug}.png`}
                alt={c.name}
                className="w-full h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4 text-center">
                <h3 className="font-cormorant text-xl">{c.name}</h3>
                <p className="text-sm mt-1 text-[#6a5844] group-hover:text-gold transition-colors">Shop now</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Side arrows (mobile / tablet, where the row scrolls) */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={atStart}
        aria-label="Previous categories"
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
        aria-label="Next categories"
        className={`${arrowBase} right-0 lg:-right-3`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
