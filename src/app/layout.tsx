import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Huellas Humanitarias | Compra 2, Donamos 1",
  description: "Tienda de calzado solidaria donde tus compras se convierten en apoyo para personas víctimas de desplazamiento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased bg-brand-50 text-foreground min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
