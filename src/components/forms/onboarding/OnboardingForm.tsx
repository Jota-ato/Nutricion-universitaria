'use client'
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { StepActivity, StepBasics, StepGoals } from ".";
import { Card } from "@/components/ui/card";

export default function OnBoardingForm() {

    const step = useOnboardingStore(state => state.step);
    
    return (
        <Card className="px-4 max-w-480 w-[90%] mx-auto">
            <form onSubmit={e => e.preventDefault()}>
                <fieldset>
                    {step === 1 && <StepBasics />}
                    {step === 2 && <StepActivity />}
                    {step === 3 && <StepGoals />}
                </fieldset>
            </form>
        </Card>
    )
}