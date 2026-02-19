'use client'
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { StepActivity, StepBasics, StepGoals } from ".";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import StepIndicator from "./StepIndicator";

export default function OnBoardingForm() {
    const step = useOnboardingStore(state => state.step);

    // Variantes para la animación de deslizamiento
    const variants = {
        enter: { x: 20, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 }
    };

    return (
        // Añadimos overflow-hidden para que el contenido no "se salga" del borde al deslizar
        <Card className="px-4 max-w-480 w-[90%] mx-auto overflow-hidden"> 
            <StepIndicator/>
            <form onSubmit={e => e.preventDefault()}>
                <fieldset className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step} // Clave vital para que Framer sepa qué paso animar
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                        >
                            {step === 1 && <StepBasics />}
                            {step === 2 && <StepActivity />}
                            {step === 3 && <StepGoals />}
                        </motion.div>
                    </AnimatePresence>
                </fieldset>
            </form>
        </Card>
    )
}