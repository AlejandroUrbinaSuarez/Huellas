import HeroSection from "@/components/home/HeroSection";
import ImpactCounter from "@/components/home/ImpactCounter";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AddToCartButton from "@/components/home/AddToCartButton";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products: any[] = [];
  let dbError = null;

  try {
    products = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    });
  } catch (err: any) {
    console.error("Prisma error:", err);
    dbError = err.message || JSON.stringify(err);
  }

  if (dbError) {
    return (
      <div className="p-8 text-center text-red-500 font-bold max-w-2xl mx-auto mt-20 bg-red-50 rounded-xl">
        <h2>Falló la conexión a la Base de Datos en Producción:</h2><br />
        <code className="text-xs text-left block bg-white border border-red-200 p-4 rounded text-red-800 break-words">{String(dbError)}</code>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Featured Products */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-900 mb-4">Nueva Colección Solidaria</h2>
          <p className="text-brand-600 mb-10 max-w-2xl mx-auto">
            Cada par que eliges aquí tiene un destinatario más en alguna parte del mundo que necesita comenzar de nuevo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">

                <Link href={`/catalogo/${product.id}`} className="relative h-64 w-full bg-brand-50 overflow-hidden block">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-300">Sin imagen</div>
                  )}
                  <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-300" />
                </Link>

                <div className="p-4 flex flex-col flex-grow text-left">
                  <Link href={`/catalogo/${product.id}`}>
                    <h3 className="text-lg font-bold text-brand-900 mb-1 line-clamp-1 hover:text-accent transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-brand-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-extrabold text-accent">${Number(product.price).toFixed(2)}</span>
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
        </div>
      </section>

      <ImpactCounter />
    </div>
  );
}
