import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { StepToGoalFormType } from "../../schemas"
import { Controller } from "react-hook-form"

export default function GoalDetail({ form }: { form: StepToGoalFormType }) {
    return (
        <FieldGroup>
            <Controller
                name="targetWeight"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field className="gap-1">
                        <FieldLabel htmlFor="targetWeight">
                            ¿Cuál es tu peso objetivo?
                        </FieldLabel>
                        <Input
                            {...field}
                            type="number"
                            id="targetWeight"
                            placeholder="en kg"
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

            <Controller
                name="weeksToGoal"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field className="gap-1">
                        <FieldLabel htmlFor="weeksToGoal">
                            ¿Cuánto quieres tardar en semanas?
                        </FieldLabel>
                        <Input
                            {...field}
                            type="number"
                            placeholder="ejem. 6 semanas"
                            id="weeksToGoal"
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
        </FieldGroup>
    )
}