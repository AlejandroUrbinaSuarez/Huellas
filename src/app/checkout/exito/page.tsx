'use client';

import { useCartStore } from "@/store/cartStore";
import { CheckCircle, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
    const [mounted, setMounted] = useState(false);
    const [lastCartSize, setLastCartSize] = useState(0);

    useEffect(() => {
        // Leemos el tamaño del carrito antes de que la página anterior lo limpiara
        // (O la lógica de Zustand lo mantenga vacío). En el flujo real, Zustand
        // clearCart se invoca *antes* del push, por lo que aquí leemos 0 si no lo 
        // pasamos por query params. Para propósitos visuales MVP, usaremos un número
        // calculado aleatoriamente si el carrito está en 0 para demostrar la UI.
        const urlParams = new URLSearchParams(window.location.search);
        const donatedFromUrl = urlParams.get('donated');

        setLastCartSize(donatedFromUrl ? Number(donatedFromUrl) : 1);
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-brand-50 flex items-center justify-center">
            <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

                {/* Animated Check */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                        <CheckCircle className="w-24 h-24 text-green-500 relative z-10 bg-white rounded-full p-2 shadow-sm" />
                    </div>
                </div>

                <h1 className="text-4xl font-black text-brand-900 mb-4">
                    ¡Gracias por tu compra!
                </h1>
                <p className="text-xl text-brand-600 font-medium">
                    Tu pago simulado ha sido procesado exitosamente y tu pedido ya está siendo preparado.
                </p>

                {/* Impact Summary Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-brand-100 relative overflow-hidden mt-12 mb-12">
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <HeartHandshake className="w-64 h-64 text-accent" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <span className="bg-accent/10 text-accent font-bold px-4 py-1.5 rounded-full text-sm tracking-wider uppercase mb-6">
                            Impacto Generado
                        </span>

                        <p className="text-brand-800 text-lg mb-6">
                            Con esta compra, acabas de financiar directamente la donación de:
                        </p>

                        <div className="flex items-center justify-center gap-4 text-5xl font-black text-accent">
                            <span className="text-5xl font-black text-accent">{lastCartSize}</span>
                            <span className="text-2xl text-brand-900 mt-2">Pares de Zapatos</span>
                        </div>

                        <p className="text-brand-500 text-sm mt-6">
                            Estos zapatos serán entregados a comunidades vulnerables en nuestra próxima campaña. Te enviaremos fotos del impacto a tu correo.
                        </p>
                    </div>
                </div>

                {/* Next actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/catalogo"
                        className="inline-flex items-center justify-center bg-brand-900 hover:bg-brand-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
                    >
                        Seguir explorando
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-brand-100 hover:bg-brand-200 text-brand-900 font-bold py-4 px-8 rounded-xl transition-colors"
                    >
                        Volver al Inicio
                    </Link>
                </div>

            </div>
        </div>
    );
}
