'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, FileSpreadsheet, HardHat, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'



export function ReservationList({ status }) {
    interface Reserva {
        id: string;
        descripcion?: string;
        fecha_reserva: string;
        folio_reserva: string;
        hora_inicio: string;
        hora_final: string;
        nombre: string;
        estado: string;
        nombre_espacio: string;
        nombre_departamento: string;
    }

    const [reservas, setReservas] = useState<Reserva[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas/mis-reservas`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                const filtradas = data.filter(r => r.estado.toLowerCase() === status)
                setReservas(filtradas)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [status])

    if (loading) return <p className="mt-4">Cargando reservas...</p>
    if (reservas.length === 0) return <p className="mt-4 text-muted-foreground">No tienes reservas {status}.</p>

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reservas.map(reserva => (
                <Card key={reserva.id}>
                    <CardHeader >

                        <CardTitle className="text-base">{reserva.descripcion || 'Reserva sin título'}</CardTitle>

                        <CardDescription>
                            {new Date(reserva.fecha_reserva).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-2'>
                            <div className='flex items-center text-sm'>
                                <FileSpreadsheet className='mr-2 h-4 w-4 text-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    {reserva.folio_reserva}
                                </span>
                            </div>
                            <div className='flex items-center text-sm'>
                                <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                                <span className='text-muted-foreground'>
                                    {new Date(`1970-01-01T${reserva.hora_inicio}`).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {new Date(`1970-01-01T${reserva.hora_final}`).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className="flex items-center text-sm">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{reserva.nombre_espacio}</span>
                            </div>

                            <div className="flex items-center text-sm">
                                <HardHat className="mr-2 h-4 w-4 text-muted-foreground" />

                                <span>{reserva.nombre_departamento}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent>
                        <span
                            className={cn(
                                "dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize border-[.5px] text-sm font-medium",
                                {
                                    "bg-blue-200 text-blue-600 border-blue-500": reserva.estado === "Pendiente",
                                    "bg-green-200 text-green-600 border-green-500": reserva.estado === "Aprobada",
                                    "bg-yellow-200 text-yellow-600 border-yellow-500": reserva.estado === "Rechazada",
                                    "bg-red-200 text-red-500 border-red-500": reserva.estado === "Cancelada",
                                }
                            )}
                        >
                            {reserva.estado}
                        </span>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
