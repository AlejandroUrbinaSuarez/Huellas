import HeroSection from "@/components/home/HeroSection";
import ImpactCounter from "@/components/home/ImpactCounter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Featured Products Placeholder for Later */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-900 mb-4">Nueva Colección Solidaria</h2>
          <p className="text-brand-600 mb-10 max-w-2xl mx-auto">
            Cada par que eliges aquí tiene un destinatario más en alguna parte del mundo que necesita comenzar de nuevo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Products will go here once the database is hooked up */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-brand-100 p-4 h-80 flex flex-col pt-[50%] animate-pulse">
                <div className="mt-auto bg-brand-100 h-6 w-3/4 rounded mb-2"></div>
                <div className="bg-brand-50 h-4 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImpactCounter />
    </div>
  );
}
