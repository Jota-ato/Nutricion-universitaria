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
import type { StepToGoalFormType } from "../../schemas"

export default function OcupationForm({ form }: { form: StepToGoalFormType }) {
    return (
        <Controller
            name="goal"
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
                        <SelectTrigger id="goal" onBlur={field.onBlur}>
                            <SelectValue placeholder="Perder peso - Mantener peso - Ganar peso" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="loss">
                                    Perder peso
                                </SelectItem>
                                <SelectItem value="maintenance">
                                    Mantener peso
                                </SelectItem>
                                <SelectItem value="gain">
                                    Ganar peso
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {fieldState.error && (
                        <FieldError>
                            Selecciona un objetivo
                        </FieldError>
                    )}
                </Field>
            )}
        />
    )
}