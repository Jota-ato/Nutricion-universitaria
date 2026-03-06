'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLegend,
} from "@/components/ui/field"
import GoalSelect from "./GoalForm/GoalSelect"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { stepGoalSchema, StepToGoalType } from "../schemas"
import { useOnboardingStore } from "@/stores/useOnboardingStore"
import GoalDetail from "@/components/forms/onboarding/GoalForm/GoalDetail";
import { AnimatePresence, motion } from "framer-motion"
import { Goal } from "@/features/calc"

export default function StepGoals() {

    const calculateStats = useOnboardingStore(state => state.calculateStats);
    const updateFormData = useOnboardingStore(state => state.updateFormData);
    const setStep = useOnboardingStore(state => state.setStep);
    const [localStep, setLocalStep] = useState(1);

    const variants = {
        enter: { x: 20, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 }
    };

    const form = useForm<StepToGoalType>({
        resolver: zodResolver(stepGoalSchema),
        defaultValues: {
            goal: "" as Goal,
            targetWeight: "",
            weeksToGoal: ""
        },
        mode: "onChange"
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
            calculateStats();
            return;
        }
        if (localStep < 2) {
            setLocalStep(step => step + 1);
        } else {
            updateFormData({ goalData: data });
            calculateStats();
            setStep(4);
        }

    }

    const returnStep = () => setLocalStep(step => step - 1);

    return (
        <AnimatePresence>
            <FieldGroup className="gap-1">
                <FieldLegend>
                    Ahora conozcamos tus metas
                </FieldLegend>
                <FieldGroup>
                    <motion.div
                        key={localStep}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                    >
                        {localStep === 1 && (
                            <GoalSelect form={form} />
                        )}
                        {(localStep === 2 && goal !== 'maintenance') && <GoalDetail form={form} />}
                    </motion.div>
                </FieldGroup>

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
        </AnimatePresence>
    )
}