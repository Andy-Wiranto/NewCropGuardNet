import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-sm">

            {/* Logo */}
            <Link href="/">
                <div className="text-2xl font-bold text-green-600">
                    PlantHealth
                </div>
            </Link>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-6">
                <Link href="/learn" className="text-gray-600 hover:text-green-600">
                    Learn More
                </Link>

                <Link href="/scan">
                    <button className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50">
                        Scan Plant
                    </button>
                </Link>

                <Link href="/signup">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Sign Up
                    </button>
                </Link>
            </div>

        </nav>
    );
}
