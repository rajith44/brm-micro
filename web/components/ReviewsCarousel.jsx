"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { reviews } from "@/lib/data";

export default function ReviewsCarousel() {
  return (
    <div className="reviewsSwiper relative mt-8 w-full min-w-0">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        loop
        autoHeight={false}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
        }}
        className="!pb-12"
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={i} className="h-auto">
            <figure className="relative h-full bg-white rounded-2xl p-6 shadow-sm border border-[#eee3d2] flex flex-col">
              {/* watermark quote */}
              <svg
                className="absolute top-5 right-5 w-9 h-9 text-[#f0e4cf]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 0 1 7.17 9.5V6Zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83v-6.83H15.5a1.67 1.67 0 0 1 1.67-1.67V6Z" />
              </svg>

              <div className="text-gold-light text-base mb-3 tracking-widest" aria-label="Rated 5 out of 5">
                ★★★★★
              </div>

              <blockquote className="text-[15px] leading-7 text-[#43372a] flex-1">
                “{r.text}”
              </blockquote>

              <figcaption className="mt-5 pt-4 border-t border-line flex items-center gap-3">
                <span className="w-11 h-11 shrink-0 rounded-full bg-clay text-gold flex items-center justify-center font-cormorant text-xl">
                  {r.author.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-medium leading-tight">
                    <span className="truncate">{r.author}</span>
                    <svg className="w-4 h-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l2.39 1.74 2.95-.02 1.05 2.76 2.4 1.72-.9 2.81.9 2.81-2.4 1.72-1.05 2.76-2.95-.02L12 22l-2.39-1.74-2.95.02-1.05-2.76-2.4-1.72.9-2.81-.9-2.81 2.4-1.72 1.05-2.76 2.95.02L12 2z" />
                      <path d="M10.6 14.6l-2.2-2.2 1.1-1.1 1.1 1.1 3.0-3.0 1.1 1.1-4.1 4.1z" fill="#fff" />
                    </svg>
                  </span>
                  {r.location && (
                    <span className="block text-xs text-gold-muted uppercase tracking-[0.12em] truncate">
                      {r.location}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
