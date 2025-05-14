'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">
        Sistema de Reservas Coppel
      </h1>
      <Button onClick={() => router.push('/login')} className="cursor-pointer">
        Iniciar Sesión
      </Button>
    </div>
  );
}
