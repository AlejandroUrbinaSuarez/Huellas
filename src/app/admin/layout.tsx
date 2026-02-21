import Link from "next/link";
import { LayoutDashboard, Users, Package, ShoppingCart, ArrowLeft, HeartHandshake } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-brand-50 pt-[72px]">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-brand-100 hidden md:flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-brand-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-brand-900">Admin Panel</h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/pedidos" className="flex items-center gap-3 px-4 py-3 text-brand-600 hover:text-brand-900 hover:bg-brand-50 rounded-xl transition-colors font-medium">
                        <ShoppingCart className="w-5 h-5" />
                        Pedidos Recientes
                    </Link>

                    <Link href="/admin/impacto" className="flex items-center gap-3 px-4 py-3 text-brand-600 hover:text-brand-900 hover:bg-brand-50 rounded-xl transition-colors font-medium">
                        <HeartHandshake className="w-5 h-5 text-accent" />
                        Dashboard de Impacto
                    </Link>

                    {/* Dummy links for future MVP expansion */}
                    <div className="flex items-center gap-3 px-4 py-3 text-brand-300 rounded-xl cursor-not-allowed font-medium">
                        <Package className="w-5 h-5" />
                        Inventario (Próximamente)
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 text-brand-300 rounded-xl cursor-not-allowed font-medium">
                        <Users className="w-5 h-5" />
                        Clientes (Próximamente)
                    </div>
                </nav>

                <div className="p-4 border-t border-brand-100">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-brand-500 hover:text-brand-900 transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5" />
                        Volver a la Tienda
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
