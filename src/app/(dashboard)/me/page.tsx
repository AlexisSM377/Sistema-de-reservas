'use client'
import Header from "@/components/header"
import SignOut from "@/components/signOut"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useUser } from "@/context/userContext"
import { ArrowRight, CalendarDays, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function MePage() {


    const { user, loading } = useUser()

    if (loading) return <p className="text-sm opacity-80 text-center mt-30">Cargando usuario...</p>


    return (
        <main>
            <Header />
            <div className="container flex items-center justify-between py-4 max-w-4xl mx-auto">
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
            </div>
            <div className="flex flex-col items-center justify-center p-4 mt-30">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Reserva Rápida</CardTitle>
                        <CardDescription>Crea una nueva reserva de espacio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="flex items-center gap-4">
                                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">Disponibilidad Inmediata</p>
                                    <p className="text-sm text-muted-foreground">Encuentra espacios disponibles ahora</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">Reserva Anticipada</p>
                                    <p className="text-sm text-muted-foreground">Planifica tus reuniones con tiempo</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Users className="h-5 w-5 text-muted-foreground" />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">Espacios para Equipos</p>
                                    <p className="text-sm text-muted-foreground">Salas para diferentes tamaños de grupos</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href="/reservas/nueva" className="w-full">
                            <Button className="w-full">
                                Crear Nueva Reserva
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}