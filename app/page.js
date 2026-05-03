import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SupportedPlants from "@/components/SupportedPlants";
import CTA from "@/components/CTA";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <HowItWorks />
            <SupportedPlants />
            <CTA />
        </>
    );
}
