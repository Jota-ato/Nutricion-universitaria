'use client'
import { useEffect, useState } from "react";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { supabase } from "@/lib/supabase";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
    const { formData } = useOnboardingStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const syncProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            // Si hay datos en el store y el usuario ya se logueó
            if (user && formData.basicData.name) {
                await fetch('/api/user/setup', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: user.id,
                        profileData: formData.basicData
                    })
                });
                // Opcional: Limpiar el store o marcar como completado
            }
            setLoading(false);
        };

        syncProfile();
    }, [formData]);

    if (loading) return <Spinner />;

    return (
        <div>
            <h1>¡Bienvenido, {formData.basicData.name}!</h1>
            {/* Contenido del dashboard */}
        </div>
    );
}