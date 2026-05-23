import Link from "next/link";
import Image from "next/image";
import StarRating from "./StarRating";

function DoctorCard({ doctor }) {
  const href = "/appointments";

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-100 hover:shadow-xl hover:shadow-blue-950/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Top image area */}
      <div className="relative bg-blue-50 flex justify-center pt-8 pb-0">
        {/* Specialty badge */}
        <span className="absolute top-4 left-4 text-[11px] font-semibold text-blue-950 bg-blue-100 px-3 py-1 rounded-full tracking-wide">
          {doctor.specialty}
        </span>
        {/* Rating badge */}
        <span className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-bold text-white bg-blue-950 px-2.5 py-1 rounded-full">
          ★ {doctor.rating}
        </span>
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
      <div className="flex flex-col flex-1 p-6">
        {/* Name & stars */}
        <div className="mb-3 text-center">
          <h3 className="text-base font-bold text-gray-900 mb-1">
            {doctor.name}
          </h3>
          <div className="flex justify-center">
            <StarRating rating={doctor.rating} />
          </div>
          <p className="text-xs text-gray-400 mt-1">{doctor.reviews} reviews</p>
        </div>

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

        {/* Fee + CTA */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              Fee
            </p>
            <p className="text-base font-bold text-blue-950">৳{doctor.fee}</p>
          </div>
          <Link
            href={href}
            className="bg-blue-950 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-900 transition-all hover:-translate-y-0.5 shadow shadow-blue-950/20"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DoctorCard;
