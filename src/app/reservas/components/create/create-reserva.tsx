'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NuevaReserva() {
    const [espacios, setEspacios] = useState([])
    const [departamentos, setDepartamentos] = useState([])
    const [date, setDate] = useState<Date>()
    const [submitted, setSubmitted] = useState(false)
    const [folio, setFolio] = useState('')
    const [disponibilidad, setDisponibilidad] = useState([])
    const [conflicto, setConflicto] = useState(false)
    const [form, setForm] = useState({
        espacio: '',
        departamento: '',
        fecha: '',
        horaInicio: '',
        horaFin: '',
        descripcion: ''
    })

    const router = useRouter()

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/espacios', { credentials: 'include' })
            .then(res => res.json()).then(setEspacios)

        fetch(process.env.NEXT_PUBLIC_API_URL + '/departamentos', { credentials: 'include' })
            .then(res => res.json()).then(setDepartamentos)
    }, [])

    // Consultar disponibilidad
    useEffect(() => {
        if (form.espacio && form.fecha) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservas/disponibilidad?id_espacio=${form.espacio}&fecha=${form.fecha}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(setDisponibilidad)
                .catch(() => setDisponibilidad([]))
        }
    }, [form.espacio, form.fecha])

    // Validar conflicto
    useEffect(() => {
        if (!form.horaInicio || !form.horaFin || disponibilidad.length === 0) {
            setConflicto(false)
            return
        }

        const formatHora = (h) => h.slice(0, 5)

        const conflictoDetectado = disponibilidad.some(({ hora_inicio, hora_final }) => {
            const start = formatHora(form.horaInicio)
            const end = formatHora(form.horaFin)
            return (
                (start >= hora_inicio && start < hora_final) ||
                (end > hora_inicio && end <= hora_final) ||
                (start <= hora_inicio && end >= hora_final)
            )
        })

        setConflicto(conflictoDetectado)
    }, [form.horaInicio, form.horaFin, disponibilidad])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const resMe = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/me', {
            credentials: 'include'
        })

        const user = await resMe.json()
        const folioGenerado = `FOLIO-${Date.now()}`

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/reservas', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                folio_reserva: folioGenerado,
                fecha_reserva: form.fecha,
                hora_inicio: form.horaInicio,
                hora_final: form.horaFin,
                descripcion: form.descripcion,
                estado: 'Pendiente',
                id_usuario: user.id,
                id_espacio: form.espacio,
                id_departamento: form.departamento
            })
        })

        if (res.ok) {
            toast.success('Reserva exitosa')
            setFolio(folioGenerado)
            setSubmitted(true)
        } else {
            toast.error('Error al crear la reserva')
        }
    }

    if (submitted) {
        return (
            <div className="max-w-xl mx-auto mt-10">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">¡Reserva Solicitada!</CardTitle>
                        <CardDescription className="text-base">
                            Tu reserva ha sido enviada y está pendiente de aprobación.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-base mb-4">
                            Folio generado: <span className="font-mono px-2 py-1">{folio}</span>
                        </p>
                        <div className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => router.push('/me')}>Volver al inicio</Button>
                            <Link href="/reservas">
                                <Button>Ver mis reservas</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Nueva Reserva</CardTitle>
                <CardDescription>
                    Completa el formulario para crear una nueva espacio.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className='space-y-6'>
                    <div className='space-y-2'>
                        <Label htmlFor="espacio">Tipo de Espacio</Label>
                        <Select required onValueChange={(value) =>
                            setForm(prev => ({ ...prev, espacio: value }))
                        }>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Selecciona un espacio" />
                            </SelectTrigger>
                            <SelectContent>
                                {espacios.map(e => (
                                    <SelectItem key={e.id} value={e.id}>{e.nombre} - {e.capacidad} asistentes</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="departamento">Departamento</Label>
                        <Select required onValueChange={(value) =>
                            setForm(prev => ({ ...prev, departamento: value }))
                        }>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Selecciona un departamento" />
                            </SelectTrigger>
                            <SelectContent>
                                {departamentos.map(d => (
                                    <SelectItem key={d.id} value={d.id}>{d.nombre}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='space-y-2'>
                        <Label>Fecha</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(selectedDate) => {
                                        setDate(selectedDate)
                                        setForm(prev => ({ ...prev, fecha: format(selectedDate, 'yyyy-MM-dd') }))
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {form.espacio && form.fecha && disponibilidad.length > 0 && (
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p className="font-medium mt-2">Horarios ocupados:</p>
                            <ul className="list-disc ml-5">
                                {disponibilidad.map((bloque, index) => (
                                    <li key={index}>
                                        {bloque.hora_inicio.slice(0, 5)} - {bloque.hora_final.slice(0, 5)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {form.espacio && form.fecha && disponibilidad.length === 0 && (
                        <p className="text-sm text-green-700 mt-2">✅ El espacio está completamente disponible ese día.</p>
                    )}



                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className='space-y-2'>
                            <Label>Hora Inicio</Label>
                            <Input type="time" name="horaInicio" onChange={handleChange} value={form.horaInicio} required />
                        </div>
                        <div className='space-y-2'>
                            <Label>Hora Fin</Label>
                            <Input type="time" name="horaFin" onChange={handleChange} value={form.horaFin} required />
                        </div>
                    </div>

                    {conflicto && (
                        <p className="text-sm text-red-500 font-mono">
                            ❌ Este espacio ya está reservado en ese horario. Por favor elige otro.
                        </p>
                    )}

                    <div className='space-y-2'>
                        <Label>Descripción y Propósito</Label>
                        <Textarea
                            name="descripcion"
                            onChange={handleChange}
                            value={form.descripcion}
                            placeholder="Descripción (opcional)"
                            className="w-full"
                        />
                    </div>
                </CardContent>

                <CardFooter className='flex justify-between mt-3'>
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={conflicto}>
                        Solicitar Reserva
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
