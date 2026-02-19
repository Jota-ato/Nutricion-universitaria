import {
    Field,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Controller } from "react-hook-form"
import type { FormType } from "../schemas"

export default function OcupationForm({ form }: { form: FormType }) {
    return (
        <Controller
            name="occupation"
            control={form.control}
            render={({ field, fieldState }) => (
                <Field>
                    <FieldLabel htmlFor="occupation">
                        ¿Cómo es tu estilo de vida?
                    </FieldLabel>
                    <Select
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger id="occupation" onBlur={field.onBlur}>
                            <SelectValue placeholder="Sedentario, moderado o muy activo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="sedentary">
                                    Mayormente sentado - (ejem. Oficinista)
                                </SelectItem>
                                <SelectItem value="light">
                                    Ligeramente activo - (ejem. Estudiante, Maestro)
                                </SelectItem>
                                <SelectItem value="moderate">
                                    Moderadamente activo - (ejem. Construcción, Mesero)
                                </SelectItem>
                                <SelectItem value="heavy">
                                    Muy activo - (ejem. Granjero, Minero)
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {fieldState.error && (
                        <FieldError>
                            Selecciona una ocupación
                        </FieldError>
                    )}
                </Field>
            )}
        />
    )
}