'use client'

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
    children: React.ReactNode
    onConfirm: () => void
    title: string
    description: string
}

export function ConfirmDialog({ children, onConfirm, title, description }: ConfirmDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">{description}</p>
                <DialogFooter className="mt-4">
                    <Button onClick={onConfirm} variant="destructive">Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
