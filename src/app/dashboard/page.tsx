'use client'
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <div>
            <Button
                onClick={() => {
                    localStorage.removeItem('onboarding-storage');
                    window.location.href = '/';
                }}
                variant="destructive"
                className="w-full mt-2 cursor-pointer"
            >
                Reiniciar formulario (Modo Dev)
            </Button>
        </div>
    )
}