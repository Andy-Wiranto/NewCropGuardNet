import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "Sign Up - PlantHealth",
    description: "Create a PlantHealth account to start protecting your plants with AI.",
};

export default function SignUp() {
    return (
        <div className="min-h-screen bg-[#e6f2ee] flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

                {/* LEFT SIDE */}
                <div className="hidden md:flex flex-col justify-center">

                    <div className="mb-6">
                        <div className="bg-green-600 w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl mb-6">
                            🌿
                        </div>

                        <h1 className="text-5xl font-bold mb-3">
                            PlantHealth
                        </h1>

                        <p className="text-gray-600 text-lg">
                            Join thousands of gardeners protecting their plants with AI
                        </p>
                    </div>

                    <Image
                        src="/plant.jpg"
                        alt="Plant"
                        width={500}
                        height={400}
                        className="rounded-2xl shadow-lg mb-8"
                    />

                    {/* Feature List */}
                    <div className="space-y-4 text-gray-700">
                        <div className="flex items-start gap-3">
                            <span className="text-green-600 text-lg">✔</span>
                            <div>
                                <p className="font-medium">Instant Disease Detection</p>
                                <p className="text-sm text-gray-500">
                                    Get results in seconds with AI-powered analysis
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-green-600 text-lg">✔</span>
                            <div>
                                <p className="font-medium">Expert Recommendations</p>
                                <p className="text-sm text-gray-500">
                                    Receive personalized care advice
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-green-600 text-lg">✔</span>
                            <div>
                                <p className="font-medium">Track Your Plants</p>
                                <p className="text-sm text-gray-500">
                                    Monitor health history over time
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE FORM */}
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md w-full">

                    <h2 className="text-3xl font-bold mb-2">
                        Create Account
                    </h2>

                    <p className="text-gray-600 mb-8">
                        Sign up to start protecting your plants
                    </p>

                    {/* FULL NAME */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Must be at least 8 characters
                        </p>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                    </div>

                    {/* TERMS */}
                    <div className="flex items-start gap-2 mb-6 text-sm">
                        <input type="checkbox" className="mt-1" />
                        <p>
                            I agree to the{" "}
                            <span className="text-green-600 hover:underline cursor-pointer">
                                Terms of Service
                            </span>{" "}
                            and{" "}
                            <span className="text-green-600 hover:underline cursor-pointer">
                                Privacy Policy
                            </span>
                        </p>
                    </div>

                    {/* CREATE ACCOUNT BUTTON */}
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition mb-6">
                        Create Account
                    </button>

                    {/* DIVIDER */}
                    <div className="flex items-center mb-6">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-500">
                            Or sign up with
                        </span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/* SOCIAL */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button className="border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                            Google
                        </button>

                        <button className="border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                            GitHub
                        </button>
                    </div>

                    {/* SIGN IN LINK */}
                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-green-600 font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>

                    <div className="text-center mt-4">
                        <Link href="/" className="text-sm text-gray-500 hover:underline">
                            ← Back to home
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
