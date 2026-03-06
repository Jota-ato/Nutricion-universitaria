'use client'
import {
    FieldGroup,
    FieldLegend
} from "@/components/ui/field";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function RegistrationForm() {

    const calculatedStats = useOnboardingStore(state => state.calculatedStats);

    return (
        <FieldGroup>
            <FieldLegend>
                Como último paso crea tu cuenta
            </FieldLegend>
            <p>Tu metabolismo basal es: {calculatedStats.bmr}kcal/día</p>
            <p>Debes consumir: {calculatedStats.macros.calories}kcal/día</p>
            <p>Debes consumir: {calculatedStats.macros.protein}g de proteína</p>
            <p>Debes consumir: {calculatedStats.macros.carbs}g de carbohidratos</p>
            <p>Debes consumir: {calculatedStats.macros.fats}g de grasas</p>
        </FieldGroup>
    )
}