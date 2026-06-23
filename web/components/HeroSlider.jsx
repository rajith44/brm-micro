"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { heroSlides } from "@/lib/data";

export default function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        className="heroSwiper"
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        loop
        effect="fade"
        speed={1200}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative min-h-[72vh] sm:min-h-[78vh] lg:min-h-[92vh] bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              <div className="absolute inset-0 hero-overlay" />
              <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 min-h-[72vh] sm:min-h-[78vh] lg:min-h-[92vh] flex items-center">
                <div className="max-w-2xl text-white py-16">
                  <div className="hero-animate hero-delay-1 inline-block bg-gold-light text-white px-5 py-2 text-sm uppercase tracking-[0.2em] mb-5 rounded-full">
                    {slide.badge}
                  </div>
                  <h1 className="hero-animate hero-delay-2 font-cormorant text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
                    {slide.title}
                  </h1>
                  <p className="hero-animate hero-delay-3 text-base sm:text-lg lg:text-xl text-white/85 leading-8 mb-8">
                    {slide.text}
                  </p>
                  <div className="hero-animate hero-delay-3 flex flex-wrap gap-4">
                    <Link href={slide.primary.href} className="bg-white text-coffee px-7 py-3 rounded-full font-medium hover:bg-white/90 transition">
                      {slide.primary.label}
                    </Link>
                    <Link href={slide.secondary.href} className="border border-white/60 text-white px-7 py-3 rounded-full font-medium hover:bg-white/10 transition">
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
