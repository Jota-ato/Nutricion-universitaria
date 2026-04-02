'use client'
import { FieldGroup, FieldLegend } from "@/components/ui/field";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

/**
 * Uses supabase to sign in with google
 * @returns the registration component
 */
export default function RegistrationForm() {
    const calculatedStats = useOnboardingStore(state => state.calculatedStats);

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        });

        if (error) {
            console.error("Error al iniciar sesión:", error.message);
        }
    };

    return (
        <FieldGroup>
            <FieldLegend>
                Como último paso crea tu cuenta
            </FieldLegend>
            <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p>Tu metabolismo basal es: {calculatedStats.bmr} kcal/día</p>
                <p>Tu gasto energético total es: {calculatedStats.tdee} kcal/día</p>
                <p>Debes consumir: {calculatedStats.macros.calories} kcal/día</p>
                <p>Debes consumir: {calculatedStats.macros.protein}g de proteína</p>
                <p>Debes consumir: {calculatedStats.macros.carbs}g de carbohidratos</p>
                <p>Debes consumir: {calculatedStats.macros.fats}g de grasas</p>
            </div>

            <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full cursor-pointer"
                type="button"
            >
                Continuar con Google
            </Button>
        </FieldGroup>
    )
}