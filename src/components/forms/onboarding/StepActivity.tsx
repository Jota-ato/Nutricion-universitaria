'use client'
import { useOnboardingStore } from "@/stores/useOnboardingStore"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"

function DetailTrainingInfo() {
    return (
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="dailySteps">
                    Sesiones / semana
                </FieldLabel>
                <Input
                    type="number"
                    id="number"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="dailySteps">
                    Duración por sesion
                </FieldLabel>
                <Input
                    type="number"
                    id="number"
                    placeholder="en minutos"
                />
            </Field>
        </FieldGroup>
    )
}

function OcupationForm() {
    return (
        <Field>
            <FieldLabel htmlFor="dailySteps">
                ¿Cómo es tu estilo de vida?
            </FieldLabel>
            <Select defaultValue="">
                <SelectTrigger>
                    <SelectValue placeholder="Sedentario, moderado o muy activo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem
                            value="sedentary"
                        >
                            Mayormente sentado - (ejem. Oficinista)
                        </SelectItem>
                        <SelectItem
                            value="light"
                        >
                            Ligeramente activo - (ejem. Estudiante, Maestro) 
                        </SelectItem>
                        <SelectItem
                            value="moderate"
                        >
                            Moderadamente activo - (ejem. Construcción, Mesero)
                        </SelectItem>
                        <SelectItem
                            value="heavy"
                        >
                            Muy activo - (ejem. Granjero, Minero)
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    )
}

function StepsForm() {
    return (
        <Field className="gap-1">
            <FieldLabel htmlFor="dailySteps">
                ¿Cuántos pasos das a diario?
            </FieldLabel>
            <FieldDescription className="mb-2">
                En caso de que no sepas da una aproximación, 1 paso ~0.0008km
            </FieldDescription>
            <Input
                type="number"
                id="number"
            />
        </Field>
    )
}

function ActivityTypeForm() {
    const [doesActivity, setDoesActivity] = useState(false);

    const handleChange = (value: string) => setDoesActivity(value === 'yes')

    return (
        <Field>
            <FieldLabel htmlFor="dailySteps">
                ¿Realizas ejercicio físico?
            </FieldLabel>
            <Select defaultValue="" onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Si/no" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem
                            value="yes"
                        >
                            Si
                        </SelectItem>
                        <SelectItem
                            value="no"
                        >
                            No
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {doesActivity && (
                <Field>
                    <FieldLabel>
                        ¿Cón qué intensidad realizas actividad?
                    </FieldLabel>
                    <Select defaultValue="">
                        <SelectTrigger>
                            <SelectValue placeholder="Alta, media o baja" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem
                                    value="low"
                                >
                                    Baja - (ejem. Caminata, Yoga ligero, Estiramientos)
                                </SelectItem>
                                <SelectItem
                                    value="medium"
                                >
                                    Media - (ejem. Ciclismo, Deportes recreativos, Trote)
                                </SelectItem>
                                <SelectItem
                                    value="high"
                                >
                                    Alta - (ejem. Pesas, HIIT, Deportes altamente competitivos)
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            )}
        </Field>
    )
}

export default function StepActivity() {
    const setStep = useOnboardingStore(state => state.setStep);
    const [localStep, setLocalStep] = useState(1);

    const handleClick = () => {
        if (localStep < 4) {
            setLocalStep(step => step + 1);
        } else {
            setStep(3);
        }
    }

    return (
        <FieldGroup className="gap-1">
            <FieldLegend>
                Ahora veamos que tan activo eres
            </FieldLegend>
            <FieldGroup>
                {localStep === 1 && <OcupationForm />}
                {localStep === 2 && <StepsForm />}
                {localStep === 3 && <ActivityTypeForm />}
                {localStep === 4 && <DetailTrainingInfo />}
                <Field>
                    <Button
                        onClick={handleClick}
                        className="cursor-pointer"
                    >
                        {localStep < 5 ? 'siguiente' : 'continuar'}
                    </Button>
                </Field>
            </FieldGroup>
        </FieldGroup>
    )
}