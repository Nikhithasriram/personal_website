import Image from "next/image";
import Hero from "./hero";
import Blog from "./blog_section";
import Footer from "./footer";
export default function Home() {
  return (
    <div className="px-4 py-6 sm:px-8 sm:py-10 md:px-30 md:py-14">
    <Hero/>
    <Blog/>
    <Footer/>
    </div>
  );
}
