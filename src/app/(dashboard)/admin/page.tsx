'use client'
import SignOut from "@/components/signOut"
import AdminReservasTable from "@/components/table-reservas"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useUser } from "@/context/userContext"


export default function AdminPage() {
    const { user, loading } = useUser()

    if (loading) return <p>Cargando usuario...</p>

    return (


        <div className="container py-8 mx-auto max-w-7xl spcae-y-4">
            <header className="flex items-center justify-between mb-4">

                <div className="flex  flex-col gap-2">

                    <h1 className="text-2xl font-bold">Hola, {user.nombre || 'Sin nombre'}</h1>
                    <p className="font-bold opacity-60">Rol: {user.rol}</p>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                            Opciones
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                        <SignOut />
                    </PopoverContent>
                </Popover>
            </header>
            <AdminReservasTable />
        </div>
    )
}