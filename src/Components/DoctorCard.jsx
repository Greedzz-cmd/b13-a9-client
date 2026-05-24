"use client";

import { Card, Chip, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill={star <= Math.round(rating) ? "#172554" : "none"}
          stroke="#172554"
          strokeWidth="1.2"
          aria-hidden
        >
          <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.77l-3.09 1.685.59-3.41L2 4.635l3.455-.545L7 1z" />
        </svg>
      ))}
      <span className="text-xs font-semibold text-gray-700 ml-1">{rating}</span>
    </div>
  );
}

export default function DoctorCard({ doctor, isLoggedIn }) {
  const href = isLoggedIn ? `/doctors/${doctor.id}` : "/login";

  return (
    <Card className="border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image area */}
      <div className="relative bg-blue-50 flex justify-center pt-8 pb-0">
        {/* Specialty chip */}
        <div className="absolute top-4 left-4">
          <Chip
            color="default"
            className="text-[11px] font-semibold text-blue-950 bg-blue-100"
          >
            {doctor.specialty}
          </Chip>
        </div>

        {/* Rating badge */}
        <div className="absolute top-4 right-4">
          <Chip
            color="default"
            className="text-[11px] font-bold text-white bg-blue-950"
          >
            ★ {doctor.rating}
          </Chip>
        </div>

        <Image
          src={doctor.image}
          alt={doctor.name}
          width={120}
          height={120}
          className="rounded-full object-cover border-4 border-white shadow-md"
          style={{ width: 120, height: 120 }}
          unoptimized
        />
      </div>

      {/* Card body */}
      <Card.Header className="flex flex-col items-center pt-4 pb-0 px-6">
        <Card.Title className="text-base font-bold text-gray-900 text-center">
          {doctor.name}
        </Card.Title>
        <div className="flex justify-center mt-1">
          <StarRating rating={doctor.rating} />
        </div>
        <p className="text-xs text-gray-400 mt-1">{doctor.reviews} reviews</p>
      </Card.Header>

      <Card.Content className="flex flex-col flex-1 px-6 pt-4 pb-0">
        <hr className="border-gray-100 mb-4" />

        {/* Info rows */}
        <ul className="space-y-2 text-sm text-gray-600 flex-1">
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5.5 1a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2v2.5l1.5 1"
                  stroke="#172554"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {doctor.experience} experience
          </li>
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                aria-hidden
              >
                <rect
                  x="1"
                  y="3"
                  width="9"
                  height="7"
                  rx="1.5"
                  stroke="#172554"
                  strokeWidth="1.2"
                />
                <path
                  d="M3 3V2a2 2 0 014 0v1"
                  stroke="#172554"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {doctor.hospital}
          </li>
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5.5 1C3.57 1 2 2.57 2 4.5c0 2.63 3.5 5.5 3.5 5.5S9 7.13 9 4.5C9 2.57 7.43 1 5.5 1zm0 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                  fill="#172554"
                  fillOpacity="0.7"
                />
              </svg>
            </span>
            {doctor.location}
          </li>
        </ul>
      </Card.Content>

      <Card.Footer className="flex items-center justify-between px-6 py-4 mt-2 border-t border-gray-100">
        <div>
          <p className="text-[11px] text-gray-400 uppercase tracking-wide">
            Fee
          </p>
          <p className="text-base font-bold text-blue-950">৳{doctor.fee}</p>
        </div>
        <Button
          as={Link}
          href={href}
          className="bg-blue-950 text-white text-sm font-semibold px-5 rounded-full hover:bg-blue-900"
          size="sm"
        >
          View Details
        </Button>
      </Card.Footer>
    </Card>
  );
}
