import { Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="sticky top-0 z-10 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-2">
                    <Building2 className="h-6 w-6" />
                    <h1 className="text-xl font-bold">Reservas Coppel</h1>
                </div>
                <nav className="flex items-center gap-6">
                    <Link href="/me" className="text-sm font-medium hidden md:inline">
                        Inicio
                    </Link>
                    <Link href="/reservas" className="text-sm font-medium hidden md:inline">
                        Mis Reservas
                    </Link>
                    <div className="md:hidden">
                        <button
                            className="text-sm font-medium"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            Menú
                        </button>
                        {menuOpen && (
                            <div className="absolute top-16 right-28 bg-black shadow-md rounded-md p-4">
                                <Link href="/me" className="block text-sm font-medium mb-2">
                                    Inicio
                                </Link>
                                <Link href="/reservas" className="block text-sm font-medium">
                                    Mis Reservas
                                </Link>
                            </div>
                        )}
                    </div>
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