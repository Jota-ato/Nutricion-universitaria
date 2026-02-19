'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Field,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import { Controller } from "react-hook-form"
import type { FormType } from "../schemas";

export default function ActivityTypeForm({ form }: { form: FormType }) {
    const doesActivity = form.watch("hasActivity");

    return (
        <>
            <Controller
                name="hasActivity"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel htmlFor="hasActivity">
                            ¿Realizas ejercicio físico?
                        </FieldLabel>
                        <Select
                            value={field.value ? "yes" : "no"}
                            onValueChange={(value) => field.onChange(value === "yes")}
                        >
                            <SelectTrigger id="hasActivity" onBlur={field.onBlur}>
                                <SelectValue placeholder="Si/no" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="yes">Si</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {fieldState.error && (
                            <FieldError>
                                {fieldState.error.message ?? "Selecciona una opción"}
                            </FieldError>
                        )}
                    </Field>
                )}
            />

            {doesActivity && (
                <Controller
                    name="trainingIntensity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel htmlFor="trainingIntensity">
                                ¿Con qué intensidad realizas actividad?
                            </FieldLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger id="trainingIntensity" onBlur={field.onBlur}>
                                    <SelectValue placeholder="Alta, media o baja" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="low">
                                            Baja - (ejem. Caminata, Yoga ligero, Estiramientos)
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            Media - (ejem. Ciclismo, Deportes recreativos, Trote)
                                        </SelectItem>
                                        <SelectItem value="high">
                                            Alta - (ejem. Pesas, HIIT, Deportes altamente competitivos)
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {fieldState.error && (
                                <FieldError>
                                    {fieldState.error.message ?? "Selecciona una intensidad"}
                                </FieldError>
                            )}
                        </Field>
                    )}
                />
            )}
        </>
    )
}