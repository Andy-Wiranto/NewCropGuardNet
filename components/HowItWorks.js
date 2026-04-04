export default function HowItWorks() {
    return (
        <section id="how" className="px-6 md:px-10 py-16 md:py-20 bg-white text-center">

            {/* Title */}
            <h2 className="text-4xl font-bold mb-4">
                How It Works
            </h2>

            <p className="text-gray-600 mb-12">
                Simple, fast, and accurate plant health detection
            </p>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-8">

                {/* Card 1 */}
                <div className="border rounded-xl p-8 shadow-sm hover:shadow-md transition">
                    <div className="text-4xl mb-4">🌱</div>
                    <h3 className="text-xl font-semibold mb-3">
                        1. Choose Plant Type
                    </h3>
                    <p className="text-gray-600">
                        Select whether you&apos;re scanning a potato or tomato plant.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="border rounded-xl p-8 shadow-sm hover:shadow-md transition">
                    <div className="text-4xl mb-4">📸</div>
                    <h3 className="text-xl font-semibold mb-3">
                        2. Upload Photo
                    </h3>
                    <p className="text-gray-600">
                        Take or upload a clear photo of your plant leaves.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="border rounded-xl p-8 shadow-sm hover:shadow-md transition">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold mb-3">
                        3. Get Results
                    </h3>
                    <p className="text-gray-600">
                        Receive instant diagnosis and care recommendations.
                    </p>
                </div>

            </div>

        </section>
    );
}
