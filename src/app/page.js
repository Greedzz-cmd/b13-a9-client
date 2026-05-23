import Banner from "@/Components/Banner";
import Navbar from "@/Components/Navbar";
import TopRatedDoctors from "@/Components/TopRatedDoctors";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <TopRatedDoctors />
    </div>
  );
}
