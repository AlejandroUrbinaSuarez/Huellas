import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/home/AddToCartButton";
import Link from "next/link";
import { ChevronLeft, Truck, RefreshCcw, ShieldCheck } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
    // Fetch specific product
    const product = await prisma.product.findUnique({
        where: { id: params.id }
    });

    // If ID doesn't exist, show Next.js 404 page
    if (!product) {
        notFound();
    }

    return (
        <div className="pt-24 pb-20 min-h-screen bg-brand-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb / Back button */}
                <div className="mb-8">
                    <Link href="/catalogo" className="inline-flex items-center text-brand-500 hover:text-brand-900 transition-colors font-medium">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Volver al catálogo
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-brand-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Left Column: Image Gallery */}
                        <div className="relative h-[400px] lg:h-[600px] bg-brand-50 bg-opacity-50 flex items-center justify-center p-8">
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-xl"
                                />
                            ) : (
                                <div className="text-brand-300 flex flex-col items-center">
                                    <div className="w-24 h-24 mb-4 border-4 border-dashed border-brand-200 rounded-full flex items-center justify-center">?</div>
                                    <p>Imagen no disponible</p>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Product Details */}
                        <div className="p-8 lg:p-12 flex flex-col">

                            {/* Badge */}
                            <div className="mb-4">
                                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase">
                                    Impacto Solidario
                                </span>
                            </div>

                            {/* Title & Price */}
                            <h1 className="text-3xl lg:text-4xl font-black text-brand-900 mb-4">{product.name}</h1>
                            <div className="text-3xl font-extrabold text-brand-900 mb-6 flex items-end gap-3">
                                ${Number(product.price).toFixed(2)}
                                <span className="text-sm font-medium text-brand-400 mb-1 line-through">
                                    ${(Number(product.price) * 1.25).toFixed(2)}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="prose prose-brand text-brand-600 mb-8">
                                <p>{product.description}</p>
                            </div>

                            {/* Interactive Size Selector (Mock for MVP UI) */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-brand-900">Selecciona tu talla (US)</span>
                                    <button className="text-sm text-accent hover:underline font-medium">Guía de tallas</button>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {['7', '8', '9', '10', '11'].map((size) => (
                                        <button
                                            key={size}
                                            className="border border-brand-200 py-3 rounded-xl text-brand-700 font-medium hover:border-brand-900 hover:text-brand-900 focus:ring-2 focus:ring-brand-900 focus:outline-none transition-all active:scale-95"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stock Warning */}
                            {product.stock && product.stock < 10 && (
                                <div className="text-red-500 text-sm font-bold mb-6 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                                    ¡Solo quedan {product.stock} pares en stock!
                                </div>
                            )}

                            {/* Checkout Action */}
                            <div className="mt-auto pt-8 border-t border-brand-100">
                                <div className="w-full flex">
                                    {/* Reuse the AddToCartButton component but stretch it */}
                                    <div className="w-full [&>button]:w-full [&>button]:py-4 [&>button]:text-lg [&>button]:justify-center">
                                        <AddToCartButton product={{
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            imageUrl: product.imageUrl
                                        }} />
                                    </div>
                                </div>

                                <p className="text-center text-sm font-medium text-brand-500 mt-4">
                                    Recuerda: Tu compra financia la donación de medio par.
                                </p>
                            </div>

                            {/* Trust badges */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-brand-100">
                                <div className="flex flex-col items-center text-center">
                                    <Truck className="w-6 h-6 text-brand-400 mb-2" />
                                    <span className="text-xs font-bold text-brand-700">Envío Gratis</span>
                                    <span className="text-xs text-brand-400">A todo el país</span>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <RefreshCcw className="w-6 h-6 text-brand-400 mb-2" />
                                    <span className="text-xs font-bold text-brand-700">Cambios Fáciles</span>
                                    <span className="text-xs text-brand-400">Hasta 30 días</span>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <ShieldCheck className="w-6 h-6 text-brand-400 mb-2" />
                                    <span className="text-xs font-bold text-brand-700">Pago Seguro</span>
                                    <span className="text-xs text-brand-400">Datos encriptados</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
