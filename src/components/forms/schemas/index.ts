import { z } from 'zod';
import type { UseFormReturn } from "react-hook-form";
import type { Occupation, Intensity, Goal } from '@/features/calc';

const occupationValues: [Occupation, ...Occupation[]] = [
    "sedentary",
    "light",
    "moderate",
    "heavy",
];

const goalValues: [Goal, ...Goal[]] = [
    "gain",
    "loss",
    "maintenance"
]

const intensityValues: [Intensity, ...Intensity[]] = [
    "high",
    "low",
    "moderate"
];

export const stepBasicSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    age: z.union([
        z.coerce.number().min(12, "Debes tener al menos 12 años").max(100),
        z.literal(""),
    ]),
    height: z.union([
        z.coerce.number().min(100, "Altura mínima 100cm").max(250),
        z.literal(""),
    ]),
    weight: z.union([
        z.coerce.number().min(30, "Peso mínimo 30kg").max(300),
        z.literal(""),
    ]),
});

export type StepBasicValues = z.infer<typeof stepBasicSchema>

export const stepActivitySchema = z.object({
    hasActivity: z.boolean(),
    sessionsPerWeek: z.union([
        z.coerce.number().min(1, "Mínimo 1").max(21),
        z.literal(""),
    ]),
    durationPerSession: z.union([
        z.coerce.number().min(10, "Mínimo 10 min").max(300),
        z.literal(""),
    ]),
    occupation: z.enum(occupationValues),
    trainingIntensity: z.enum(intensityValues),
    dailySteps: z.union([
        z.coerce.number().min(0, "Mínimo 0").max(50000, "Valor poco realista"),
        z.literal(""),
    ]),
});

export type StepActivityValues = z.infer<typeof stepActivitySchema>;
export type ActivityFormType = UseFormReturn<{
    hasActivity: boolean;
    sessionsPerWeek: number | "";
    durationPerSession: number | "";
    occupation: Occupation;
    trainingIntensity: Intensity;
    dailySteps: number | "";
}, any, undefined>

export const stepGoalSchema = z.object({
    goal: z.enum(goalValues),
    targetWeight: z.coerce.number().min(30, "El peso mínimo es 30kg").max(200, "El peso máximo es 200kg").optional(),
    weeksToGoal: z.coerce.number().min(1, "Debe ser al menos 1 semana").optional(),
});

export type StepToGoalType = z.infer<typeof stepGoalSchema>;
export type StepToGoalFormType =
    UseFormReturn<{
        goal: Goal;
        targetWeight?: number;
        weeksToGoal?: number;
    }, any, undefined>