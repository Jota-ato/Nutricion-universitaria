import { z } from 'zod';
import type { UseFormReturn } from "react-hook-form";
import type { Occupation, Intensity, Goal, Sex } from '@/features/calc';

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

const sexValues: [Sex, ...Sex[]] = [
    "male",
    "female"
];

export const stepBasicSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    age: z.union([
        z.literal(""),
        z.coerce.number().min(12, "Debes tener al menos 12 años").max(100),
    ]),
    sex: z.enum(sexValues, {
        errorMap: () => ({ message: "Selecciona tu sexo" }),
    }),
    height: z.union([
        z.literal(""),
        z.coerce.number().min(100, "Altura mínima 100cm").max(250),
    ]),
    weight: z.union([
        z.literal(""),
        z.coerce.number().min(30, "Peso mínimo 30kg").max(300),
    ]),
});

export type StepBasicValues = z.infer<typeof stepBasicSchema>

export const stepActivitySchema = z.object({
    hasActivity: z.boolean(),
    sessionsPerWeek: z.union([
        z.literal(""),
        z.coerce.number().min(1, "Mínimo 1").max(21),
    ]),
    durationPerSession: z.union([
        z.literal(""),
        z.coerce.number().min(10, "Mínimo 10 min").max(300),
    ]),
    occupation: z.enum(occupationValues),
    trainingIntensity: z.enum(intensityValues),
    dailySteps: z.union([
        z.literal(""),
        z.coerce.number().min(0, "Mínimo 0").max(50000, "Valor poco realista"),
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, any, undefined>

export const stepGoalSchema = z.object({
    goal: z.enum(goalValues),
    targetWeight: z.union([
        z.literal(""),
        z.coerce.number().min(30, "Mínimo 30kg").max(50000, "Máximo 100kg"),
    ]),
    weeksToGoal: z.union([
        z.literal(""),
        z.coerce.number().min(1, "Debe de ser mínimo una semana"),
    ]),
});

export type StepToGoalType = z.infer<typeof stepGoalSchema>;
export type StepToGoalFormType =
    UseFormReturn<{
        goal: Goal;
        targetWeight: number | "";
        weeksToGoal: number | "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, any, undefined>