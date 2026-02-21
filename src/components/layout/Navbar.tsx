import Link from 'next/link';
import { ShoppingBag, User, Heart } from 'lucide-react';

export default function Navbar() {
    return (
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
                        <button className="text-brand-800 hover:text-brand-500 transition-colors p-2 relative" aria-label="Shopping Cart">
                            <ShoppingBag className="h-5 w-5" />
                            <span className="absolute top-1 right-1 bg-accent-light text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
