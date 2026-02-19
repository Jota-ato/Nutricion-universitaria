import { z } from 'zod';
import type { UseFormReturn } from "react-hook-form";
import type { Occupation, Intensity } from '@/features/calc';

const occupationValues: [Occupation, ...Occupation[]] = [
    "sedentary",
    "light",
    "moderate",
    "heavy",
];

const intensityValues: [Intensity, ...Intensity[]] = [
    "high",
    "low",
    "moderate"
];

export const stepBasicSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    age: z.coerce.number().min(12, "Debes tener al menos 12 años").max(100),
    height: z.coerce.number().min(100, "Altura mínima 100cm").max(250),
    weight: z.coerce.number().min(30, "Peso mínimo 30kg").max(300),
})

export type StepBasicValues = z.infer<typeof stepBasicSchema>

export const stepActivitySchema = z.object({
    hasActivity: z.boolean(),
    sessionsPerWeek: z.coerce.number().min(1, "Mínimo 1").max(21),
    durationPerSession: z.coerce.number().min(10, "Mínimo 10 min").max(300),
    occupation: z.enum(occupationValues),
    trainingIntensity: z.enum(intensityValues),
    dailySteps: z.coerce.number().min(0, "Mínimo 0").max(50000, "Valor poco realista")
});

export type StepActivityValues = z.infer<typeof stepActivitySchema>;
export type FormType = UseFormReturn<{
    hasActivity: boolean;
    sessionsPerWeek: number;
    durationPerSession: number;
    occupation: Occupation;
    trainingIntensity: Intensity;
    dailySteps: number;
}, any, undefined>