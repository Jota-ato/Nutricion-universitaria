'use client'
import { useState } from "react"
import { StepActivity, StepBasics, StepGoals } from ".";

export default function OnBoardingForm() {

    const [step, setStep] = useState(1);

    return (
        <form>
            <fieldset>
                {step === 1 && <StepBasics />}
                {step === 2 && <StepActivity />}
                {step === 3 && <StepGoals />}
            </fieldset>
        </form>
    )
}