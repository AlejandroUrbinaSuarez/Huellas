'use client';

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { processCheckout } from "@/app/actions/checkout";
import { ChevronLeft, Lock } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart, getTotalItems } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: ""
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        setIsProcessing(true);

        try {
            // 1. Call the Server Action
            const result = await processCheckout(
                items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                formData,
                getTotalPrice()
            );

            if (result.success) {
                // 2. Clear local cart
                clearCart();
                // 3. Redirect to success page
                router.push("/checkout/exito");
            } else {
                alert("Hubo un error al procesar tu pago simulado.");
                setIsProcessing(false);
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión.");
            setIsProcessing(false);
        }
    };

    if (!mounted) return null;

    // Si recargan la página con el carrito vacío
    if (items.length === 0 && !isProcessing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-brand-50 pt-20">
                <h1 className="text-2xl font-bold text-brand-900 mb-4">Tu carrito está vacío</h1>
                <Link href="/catalogo" className="text-accent underline">
                    Volver al catálogo para agregar productos
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen bg-brand-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <Link href="/catalogo" className="inline-flex items-center text-brand-500 hover:text-brand-900 transition-colors font-medium">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Volver a la tienda
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Checkout Form */}
                    <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-brand-100">
                        <h1 className="text-3xl font-black text-brand-900 mb-2">Finalizar Compra</h1>
                        <p className="text-brand-600 mb-8">
                            Estás a un paso de llevarte {getTotalItems()} pares increíbles y donar {Math.floor(getTotalItems() / 2) || "esperanza"} a quien más lo necesita.
                        </p>

                        <form onSubmit={handleCheckout} className="space-y-6">

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-brand-900 border-b border-brand-100 pb-2">Datos de Envío</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-brand-700">Nombre Completo</label>
                                        <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border border-brand-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent outline-none" placeholder="Ej: Maria Perez" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-brand-700">Correo Electrónico</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-brand-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent outline-none" placeholder="correo@ejemplo.com" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-brand-700">Dirección de entrega</label>
                                    <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-brand-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent outline-none" placeholder="Calle 123, Depto 4" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-brand-700">Ciudad</label>
                                    <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-brand-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent outline-none" placeholder="Bogotá" />
                                </div>
                            </div>

                            <div className="space-y-4 pt-6">
                                <h3 className="text-xl font-bold text-brand-900 border-b border-brand-100 pb-2 flex items-center gap-2">
                                    Pago Seguro <Lock className="w-4 h-4 text-brand-400" />
                                </h3>
                                <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 text-sm text-brand-600 mb-6">
                                    <p><strong>Modo MVP:</strong> No necesitas ingresar tarjeta. Al dar click en Pagar, simularemos una transacción exitosa para probar la conexión con la base de datos.</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-brand-900 hover:bg-brand-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Procesando Donación y Pago...' : `Pagar $${getTotalPrice().toFixed(2)}`}
                            </button>

                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-brand-900 text-white p-8 rounded-3xl sticky top-24 shadow-2xl">
                            <h3 className="text-2xl font-bold mb-6 border-b border-brand-700 pb-4">Resumen del Pedido</h3>

                            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                                            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm line-clamp-2">{item.name}</h4>
                                            <p className="text-brand-300 text-xs mt-1">Cantidad: {item.quantity}</p>
                                        </div>
                                        <div className="font-bold text-accent">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-brand-700">
                                <div className="flex justify-between text-brand-300">
                                    <span>Subtotal</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-brand-300">
                                    <span>Envío (Solidario)</span>
                                    <span>Gratis</span>
                                </div>
                                <div className="flex justify-between text-xl font-black pt-4">
                                    <span>Total</span>
                                    <span className="text-accent">${getTotalPrice().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
