import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development", // Desactivar en desarrollo para evitar problemas de caché
    register: true,
});

const nextConfig: NextConfig = {
    /* tus otras opciones de configuración aquí */
};

export default withPWA(nextConfig);