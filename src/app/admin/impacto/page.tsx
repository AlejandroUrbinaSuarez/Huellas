import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Users, Truck, Globe, HeartHandshake } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminImpactDashboard() {
    // Try to find the single globals impact record
    let impact = await prisma.donationImpact.findFirst();

    // If somehow deleted, provide zeroes
    if (!impact) {
        impact = {
            id: "dummy",
            totalPairsDonated: 0,
            totalPeopleHelped: 0,
            activeCampaigns: 0,
            lastUpdated: new Date()
        };
    }

    // Calculate some dummy derived stats based on the core numbers for the dashboard MVP
    const communitiesReached = Math.max(1, Math.floor(impact.totalPairsDonated / 50));
    const volunteerHours = impact.totalPairsDonated * 2;

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-black text-brand-900">Dashboard de Impacto</h1>
                <p className="text-brand-600">
                    Monitorea los resultados reales del modelo 2x1. Última actualización: {format(new Date(impact.lastUpdated), "dd MMM yyyy, HH:mm", { locale: es })}
                </p>
            </div>

            {/* Main KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-accent font-bold text-sm uppercase tracking-wider">Pares Donados</h3>
                        <HeartHandshake className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-5xl font-black text-accent">{impact.totalPairsDonated}</div>
                    <p className="text-accent/80 text-sm mt-2 font-medium">+12% vs el mes anterior</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-brand-500 font-bold text-sm uppercase tracking-wider">Personas Ayudadas</h3>
                        <Users className="w-6 h-6 text-brand-400" />
                    </div>
                    <div className="text-5xl font-black text-brand-900">{impact.totalPeopleHelped}</div>
                    <p className="text-brand-400 text-sm mt-2 font-medium">Vidas impactadas directamente</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-brand-500 font-bold text-sm uppercase tracking-wider">Campañas Activas</h3>
                        <Globe className="w-6 h-6 text-brand-400" />
                    </div>
                    <div className="text-5xl font-black text-brand-900">{impact.activeCampaigns}</div>
                    <p className="text-brand-400 text-sm mt-2 font-medium">Regiones en gestión actual</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-brand-500 font-bold text-sm uppercase tracking-wider">Horas Voluntariado</h3>
                        <Truck className="w-6 h-6 text-brand-400" />
                    </div>
                    <div className="text-5xl font-black text-brand-900">{volunteerHours}</div>
                    <p className="text-brand-400 text-sm mt-2 font-medium">Estimado de logística</p>
                </div>

            </div>

            {/* Secondary Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-100">
                    <h3 className="text-xl font-bold text-brand-900 mb-6">Próxima Entrega Programada</h3>
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-black text-brand-900">24</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-brand-900 text-lg">Comunidad "La Esperanza", Bogotá Sur</h4>
                            <p className="text-brand-600 mb-4">
                                Se entregarán {Math.max(10, Math.floor(impact.totalPairsDonated * 0.3))} pares recolectados durante este trimestre.
                            </p>
                            <div className="w-full bg-brand-100 rounded-full h-2">
                                <div className="bg-accent h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <p className="text-xs text-brand-400 mt-2 text-right">85% de la logística completada</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-100">
                    <h3 className="text-xl font-bold text-brand-900 mb-6">Reporte de Transparencia</h3>
                    <p className="text-brand-600 mb-6">
                        Siguiendo nuestra promesa, por cada par que un cliente compra en Huellas Humanitarias, financiamos medio par para donación. Visualiza el historial auditable.
                    </p>
                    <button className="w-full border-2 border-brand-200 text-brand-700 font-bold py-3 rounded-xl hover:border-brand-900 hover:text-brand-900 transition-colors">
                        Descargar Informe PDF (Trimestre Actual)
                    </button>
                </div>

            </div>

        </div>
    );
}
