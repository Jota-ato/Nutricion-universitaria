'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator
} from "@/components/ui/field"
import GoalSelect from "./GoalForm/GoalSelect"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { stepGoalSchema, StepToGoalType } from "../schemas"
import { useOnboardingStore } from "@/stores/useOnboardingStore"
import GoalDetail from "@/components/forms/onboarding/GoalForm/GoalDetail";

export default function StepGoals() {

    const goalData = useOnboardingStore(state => state.formData.goalData);
    const updateFormData = useOnboardingStore(state => state.updateFormData);
    const setStep = useOnboardingStore(state => state.setStep);
    const [localStep, setLocalStep] = useState(1);

    const form = useForm<StepToGoalType>({
        resolver: zodResolver(stepGoalSchema),
        defaultValues: goalData,
    })

    const goal = useWatch({
        control: form.control,
        name: "goal"
    });

    const onNextStep = async () => {
        const fieldsByStep: Record<number, (keyof StepToGoalType)[]> = {
            1: ["goal"],
            2: ["targetWeight", "weeksToGoal"],
        };
        const isValid = await form.trigger(fieldsByStep[localStep]);
        if (!isValid) return;

        const data = form.getValues();
        if (data.goal === "maintenance") {
            updateFormData({ goalData: data });
            setStep(4);
            return;
        }
        if (localStep < 3) {
            setLocalStep(step => step + 1);
        } else {
            updateFormData({ goalData: data });
            setStep(4);
        }

    }

    const returnStep = () => setLocalStep(step => step - 1);

    return (
        <FieldGroup className="gap-1">
            <FieldLegend>
                Ahora conozcamos tus metas
            </FieldLegend>
            {localStep === 1 && (
                <GoalSelect form={form} />
            )}
            {(localStep === 2 && goal !== 'maintenance') && <GoalDetail form={form}/>}

            <Field
                className={`${localStep > 1 ? "grid grid-cols-2 gap-4" : ""} mt-3`}
            >
                {localStep > 1 && (
                    <Button
                        className="cursor-pointer"
                        type="button"
                        onClick={returnStep}
                    >
                        regresar
                    </Button>
                )}
                <Button
                    onClick={onNextStep}
                    type="button"
                    className="cursor-pointer"
                >
                    {(localStep < 2 && !(localStep === 1 && (goal === 'maintenance'))) ? 'siguiente' : 'terminar'}
                </Button>
            </Field>
        </FieldGroup>
    )
}