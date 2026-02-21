'use client';

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
    const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Evitar problemas de hidratación de Next.js
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Fondo oscuro overlay */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-brand-900/50 z-40 transition-opacity backdrop-blur-sm"
                    onClick={() => setIsCartOpen(false)}
                />
            )}

            {/* Panel lateral */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Cabecera */}
                <div className="flex items-center justify-between p-6 border-b border-brand-100">
                    <h2 className="text-xl font-bold flex items-center text-brand-900">
                        <ShoppingBag className="w-5 h-5 mr-2 text-accent" />
                        Tu Carrito Solidario
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 text-brand-400 hover:text-brand-900 transition-colors rounded-full hover:bg-brand-50"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Lista de Productos */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-brand-500 space-y-4">
                            <ShoppingBag className="w-16 h-16 text-brand-200" />
                            <p>Tu carrito está vacío.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-accent font-medium hover:underline"
                            >
                                Continuar explorando
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 border border-brand-100 rounded-2xl bg-brand-50/50">
                                {/* Imagen mini */}
                                <div className="w-20 h-20 bg-white rounded-xl flex-shrink-0 border border-brand-100 overflow-hidden relative">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-brand-300">Img</div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-brand-900 text-sm line-clamp-1">{item.name}</h3>
                                        <p className="text-accent font-extrabold mt-1">${Number(item.price).toFixed(2)}</p>
                                    </div>

                                    {/* Controles */}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-brand-200 rounded-lg bg-white">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 text-brand-500 hover:text-brand-900 hover:bg-brand-50 rounded-l-lg transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="px-3 text-sm font-medium text-brand-900 min-w-[32px] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 text-brand-500 hover:text-brand-900 hover:bg-brand-50 rounded-r-lg transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-brand-300 hover:text-red-500 p-1 transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="border-t border-brand-100 p-6 bg-brand-50/30">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-brand-600 font-medium">Subtotal</span>
                            <span className="text-2xl font-extrabold text-brand-900">
                                ${getTotalPrice().toFixed(2)}
                            </span>
                        </div>
                        <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full">
                            <button className="w-full bg-brand-900 hover:bg-brand-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:shadow-brand-900/20 active:scale-[0.98]">
                                Proceder al Pago
                            </button>
                        </Link>
                        <p className="text-center text-xs text-brand-500 mt-4">
                            Con esta compra financiarás la donación de {Math.floor(useCartStore.getState().getTotalItems() / 2) || "menos de 1"} pares de calzado.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
