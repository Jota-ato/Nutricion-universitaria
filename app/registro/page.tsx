// src/app/onboarding/page.tsx
import { OnboardingForm } from "@/src/components/forms/onboarding";

export default function OnboardingPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-slate-50">
            <OnboardingForm />
        </main>
    );
}