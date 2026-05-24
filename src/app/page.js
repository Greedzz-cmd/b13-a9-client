import Banner from "@/Components/Banner";
import HowItWorks from "@/Components/HowItWorks";
import Navbar from "@/Components/Navbar";
import TopRatedDoctors from "@/Components/TopRatedDoctors";
import WhyChooseUs from "@/Components/WhyChooseUs";

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
