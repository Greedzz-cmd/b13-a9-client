"use client";

import { Button, Card, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

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
      <span className="ml-1 text-xs font-semibold text-gray-700">{rating}</span>
    </div>
  );
}

export default function DoctorCard({ doctor }) {
  const { data, isPending } = useSession();
  const href = data?.user
    ? `/doctors/${doctor.id}`
    : `/login?redirect=${encodeURIComponent(`/doctors/${doctor.id}`)}`;
  const nextSlot = doctor.availability?.[0];

  return (
    <Card className="flex h-full flex-col overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex justify-center bg-blue-50 pt-8 pb-0">
        <div className="absolute top-4 left-4">
          <Chip className="bg-blue-100 text-[11px] font-semibold text-blue-950">
            {doctor.specialty}
          </Chip>
        </div>

        <div className="absolute top-4 right-4">
          <Chip className="bg-blue-950 text-[11px] font-bold text-white">
            Rating {doctor.rating}
          </Chip>
        </div>

        <Image
          src={doctor.image}
          alt={doctor.name}
          width={120}
          height={120}
          unoptimized
          className="rounded-full border-4 border-white object-cover shadow-md"
          style={{ width: 120, height: 120 }}
        />
      </div>

      <Card.Header className="flex flex-col items-center px-6 pt-4 pb-0">
        <Card.Title className="text-center text-base font-bold text-gray-900">
          {doctor.name}
        </Card.Title>
        <div className="mt-1 flex justify-center">
          <StarRating rating={doctor.rating} />
        </div>
        <p className="mt-1 text-xs text-gray-400">{doctor.reviews} reviews</p>
      </Card.Header>

      <Card.Content className="flex flex-1 flex-col px-6 pt-4 pb-0">
        <hr className="mb-4 border-gray-100" />

        <ul className="flex-1 space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
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
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
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
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
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
          {nextSlot ? (
            <li className="flex items-center gap-2">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 5.5l2 2 5-5"
                    stroke="#047857"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Next slot: {nextSlot}
            </li>
          ) : null}
        </ul>
      </Card.Content>

      <Card.Footer className="mt-2 flex items-center justify-between border-t border-gray-100 px-6 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-gray-400">
            Fee
          </p>
          <p className="text-base font-bold text-blue-950">BDT {doctor.fee}</p>
        </div>
        <Link href={href}>
          <Button
            isDisabled={isPending}
            className="rounded-full bg-blue-950 px-5 text-sm font-semibold text-white hover:bg-blue-900"
            size="sm"
          >
            View Details
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
