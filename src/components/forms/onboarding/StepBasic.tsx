'use client'
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { stepBasicSchema, type StepBasicValues } from "../schemas"
import { useOnboardingStore } from "@/stores/useOnboardingStore"

export default function StepBasic() {

    const { formData, updateFormData, setStep } = useOnboardingStore();
    const form = useForm<StepBasicValues>({
        resolver: zodResolver(stepBasicSchema),
        defaultValues: formData.basicData,
        mode: "onChange"
    });
    const errors = form.formState.errors;

    const onNextStep = (data: StepBasicValues) => {
        updateFormData({basicData: {name: data.name, age: data.age, height: data.height, weight: data.weight}});
        setStep(2);
    };

    return (
        <FieldGroup>
            <FieldLegend>
                Cuentanos un poco más de ti
            </FieldLegend>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">
                        Nombre
                    </FieldLabel>
                    <Input
                        {...form.register("name")}
                        type="text"
                        id="name"
                    />
                    {errors.name && (
                        <FieldError>El nombre es requerido</FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="age">
                        Edad
                    </FieldLabel>
                    <Input
                        {...form.register("age")}
                        type="number"
                        id="age"
                    />
                    {errors.age && (
                        <FieldError>Edad mínima 12 años</FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="height">
                        Altura
                    </FieldLabel>
                    <Input
                        {...form.register("height")}
                        type="number"
                        id="height"
                    />
                    {errors.height && (
                        <FieldError>Altura mínima 100cm</FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="weight">
                        Peso
                    </FieldLabel>
                    <Input
                        {...form.register("weight")}
                        type="number"
                        id="weight"
                    />
                    {errors.weight && (
                        <FieldError>Peso mínimo 30kg</FieldError>
                    )}
                </Field>
                <FieldSeparator />
                <Field>
                    <Button
                        className="cursor-pointer"
                        onClick={form.handleSubmit(onNextStep)}
                        type="button"
                    >
                        Continuar
                    </Button>
                </Field>
            </FieldGroup>
        </FieldGroup>
    )
}