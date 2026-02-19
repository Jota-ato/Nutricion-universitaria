import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormType } from "../schemas"
import { Controller } from "react-hook-form"

export default function StepsForm({ form }: { form: FormType }) {
    return (
        <Controller
            name="dailySteps"
            control={form.control}
            render={({ field, fieldState }) => (
                <Field className="gap-1">
                    <FieldLabel htmlFor="dailySteps">
                        ¿Cuántos pasos das a diario?
                    </FieldLabel>
                    <FieldDescription className="mb-2">
                        En caso de que no sepas da una aproximación, 1 paso ~0.0008km
                    </FieldDescription>
                    <Input
                        {...field}
                        type="number"
                        id="number"
                        placeholder="Ejem. 8000"
                        aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                        <FieldError>
                            {fieldState.error.message}
                        </FieldError>
                    )}
                </Field>
            )}
        />
    )
}