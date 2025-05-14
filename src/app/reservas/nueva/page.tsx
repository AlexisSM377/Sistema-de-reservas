
import Link from "next/link";
import NuevaReserva from "../components/create/create-reserva";
import { ArrowLeft } from "lucide-react";

export default function CreateReserva() {
    return (
        <div className="container max-w-3xl py-10 mx-auto px-2 lg:px-0">
            <div className="mb-6 space-y-4">
                <Link href="/reservas" className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a mis reservas
                </Link>
                <NuevaReserva />
            </div>
        </div>
    )
}