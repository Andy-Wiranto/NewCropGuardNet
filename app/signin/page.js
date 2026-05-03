import Image from "next/image";
import AuthLayout from "@/components/features/auth/AuthLayout";
import SignInForm from "@/components/features/auth/SignInForm";

export default function SignIn() {
    const LeftPanel = (
        <>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 tracking-tight">Welcome Back to PlantHealth</h1>
            <p className="text-gray-600 text-lg max-w-sm leading-relaxed">
                Log in to access your AI-powered plant disease detection dashboard and keep your garden thriving.
            </p>
            <div className="relative z-10 mt-12">
                <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                    <Image
                        src="/plant.jpg"
                        alt="Healthy Plant"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="font-medium">&quot;My plants have never been healthier!&quot;</p>
                        <p className="text-sm opacity-80 mt-1">- Happy Gardener</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <AuthLayout leftPanel={LeftPanel}>
            <SignInForm />
        </AuthLayout>
    );
}
