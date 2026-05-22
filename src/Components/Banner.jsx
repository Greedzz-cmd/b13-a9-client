import BannerSlider from "./BannerSlider";

const slides = [
  {
    tag: "Cardiologist",
    heading: ["Your heart deserves", "the", "best care"],
    highlight: "best care",
    quote:
      "I'm here to provide expert cardiac care, guide you through your health concerns, and help you live a longer, healthier life.",
    author: "Dr. Ayesha Rahman",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    tag: "Neurologist",
    heading: ["Achieve the", "best version", "of your health"],
    highlight: "of your health",
    quote:
      "I'm here to provide expert care, guide you through your health concerns, and help you live a healthier life.",
    author: "Dr. Mehedi Hasan",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    tag: "Pediatrician",
    heading: ["Every child", "deserves", "expert care"],
    highlight: "expert care",
    quote:
      "I provide compassionate, evidence-based care for children at every stage of their growth and development.",
    author: "Dr. Samira Chowdhury",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
  },
];

const stats = [
  { value: "500+", label: "Doctors" },
  { value: "20k+", label: "Patients" },
];

export default function Banner() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -top-24 -left-24 w-120 h-120 rounded-full bg-blue-50 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-90 h-90 rounded-full bg-blue-950/5 blur-2xl" />
        <svg
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-10"
          width="600"
          height="80"
          viewBox="0 0 600 80"
          aria-hidden
        ></svg>
      </div>

      <BannerSlider slides={slides} stats={stats} />
    </section>
  );
}
