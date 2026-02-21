import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AddToCartButton from "@/components/home/AddToCartButton";

export const dynamic = 'force-dynamic';

export default async function CatalogoPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="pt-24 pb-20 min-h-screen bg-brand-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-brand-200 pb-6">
                    <div>
                        <h1 className="text-4xl font-black text-brand-900 mb-2">Catálogo Completo</h1>
                        <p className="text-brand-600 text-lg">
                            Explora todos nuestros modelos. Comprando dos pares, donamos uno a quien más lo necesita.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 text-brand-500 font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-brand-100">
                        {products.length} productos disponibles
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-brand-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                            <Link href={`/catalogo/${product.id}`} className="block relative h-72 w-full overflow-hidden bg-brand-50">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-brand-300">
                                        Sin imagen
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-300" />
                            </Link>

                            <div className="p-5 flex flex-col flex-grow text-left">
                                <Link href={`/catalogo/${product.id}`}>
                                    <h3 className="text-xl font-bold text-brand-900 mb-2 hover:text-accent transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-brand-500 text-sm mb-6 line-clamp-2 flex-grow">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-black text-brand-900">
                                        ${Number(product.price).toFixed(2)}
                                    </span>
                                    <AddToCartButton product={{
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        imageUrl: product.imageUrl
                                    }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-brand-900 mb-2">No hay productos en este momento</h2>
                        <p className="text-brand-500">Estamos trabajando para traer nuevos modelos pronto.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
