import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

export default function SignOut() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            const body = await res.json();
            console.log("Respuesta logout:", res.status, body);

            if (!res.ok) {
                throw new Error(body.error || "Error en el logout");
            }

            // Redirigir a la vista principal
            router.push("/");

            return body;
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <Button

            onClick={handleSignOut}

        >
            Cerrar sesión
        </Button>
    );
}