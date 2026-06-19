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
          <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col justify-center overflow-hidden lg:flex-row">
            <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
              <span className="inline-flex text-xs font-semibold uppercase tracking-[0.3em] text-blue-950 bg-white/90 px-4 py-1.5 rounded-full shadow-sm mb-5 w-fit backdrop-blur-sm">
                {slide.tag}
              </span>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02] mb-6 max-w-2xl">
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

              <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base mb-10">
                Take the first step toward better health with personalized,
                expert-led care and instant booking.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/all-appointments">
                  <Button className="inline-flex items-center justify-center rounded-full bg-blue-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-900">
                    Book Appointment
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="ml-2"
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
                <div className="rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                  Start browsing verified specialists now.
                </div>
              </div>

              <div className="hero-pagination mt-10 flex gap-2" />
            </div>

            <div className="relative order-first w-full lg:order-last lg:w-[42%]">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" />
              <div className="relative mx-auto mt-8 h-[420px] max-w-[360px] rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.35)] overflow-hidden lg:mt-0">
                <Image
                  src={slide.image}
                  alt={slide.author}
                  fill
                  className="object-cover"
                  unoptimized
                  priority={idx === 0}
                />
              </div>

              <div className="absolute left-1/2 top-[calc(100%_-_1.5rem)] -translate-x-1/2 w-[min(22rem,90%)] rounded-3xl bg-white/95 border border-slate-200 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm lg:left-auto lg:right-10 lg:top-auto lg:bottom-10 lg:translate-x-0 lg:w-[18rem]">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-3">
                  Featured Doctor
                </p>
                <p className="text-base font-semibold text-slate-900 mb-1">
                  {slide.author}
                </p>
                <p className="text-sm text-slate-600">
                  {slide.tag} with patient-first care and proven results.
                </p>
              </div>
            </div>

            <div className="hidden lg:flex w-[26%] flex-col justify-center gap-4 px-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-xs tracking-[0.3em] uppercase text-slate-400 mb-4">
                  What patients say
                </p>
                <p className="text-sm leading-7 text-slate-600 italic">
                  “{slide.quote}”
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                    <Image
                      src={slide.image}
                      alt={slide.author}
                      width={40}
                      height={40}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {slide.author}
                    </p>
                    <p className="text-xs uppercase tracking-[0.24em] text-blue-700">
                      {slide.tag}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-3xl bg-blue-950 p-4 text-center text-white shadow-sm"
                  >
                    <p className="text-lg font-extrabold">{s.value}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-blue-200">
                      {s.label}
                    </p>
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
