'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { ConfirmDialog } from './dialogEstado'


interface Reserva {
    id: number
    folio_reserva: string
    nombre_usuario: string
    nombre_espacio: string
    fecha_reserva: string
    hora_inicio: string
    hora_final: string
    estado: string
}
export default function AdminReservasTable() {
    const [reservas, setReservas] = useState<Reserva[]>([])
    const [loading, setLoading] = useState(false)
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null)
    const [historial, setHistorial] = useState([])
    const [mostrarHistorial, setMostrarHistorial] = useState(false)

    const fetchReservas = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas`, {
            credentials: 'include'
        })
        const data = await res.json()
        setReservas(data)
    }

    useEffect(() => {
        fetchReservas()
    }, [])

    const actualizarEstado = async (id, nuevoEstado) => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas/${id}/estado`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ estado: nuevoEstado })
            })

            if (res.ok) {
                toast.success(`Reserva ${nuevoEstado.toLowerCase()} correctamente`)
                fetchReservas()
            } else {
                toast.error('Error al actualizar la reserva')
            }
        } catch (err) {
            toast.error('Error del servidor')
        } finally {
            setLoading(false)
        }
    }

    const cancelarReserva = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (res.ok) {
                toast.success('Reserva cancelada')
                fetchReservas()
            } else {
                toast.error('No se pudo cancelar la reserva')
            }
        } catch (err) {
            toast.error('Error al cancelar')
        } finally {
            setLoading(false)
        }
    }

    const verHistorial = async (id_reserva) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/historial/${id_reserva}`, {
            credentials: 'include'
        })
        const data = await res.json()
        setHistorial(data)
        setMostrarHistorial(true)
    }



    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Todas las reservas</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="overflow-hidden rounded-md border py-2">
                    <TableCaption>
                        Lista de todas las reservas realizadas por los usuarios. Puedes ver el estado de cada reserva y su información.
                    </TableCaption>
                    <TableHeader>
                        <TableRow >
                            <TableHead>Folio</TableHead>
                            <TableHead>Usuario</TableHead>
                            <TableHead>Espacio</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Horario</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                            <TableHead >
                                Historial
                            </TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservas.map((r) => (
                            <TableRow key={r.id} >
                                <TableCell>{r.folio_reserva}</TableCell>
                                <TableCell>{r.nombre_usuario}</TableCell>
                                <TableCell>{r.nombre_espacio}</TableCell>
                                <TableCell>{format(new Date(r.fecha_reserva), "PPP", { locale: es })}</TableCell>
                                <TableCell>{r.hora_inicio} - {r.hora_final}</TableCell>
                                <TableCell >
                                    <span
                                        className={cn(
                                            "dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize border-[.5px] text-sm",
                                            {
                                                "bg-blue-200 text-blue-600 border-blue-500": r.estado === "Pendiente",
                                                "bg-green-200 text-green-600 border-green-500": r.estado === "Aprobada",
                                                "bg-yellow-200 text-yellow-600 border-yellow-500": r.estado === "Rechazada",
                                                "bg-red-200 text-red-500 border-red-500": r.estado === "Cancelada",
                                            }
                                        )}
                                    >
                                        {r.estado}
                                    </span>

                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    {r.estado === 'Pendiente' && (
                                        <>
                                            <ConfirmDialog
                                                title="Aprobar reserva"
                                                description="¿Estás seguro que deseas aprobar esta reserva?"
                                                onConfirm={() => actualizarEstado(r.id, 'Aprobada')}
                                            >
                                                <Button variant="outline" size="sm">Aprobar</Button>
                                            </ConfirmDialog>
                                            <ConfirmDialog
                                                title="Rechazar reserva"
                                                description="Esta acción no se puede deshacer. ¿Deseas continuar?"
                                                onConfirm={() => actualizarEstado(r.id, 'Rechazada')}
                                            >
                                                <Button variant="destructive" size="sm">Rechazar</Button>
                                            </ConfirmDialog>

                                        </>
                                    )}
                                    {r.estado !== 'Cancelada' && (
                                        <ConfirmDialog
                                            title="Cancelar reserva"
                                            description="¿Estás seguro que deseas cancelar esta reserva?"
                                            onConfirm={() => cancelarReserva(r.id)}
                                        >
                                            <Button variant="destructive" size="sm">Cancelar</Button>
                                        </ConfirmDialog>
                                    )}
                                </TableCell>
                                <TableCell >
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => {
                                            setReservaSeleccionada(r)
                                            verHistorial(r.id)
                                        }}
                                    >
                                        Ver historial
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog open={mostrarHistorial} onOpenChange={setMostrarHistorial}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Historial de cambios</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            {reservaSeleccionada && (
                                <p className="text-sm text-muted-foreground">
                                    Reserva: <span className="font-mono">{reservaSeleccionada.folio_reserva}</span>
                                </p>
                            )}

                            {historial.length === 0 ? (
                                <p className="text-sm text-gray-500">Sin historial registrado.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {historial.map((h, index) => (
                                        <li key={index} className="text-sm">
                                            <span className="font-semibold">{h.accion_realizada}</span> – por <strong>{h.nombre_usuario}</strong><br />
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(h.fecha_cambio).toLocaleString('es-ES')}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

            </CardContent>
        </Card>
    )
}
