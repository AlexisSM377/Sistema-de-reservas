import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { ReservationList } from "./components/reservationList";

export default function Page() {
    return (
        <div className="container py-10 max-w-4xl mx-auto px-2 lg:px-0">
            <Link href="/me" className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
            </Link>
            <div className="mb-6 flex items-center justify-between mt-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold tracking-tight">Mis Reservas</h1>
                </div>
                <Link href="/reservas/nueva">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Reserva
                    </Button>
                </Link>
            </div>

            <Tabs defaultValue="pendiente" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="pendiente">Pendiente</TabsTrigger>
                    <TabsTrigger value="aprobada">Aprobada</TabsTrigger>
                    <TabsTrigger value="rechazada">Rechazada</TabsTrigger>
                    <TabsTrigger value="cancelada">Cancelada</TabsTrigger>
                </TabsList>
                <TabsContent value="pendiente" className="mt-6">
                    <ReservationList status="pendiente" />
                </TabsContent>
                <TabsContent value="aprobada" className="mt-6">
                    <ReservationList status="aprobada" />
                </TabsContent>
                <TabsContent value="rechazada" className="mt-6">

                    <ReservationList status="rechazada" />
                </TabsContent>
                <TabsContent value="cancelada" className="mt-6">
                    <ReservationList status="cancelada" />
                </TabsContent>
            </Tabs>
        </div>
    )
}