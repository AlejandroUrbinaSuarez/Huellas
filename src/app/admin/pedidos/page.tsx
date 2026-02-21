import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
    // Fetch orders descending, including the associated user (guest email) and items
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: true,
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-black text-brand-900">Gestión de Pedidos</h1>
                <p className="text-brand-600">Revisa y administra los pedidos ingresados y el impacto acumulado.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-brand-50 text-brand-700 font-bold uppercase text-xs border-b border-brand-100">
                            <tr>
                                <th className="px-6 py-4">ID Pedido / Fecha</th>
                                <th className="px-6 py-4">Cliente (Guest)</th>
                                <th className="px-6 py-4">Artículos</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-100 text-brand-600">

                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-brand-500">
                                        Aún no hay pedidos registrados. Usa el <a href="/catalogo" className="text-accent hover:underline">Catálogo</a> para hacer compras de prueba.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => {
                                    const itemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

                                    return (
                                        <tr key={order.id} className="hover:bg-brand-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-mono text-xs text-brand-900 font-medium bg-brand-100 px-2 py-1 rounded inline-block mb-1">
                                                    #{order.id.slice(0, 8)}
                                                </div>
                                                <div className="text-xs text-brand-400">
                                                    {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm", { locale: es })}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="font-medium text-brand-900">{order.user?.email || 'Guest'}</div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-bold text-brand-900">{itemsCount} pares</span>
                                                    <span className="text-xs text-brand-400">
                                                        (Genera {Math.floor(itemsCount / 2)} dona.)
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-accent">
                                                ${Number(order.totalAmount).toFixed(2)}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase
                                                    ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-brand-100 text-brand-700'}
                                                `}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
