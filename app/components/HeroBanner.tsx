import Link from "next/link";

const HeroBanner = () => {
  return (
    <section className="px-4 mb-12" aria-labelledby="hero-heading">
      <div className="flex min-h-[520px] flex-col gap-6 bg-gradient-to-br from-primary via-green-600 to-emerald-800 rounded-2xl items-start justify-end px-6 pb-12 md:px-16 md:pb-16 relative overflow-hidden shadow-2xl">
        {/* Content */}
        <div className="flex flex-col gap-4 max-w-2xl relative z-10">
          <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit">
            Manufacturing Excellence
          </span>
          <h1 id="hero-heading" className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Precision Packaging for West Africa
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium max-w-lg">
            Serving the Pharmaceutical, Cosmetics, and Home Care industries with medical-grade containers and sustainable solutions.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-4 relative z-10">
          <Link
            href="/products"
            className="flex items-center justify-center rounded-lg h-12 px-8 bg-white text-primary text-base font-bold hover:bg-slate-50 transition-colors shadow-lg"
          >
            View Catalog
          </Link>
        </div>

        {/* Carousel Indicators (Visual) */}
        <div className="absolute bottom-6 right-6 md:right-16 flex gap-2" aria-hidden="true">
          <div className="h-1.5 w-8 bg-white rounded-full"></div>
          <div className="h-1.5 w-4 bg-white/40 rounded-full"></div>
          <div className="h-1.5 w-4 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
