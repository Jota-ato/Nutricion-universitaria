import { z } from 'zod';

export const stepBasicSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    age: z.coerce.number().min(12, "Debes tener al menos 12 años").max(100),
    height: z.coerce.number().min(100, "Altura mínima 100cm").max(250),
    weight: z.coerce.number().min(30, "Peso mínimo 30kg").max(300),
})

export type StepBasicValues = z.infer<typeof stepBasicSchema>