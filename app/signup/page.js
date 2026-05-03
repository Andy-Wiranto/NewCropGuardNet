import AuthLayout from "@/components/features/auth/AuthLayout";
import SignUpForm from "@/components/features/auth/SignUpForm";

export default function SignUp() {
    const LeftPanel = (
        <>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 tracking-tight">Join PlantHealth</h1>
            <p className="text-gray-600 text-lg max-w-sm leading-relaxed">
                Join thousands of gardeners protecting their plants with AI-driven insights.
            </p>
            <div className="relative z-10 mt-12 space-y-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">✓</div>
                    <div>
                        <h3 className="text-gray-900 font-semibold">Instant Disease Detection</h3>
                        <p className="text-gray-500 text-sm mt-1">Get results in seconds with our advanced AI model.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">✓</div>
                    <div>
                        <h3 className="text-gray-900 font-semibold">Expert Recommendations</h3>
                        <p className="text-gray-500 text-sm mt-1">Receive personalized, actionable care advice.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">✓</div>
                    <div>
                        <h3 className="text-gray-900 font-semibold">Track Your Garden</h3>
                        <p className="text-gray-500 text-sm mt-1">Monitor the health history of all your plants.</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <AuthLayout leftPanel={LeftPanel}>
            <SignUpForm />
        </AuthLayout>
    );
}
