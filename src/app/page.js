import Banner from "@/Components/Banner";
import HowItWorks from "@/Components/HowItWorks";
import TopRatedDoctors from "@/Components/TopRatedDoctors";
import WhyChooseUs from "@/Components/WhyChooseUs";

export const metadata = {
  title: "docAppoint | Doctor Appointment Manager",
  description:
    "Browse top doctors, compare specialties, and book trusted appointments across Dhaka with docAppoint.",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <TopRatedDoctors />
      <WhyChooseUs />
      <HowItWorks />
    </div>
  );
}
