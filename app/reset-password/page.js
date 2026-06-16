import AuthLayout from "@/components/features/auth/AuthLayout";
import ResetPasswordForm from "@/components/features/auth/ResetPasswordForm";

export const metadata = {
    title: "Reset Password | CropGuard",
    description: "Create a new password for your CropGuard account.",
};

export default function ResetPasswordPage() {
    const leftPanel = (
        <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Create new password.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Your new password must be unique from those previously used. Please enter a strong password.
            </p>
        </div>
    );

    return (
        <AuthLayout leftPanel={leftPanel}>
            <ResetPasswordForm />
        </AuthLayout>
    );
}
