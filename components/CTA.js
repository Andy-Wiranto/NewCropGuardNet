import Link from "next/link";

export default function CTA() {
    return (
        <section className="bg-green-600 text-white py-16 md:py-20 px-6 md:px-10 text-center">

            <div className="max-w-3xl mx-auto">

                <h2 className="text-2xl md:text-4xl font-bold mb-6">
                    Ready to Protect Your Plants?
                </h2>

                <p className="text-lg mb-8 text-green-100">
                    Start detecting plant diseases in seconds using our AI-powered tool.
                    Fast, accurate, and easy to use.
                </p>
                <Link href="/scan">
                    <button className="bg-white text-green-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition">
                        Get Started
                    </button>
                </Link>

            </div>

        </section>
    );
}
