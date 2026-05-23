export default function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
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
