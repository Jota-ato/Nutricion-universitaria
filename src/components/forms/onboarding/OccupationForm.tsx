import { UseFormReturn } from "react-hook-form";
import { StepActivityValues } from "../schemas";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OccupationForm({ form }: { form: UseFormReturn<StepActivityValues> }) {
    const { errors } = form.formState;

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <Field>
                <FieldLabel>Tipo de Ocupación</FieldLabel>
                <Select
                    onValueChange={(val) => form.setValue("occupation", val)}
                    defaultValue={form.getValues("occupation")}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="¿Qué haces la mayor parte del día?" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sedentary">Sentado (Estudiante / Oficina)</SelectItem>
                        <SelectItem value="light_effort">De pie / Caminata ligera (Ventas / Maestro)</SelectItem>
                        <SelectItem value="moderate_effort">Movimiento constante (Mesero / Entrega)</SelectItem>
                        <SelectItem value="heavy_effort">Esfuerzo físico intenso (Construcción / Carga)</SelectItem>
                    </SelectContent>
                </Select>
                {errors.occupation && <FieldError>{errors.occupation.message}</FieldError>}
            </Field>

            <Field>
                <FieldLabel>Pasos diarios promedio</FieldLabel>
                <Input
                    {...form.register("dailySteps")}
                    type="number"
                    placeholder="Ej. 8000. 1 paso ~ 0.0008km"
                />
                {errors.dailySteps && <FieldError>{errors.dailySteps.message}</FieldError>}
            </Field>
        </div>
    );
}