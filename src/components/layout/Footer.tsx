import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-auto bg-brand-900 text-brand-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 tracking-tight">Huellas Humanitarias</h3>
                        <p className="text-brand-300 text-sm leading-relaxed max-w-sm">
                            Una plataforma solidaria donde cada compra cuenta. Juntos transformamos la moda en ayuda real para personas desplazadas.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-brand-200">Enlaces Rápidos</h4>
                        <ul className="space-y-2 text-sm text-brand-300">
                            <li><Link href="/catalogo" className="hover:text-white transition-colors">Catálogo de Zapatos</Link></li>
                            <li><Link href="/impacto" className="hover:text-white transition-colors">Nuestro Impacto</Link></li>
                            <li><Link href="/nosotros" className="hover:text-white transition-colors">Quiénes Somos</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-brand-200">Legal</h4>
                        <ul className="space-y-2 text-sm text-brand-300">
                            <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/terminos" className="hover:text-white transition-colors">Términos del Servicio</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-brand-800 text-center text-sm text-brand-400">
                    <p>&copy; {new Date().getFullYear()} Huellas Humanitarias. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
