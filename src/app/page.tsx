import Image from "next/image";
import Navbar from "@/components/Navbar";
import Citytable from "@/components/citytable";

export default function Home() {
  return (
    <main>
      <nav className="flex flex-col gap-4 bg-gray-100 ">
        <Navbar fromHomePage={true}/>
      </nav>

      <Citytable />
    </main>
  );
}
