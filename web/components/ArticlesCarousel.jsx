"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function ArticleCard({ article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#eee3d2] block group h-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="p-5">
        <h3 className="font-cormorant text-2xl leading-tight">{article.title}</h3>
        <p className="text-sm text-[#6a5844] mt-3">{article.excerpt}</p>
      </div>
    </Link>
  );
}

export default function ArticlesCarousel({ articles = [] }) {
  if (!articles.length) return null;

  return (
    <>
      {/* Mobile carousel */}
      <div className="articlesSwiper relative w-full min-w-0 md:hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.08}
          pagination={{ clickable: true }}
          className="!pb-12"
        >
          {articles.map((a) => (
            <SwiperSlide key={a.slug} className="h-auto">
              <ArticleCard article={a} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet / desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </>
  );
}
