import { Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6" />
                    <h1 className="text-xl font-bold">Reservas Coppel</h1>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/me" className="text-sm font-medium">
                        Inicio
                    </Link>
                    <Link href="/reservas" className="text-sm font-medium">
                        Mis Reservas
                    </Link>
                </nav>
                <div className="flex items-center gap-4">

                    <Link href="/reservas/nueva">
                        <Button size="sm">Nueva Reserva</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}