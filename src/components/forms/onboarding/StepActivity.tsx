'use client'
import { useOnboardingStore } from "@/stores/useOnboardingStore"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLegend
} from "@/components/ui/field"
import StepsForm from "./StepsForm"
import OcupationForm from "./OccupationForm"
import DetailTrainingInfo from "./DetailTrainingInfoForm"
import ActivityTypeForm from "./ActivityTypeForm"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { type StepActivityValues, stepActivitySchema } from "../schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Intensity, Occupation } from "@/features/calc"
import { AnimatePresence, motion } from "framer-motion"

export default function StepActivity() {
    const setStep = useOnboardingStore(state => state.setStep);
    const updateFormData = useOnboardingStore(state => state.updateFormData);
    const [localStep, setLocalStep] = useState(1);

    const variants = {
        enter: { x: 20, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 }
    };

    const form = useForm<StepActivityValues>({
        resolver: zodResolver(stepActivitySchema),
        defaultValues: {
            dailySteps: 0,
            hasActivity: false,
            occupation: '' as Occupation,
            durationPerSession: 0,
            sessionsPerWeek: 0,
            trainingIntensity: '' as Intensity
        }
    })
    const doesActivity = useWatch({
        control: form.control,
        name: "hasActivity"
    });

    const onNextStep = async () => {
        const fieldsByStep: Record<number, (keyof StepActivityValues)[]> = {
            1: ["occupation"],
            2: ["dailySteps"],
            3: ["hasActivity"],
            4: ["sessionsPerWeek", "durationPerSession", "trainingIntensity"],
        };

        const isValid = await form.trigger(fieldsByStep[localStep]);
        if (!isValid) return;

        if (localStep === 3 && !doesActivity) {
            const { dailySteps, occupation } = form.getValues();
            updateFormData({ activityData: { dailySteps, occupation, durationPerSession: 0, sessionsPerWeek: 0, trainingIntensity: 'low' } });
            setStep(3);
            return;
        }

        if (localStep < 4) {
            setLocalStep(step => step + 1);
        } else {
            const data = form.getValues();
            const { dailySteps, occupation, durationPerSession, sessionsPerWeek, trainingIntensity } = data;
            updateFormData({ activityData: { dailySteps, occupation, durationPerSession, sessionsPerWeek, trainingIntensity } });
            setStep(3);
        }
    };


    return (
        <AnimatePresence>
            <FieldGroup className="gap-1">
                <FieldLegend>
                    Ahora veamos que tan activo eres
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
                        {localStep === 1 && <OcupationForm form={form} />}
                        {localStep === 2 && <StepsForm form={form} />}
                        {localStep === 3 && <ActivityTypeForm form={form} />}
                        {(localStep === 4 && doesActivity) && <DetailTrainingInfo form={form} />}
                    </motion.div>
                    <Field>
                        <Button
                            onClick={onNextStep}
                            className="cursor-pointer"
                        >
                            {(localStep < 4 && !(localStep === 3 && !doesActivity)) ? 'siguiente' : 'continuar'}
                        </Button>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </AnimatePresence >
    )
}