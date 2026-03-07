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

const intensityValues: [Intensity, ...Intensity[], ""] = [
    "high",
    "low",
    "moderate",
    ""
];

const sexValues: [Sex, ...Sex[]] = [
    "male",
    "female"
];

export const stepBasicSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    // Dejamos las uniones limpias para que TypeScript respete el tipo "" | number
    age: z.union([z.literal(""), z.coerce.number()]),
    sex: z.enum(sexValues, {
        errorMap: () => ({ message: "Selecciona tu sexo" }),
    }),
    height: z.union([z.literal(""), z.coerce.number()]),
    weight: z.union([z.literal(""), z.coerce.number()]),
}).superRefine((data, ctx) => {

    // Validamos la Edad
    if (data.age === "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La edad es requerida", path: ["age"] });
    } else {
        if (data.age < 12) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Debes tener al menos 12 años", path: ["age"] });
        if (data.age > 100) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Edad máxima 100 años", path: ["age"] });
    }

    // Validamos la Altura
    if (data.height === "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La altura es requerida", path: ["height"] });
    } else {
        if (data.height < 100) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Altura mínima 100cm", path: ["height"] });
        if (data.height > 250) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Altura máxima 250cm", path: ["height"] });
    }

    // Validamos el Peso
    if (data.weight === "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El peso es requerido", path: ["weight"] });
    } else {
        if (data.weight < 30) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Peso mínimo 30kg", path: ["weight"] });
        if (data.weight > 300) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Peso máximo 300kg", path: ["weight"] });
    }
});

export type StepBasicValues = z.infer<typeof stepBasicSchema>

export const stepActivitySchema = z.object({
    hasActivity: z.boolean(),
    occupation: z.enum(occupationValues),
    trainingIntensity: z.enum(intensityValues),

    dailySteps: z.union([z.literal(""), z.coerce.number()]),
    sessionsPerWeek: z.union([z.literal(""), z.coerce.number()]),
    durationPerSession: z.union([z.literal(""), z.coerce.number()]),

}).superRefine((data, ctx) => {

    if (data.dailySteps === "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Tus pasos diarios son requeridos", path: ["dailySteps"] });
    } else {
        if (data.dailySteps < 0) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Mínimo 0", path: ["dailySteps"] });
        if (data.dailySteps > 50000) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valor poco realista", path: ["dailySteps"] });
    }

    // 2. Validación CONDICIONAL para las sesiones y duración (solo si hace ejercicio)
    if (data.hasActivity) {
        if (data.sessionsPerWeek === "") {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ingresa cuántas sesiones", path: ["sessionsPerWeek"] });
        } else {
            if (data.sessionsPerWeek < 1) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Mínimo 1", path: ["sessionsPerWeek"] });
            if (data.sessionsPerWeek > 21) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Máximo 21", path: ["sessionsPerWeek"] });
        }

        if (data.durationPerSession === "") {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ingresa la duración", path: ["durationPerSession"] });
        } else {
            if (data.durationPerSession < 10) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Mínimo 10 min", path: ["durationPerSession"] });
            if (data.durationPerSession > 300) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Máximo 300 min", path: ["durationPerSession"] });
        }
    }
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

    targetWeight: z.union([z.literal(""), z.coerce.number()]),
    weeksToGoal: z.union([z.literal(""), z.coerce.number()]),

}).superRefine((data, ctx) => {
    if (data.goal !== "maintenance") {
        if (data.targetWeight === "") {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El peso objetivo es requerido", path: ["targetWeight"] });
        } else {
            if (data.targetWeight < 30) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Mínimo 30kg", path: ["targetWeight"] });

            if (data.targetWeight > 100) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Máximo 100kg", path: ["targetWeight"] });
        }

        if (data.weeksToGoal === "") {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Las semanas son requeridas", path: ["weeksToGoal"] });
        } else {
            if (data.weeksToGoal < 1) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Debe ser mínimo una semana", path: ["weeksToGoal"] });
        }
    }
});

export type StepToGoalType = z.infer<typeof stepGoalSchema>;
export type StepToGoalFormType =
    UseFormReturn<{
        goal: Goal;
        targetWeight: number | "";
        weeksToGoal: number | "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, any, undefined>