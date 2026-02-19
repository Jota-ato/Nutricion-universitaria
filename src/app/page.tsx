import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1>Nutricion Universitaria</h1>
            <Button>
                <Link
                    href={'/registro'}
                >
                    Registrarse
                </Link>
            </Button>
        </div>
    );
}
