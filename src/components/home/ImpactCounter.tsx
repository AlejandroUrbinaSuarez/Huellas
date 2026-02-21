import { HeartHandshake } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function ImpactCounter() {
    // Fetch directly from database (Next.js Server Component)
    const impact = await prisma.donationImpact.findFirst() || {
        totalPairsDonated: 0,
        totalPeopleHelped: 0,
        activeCampaigns: 0
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-brand-50 rounded-3xl p-8 md:p-12 shadow-xl border border-brand-100 relative overflow-hidden">

                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <HeartHandshake className="w-64 h-64 text-brand-500" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-brand-900 mb-2">Nuestro Impacto Hasta Hoy</h2>
                        <p className="text-brand-600 mb-10 max-w-2xl">
                            Gracias a compras solidarias como la tuya, estamos logrando llevar esperanza a quienes más lo necesitan.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-100 flex flex-col items-center justify-center text-center transform transition-transform hover:-translate-y-1">
                                <span className="text-5xl font-extrabold text-accent mb-2">{impact.totalPairsDonated}</span>
                                <span className="text-brand-700 font-medium">Pares Donados</span>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-100 flex flex-col items-center justify-center text-center transform transition-transform hover:-translate-y-1">
                                <span className="text-5xl font-extrabold text-brand-500 mb-2">{impact.totalPeopleHelped}</span>
                                <span className="text-brand-700 font-medium">Personas Ayudadas</span>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-100 flex flex-col items-center justify-center text-center transform transition-transform hover:-translate-y-1">
                                <span className="text-5xl font-extrabold text-brand-800 mb-2">{impact.activeCampaigns}</span>
                                <span className="text-brand-700 font-medium">Campañas Activas</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
