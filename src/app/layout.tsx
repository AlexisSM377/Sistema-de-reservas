import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/userContext";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],

});



export const metadata: Metadata = {
  title: "Gestion de Reservas ",
  description: "Gestion de Reservas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <UserProvider >

            {children}
          </UserProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
