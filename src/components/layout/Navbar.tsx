'use client';

import Link from 'next/link';
import { ShoppingBag, User, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import CartDrawer from '../cart/CartDrawer';

export default function Navbar() {
    const { getTotalItems, setIsCartOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalItems = mounted ? getTotalItems() : 0;

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-50/80 backdrop-blur-md border-b border-brand-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo Section */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center gap-2 group">
                                <Heart className="h-6 w-6 text-brand-500 group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-xl tracking-tight text-brand-900">
                                    Huellas <span className="text-brand-500">Humanitarias</span>
                                </span>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex space-x-8">
                            <Link href="/" className="text-brand-800 hover:text-brand-500 transition-colors font-medium">Inicio</Link>
                            <Link href="/catalogo" className="text-brand-800 hover:text-brand-500 transition-colors font-medium">Catálogo</Link>
                            <Link href="/impacto" className="text-brand-800 hover:text-brand-500 transition-colors font-medium">Nuestro Impacto</Link>
                        </div>

                        {/* Icons Section */}
                        <div className="flex items-center space-x-4">
                            <button className="text-brand-800 hover:text-brand-500 transition-colors p-2" aria-label="User Account">
                                <User className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="text-brand-800 hover:text-brand-500 transition-colors p-2 relative"
                                aria-label="Shopping Cart"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold h-[18px] min-w-[18px] px-1 rounded-full flex items-center justify-center transform translate-x-1/4 -translate-y-1/4 shadow-sm">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <CartDrawer />
        </>
    );
}
