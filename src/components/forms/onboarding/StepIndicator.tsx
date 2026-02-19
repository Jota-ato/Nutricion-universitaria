'use client'
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { motion } from "framer-motion";

export default function StepIndicator() {
    const step = useOnboardingStore(state => state.step);
    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span>Paso {step} de {totalSteps}</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
        </div>
    );
}