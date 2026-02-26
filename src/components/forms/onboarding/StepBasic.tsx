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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { stepBasicSchema, type StepBasicValues } from "../schemas"
import { useOnboardingStore } from "@/stores/useOnboardingStore"
import { Sex } from "@/features/calc"

export default function StepBasic() {

    const { updateFormData, setStep } = useOnboardingStore();
    const form = useForm<StepBasicValues>({
        resolver: zodResolver(stepBasicSchema),
        defaultValues: {
            name: "",
            age: "",
            height: "",
            weight: "",
            sex: "" as Sex
        },
        mode: "onChange"
    });
    const errors = form.formState.errors;

    const onNextStep = (data: StepBasicValues) => {
        updateFormData({ basicData: data });
        setStep(2);
    };

    return (
        <FieldGroup>
            <FieldLegend className="mb-0 text-primary">
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
                        placeholder="Nombre"
                    />
                    {errors.name && (
                        <FieldError>El nombre es requerido</FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="sex">Sexo</FieldLabel>
                    <Controller
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger id="sex" className="w-full">
                                    <SelectValue placeholder="Selecciona tu sexo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Masculino</SelectItem>
                                    <SelectItem value="female">Femenino</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.sex && (
                        <FieldError>{errors.sex.message}</FieldError>
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
                        placeholder="Edad"
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
                        placeholder="Altura en cm"
                    />
                    {errors.height && (
                        <FieldError>Altura min 100cm y max 250cm</FieldError>
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
                        placeholder="Peso en kg"
                    />
                    {errors.weight && (
                        <FieldError>Peso min. 30kg y max. 300kg</FieldError>
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