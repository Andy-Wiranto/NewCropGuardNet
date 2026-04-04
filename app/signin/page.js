import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "Sign In - PlantHealth",
    description: "Sign in to your PlantHealth account to continue detecting plant diseases.",
};

export default function SignIn() {
    return (
        <div className="min-h-screen bg-green-100 flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

                {/* LEFT SIDE */}
                <div className="hidden md:flex flex-col justify-center">

                    <div className="mb-8">
                        <div className="bg-green-600 w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl mb-6">
                            🌿
                        </div>

                        <h1 className="text-5xl font-bold mb-3">
                            PlantHealth
                        </h1>

                        <p className="text-gray-600 text-lg">
                            AI-Powered Plant Disease Detection
                        </p>
                    </div>

                    <Image
                        src="/plant.jpg"
                        alt="Plant"
                        width={500}
                        height={400}
                        className="rounded-2xl shadow-lg"
                    />

                </div>

                {/* RIGHT SIDE (FORM CARD) */}
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md w-full">

                    <h2 className="text-3xl font-bold mb-2">
                        Welcome Back
                    </h2>

                    <p className="text-gray-600 mb-8">
                        Sign in to your account to continue
                    </p>

                    {/* EMAIL */}
                    <div className="mb-5">
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
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                    </div>

                    {/* REMEMBER + FORGOT */}
                    <div className="flex justify-between items-center mb-6 text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <a href="#" className="text-green-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* SIGN IN BUTTON */}
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition mb-6">
                        Sign In
                    </button>

                    {/* DIVIDER */}
                    <div className="flex items-center mb-6">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-500">
                            Or continue with
                        </span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/* SOCIAL BUTTONS */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button className="border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                            Google
                        </button>

                        <button className="border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
                            GitHub
                        </button>
                    </div>

                    {/* SIGN UP LINK */}
                    <p className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-green-600 font-medium hover:underline">
                            Sign up
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
