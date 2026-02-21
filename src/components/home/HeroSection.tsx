import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative bg-brand-100 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-200 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-accent-light opacity-20 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-32 flex flex-col items-center text-center">
                <div className="animate-fade-in">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-200 text-brand-800 text-sm font-semibold mb-6 tracking-wide uppercase">
                        Más que moda, un movimiento
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-brand-900 tracking-tight leading-tight mb-8">
                        Compra 2. <br className="hidden md:block" />
                        <span className="text-accent">Donamos 1.</span>
                    </h1>
                    <p className="mt-4 text-xl text-brand-700 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Descubre nuestra colección de calzado diseñada con propósito. Por cada dos pares que adquieras, entregamos uno nuevo a personas desplazadas que lo necesitan para seguir caminando.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
                        <Link
                            href="/catalogo"
                            className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-lg shadow-brand-500/30"
                        >
                            Explorar Catálogo
                        </Link>
                        <Link
                            href="/impacto"
                            className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-brand-200 hover:border-brand-500 text-brand-800 rounded-full font-bold text-lg transition-all"
                        >
                            Ver Nuestro Impacto
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
