"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Button } from "@heroui/react";

export default function BannerSlider({ slides, stats }) {
  const swiperRef = useRef(null);

  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{
        clickable: true,
        el: ".hero-pagination",
        bulletClass: "hero-bullet",
        bulletActiveClass: "hero-bullet-active",
      }}
      loop
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className="w-full min-h-[calc(100vh-80px)]"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div className="flex items-stretch min-h-[calc(100vh-80px)] w-full relative z-10">
            {/* ── LEFT: Text ── */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-14 pb-14 w-full md:w-[45%] lg:w-[40%]">
              <span className="inline-block text-xs font-semibold text-blue-950 bg-blue-100 px-4 py-1.5 rounded-full tracking-widest uppercase mb-6 w-fit">
                {slide.tag}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight text-gray-900 mb-6">
                {slide.heading.map((line, i) => {
                  if (
                    line === slide.highlight ||
                    line.includes(slide.highlight)
                  ) {
                    const parts = line.split(slide.highlight);
                    return (
                      <span key={i} className="block">
                        {parts[0]}
                        <span className="text-blue-950">{slide.highlight}</span>
                        {parts[1]}
                      </span>
                    );
                  }
                  return (
                    <span key={i} className="block">
                      {line}
                    </span>
                  );
                })}
              </h1>

              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-10">
                Take the first step toward better health with personalized,
                expert-led care.
              </p>

              <Link href="/all-appointments">
                <Button className=" bg-blue-950 text-white hover:bg-blue-900 transition-all hover:-translate-y-0.5">
                  Book Appointment
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </Link>

              {/* Swiper pagination dots */}
              <div className="hero-pagination flex gap-2" />
            </div>

            {/* Doctor image */}
            <div className="hidden md:flex relative items-end justify-center w-[38%] lg:w-[34%]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] h-[420px] rounded-t-full bg-blue-50 border border-blue-100" />
              <div className="relative z-10">
                <Image
                  src={slide.image}
                  alt={slide.author}
                  width={280}
                  height={420}
                  className="object-cover object-top rounded-t-full"
                  style={{ height: "420px", width: "280px" }}
                  unoptimized
                  priority={idx === 0}
                />
              </div>
              {/* Scroll hint */}
              <div
                className="absolute bottom-6 right-4 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center"
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2v10M3 8l4 4 4-4"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/*  Quote + Stats  */}
            <div className="hidden lg:flex flex-col justify-center px-10 xl:px-16 w-[26%]">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100 p-7">
                <svg
                  width="28"
                  height="22"
                  viewBox="0 0 28 22"
                  fill="none"
                  className="mb-4"
                  aria-hidden
                >
                  <path
                    d="M0 22V13.2C0 5.87 4.2 1.47 12.6 0l1.4 2.2C9.8 3.13 7.47 5.4 6.72 9H12V22H0Zm16 0V13.2C16 5.87 20.2 1.47 28.6 0L30 2.2C25.8 3.13 23.47 5.4 22.72 9H28V22H16Z"
                    fill="#172554"
                    fillOpacity="0.15"
                  />
                </svg>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-5">
                  &ldquo;{slide.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Image
                    src={slide.image}
                    alt={slide.author}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      {slide.author}
                    </p>
                    <p className="text-xs text-blue-950 font-medium">
                      {slide.tag}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-blue-950 rounded-xl p-4 text-center"
                  >
                    <p className="text-white text-xl font-extrabold">
                      {s.value}
                    </p>
                    <p className="text-blue-300 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
