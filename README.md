

---


```md
# 💻 Frontend - Sistema de Reservas

Este es el frontend del sistema de reservas, construido con **Next.js**, **TailwindCSS**, y gestionado a través de roles de usuario (Empleado y Administrador).

---

## 🚀 Tecnologías utilizadas

- Next.js (App Router)
- TailwindCSS
- shadcn/ui (UI moderna)
- Fetch API con cookies
- Autenticación basada en sesión (JWT + cookies)

---

## ⚙️ Configuración inicial
1. Clona el repositorio:
   ```bash
   git clone https://github.com/AlexisSM377/Sistema-de-reservas.git
   
   cd Sistema-de-reservas
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Configura las variables de entorno:
   - Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:
     ```bash
     NEXT_PUBLIC_API_URL=http://localhost:4000/api
     ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 🧾 Funcionalidades principales
👤 Empleado
    Crear reservas

    Visualizar horarios ocupados

    Ver disponibilidad en tiempo real

    Ver estado de sus reservas

🛠 Administrador
    Ver todas las reservas en tabla

    Aprobar, Rechazar, Cancelar

    Ver historial de cambios

    Ver información detallada por reserva