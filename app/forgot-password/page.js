import AuthLayout from "@/components/features/auth/AuthLayout";
import ForgotPasswordForm from "@/components/features/auth/ForgotPasswordForm";

export const metadata = {
    title: "Forgot Password | CropGuard",
    description: "Reset your CropGuard password.",
};

export default function ForgotPasswordPage() {
    const leftPanel = (
        <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Don&apos;t worry.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
            </p>
        </div>
    );

    return (
        <AuthLayout leftPanel={leftPanel}>
            <ForgotPasswordForm />
        </AuthLayout>
    );
}
