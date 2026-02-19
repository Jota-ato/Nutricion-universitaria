import { UseFormReturn } from "react-hook-form";
import { StepActivityValues } from "../schemas";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ActivityFrequencyForm({ form }: { form: UseFormReturn<StepActivityValues> }) {
    const { errors } = form.formState;
    return (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4">
            <Field>
                <FieldLabel>Sesiones / semana</FieldLabel>
                <Input {...form.register("sessionsPerWeek")} type="number" placeholder="4" />
                {errors.sessionsPerWeek && <FieldError>{errors.sessionsPerWeek.message}</FieldError>}
            </Field>
            <Field>
                <FieldLabel>Minutos / sesión</FieldLabel>
                <Input {...form.register("durationPerSession")} type="number" placeholder="60" />
                {errors.durationPerSession && <FieldError>{errors.durationPerSession.message}</FieldError>}
            </Field>
        </div>
    );
}