import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-green-50 px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">

            {/* Left Side */}
            <div className="max-w-xl">
                <p className="text-green-600 font-semibold mb-4">
                    AI-Powered Detection
                </p>

                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                    Protect Your Plants with AI
                </h1>

                <p className="text-gray-600 mb-8">
                    Instantly detect diseases in your potato and tomato plants.
                    Get expert recommendations to keep your garden healthy.
                </p>
                <Link href="/scan">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                        Start Scanning Now
                    </button>
                </Link>
            </div>

            {/* Right Side */}
            <div>
                <Image
                    src="/plant.jpg"
                    alt="Healthy plant leaves"
                    width={500}
                    height={400}
                    className="w-full md:w-[500px] rounded-2xl shadow-lg"
                    priority
                />
            </div>

        </section>
    );
}
