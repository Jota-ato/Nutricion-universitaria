import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { FormType } from "../schemas"

export default function DetailTrainingInfo({ form }: { form: FormType }) {
    const { register, formState: { errors } } = form;

    return (
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="sessionsPerWeek">
                    Sesiones / semana
                </FieldLabel>
                <Input
                    type="number"
                    id="sessionsPerWeek"
                    {...register("sessionsPerWeek")}
                />
                {errors.sessionsPerWeek && (
                    <FieldError>{errors.sessionsPerWeek.message}</FieldError>
                )}
            </Field>
            <Field>
                <FieldLabel htmlFor="durationPerSession">
                    Duración por sesión
                </FieldLabel>
                <Input
                    type="number"
                    id="durationPerSession"
                    placeholder="en minutos"
                    {...register("durationPerSession")}
                />
                {errors.durationPerSession && (
                    <FieldError>{errors.durationPerSession.message}</FieldError>
                )}
            </Field>
        </FieldGroup>
    )
}