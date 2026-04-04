export default function SupportedPlants() {
    return (
        <section className="bg-green-50 px-6 md:px-10 py-16 md:py-20">

            {/* Title */}
            <h2 className="text-4xl font-bold text-center mb-12">
                Supported Plants
            </h2>

            {/* Cards Container */}
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

                {/* Potato Card */}
                <div className="bg-yellow-50 border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                    <h3 className="text-2xl font-bold mb-4">
                        🥔 Potato Plants
                    </h3>

                    <ul className="space-y-3 text-gray-700">
                        <li>✔ Late Blight Detection</li>
                        <li>✔ Early Blight Identification</li>
                        <li>✔ Scab Prevention Tips</li>
                    </ul>
                </div>

                {/* Tomato Card */}
                <div className="bg-red-50 border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                    <h3 className="text-2xl font-bold mb-4">
                        🍅 Tomato Plants
                    </h3>

                    <ul className="space-y-3 text-gray-700">
                        <li>✔ Bacterial Spot Analysis</li>
                        <li>✔ Virus Detection</li>
                        <li>✔ Leaf Spot Treatment</li>
                    </ul>
                </div>

            </div>

        </section>
    );
}
