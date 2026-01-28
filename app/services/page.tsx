import Header from "../components/Header";
import FooterNew from "../components/FooterNew";
import MobileBottomNav from "../components/MobileBottomNav";
import ServiceCard from "../components/ServiceCard";
import FacilityCard from "../components/FacilityCard";
import ServicesCTA from "../components/ServicesCTA";

const services = [
  {
    title: "Pharmaceutical Packaging",
    description: "Precision-engineered medicine bottles and tamper-evident caps meeting international safety and hygiene standards.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Cosmetic Jars & Bottles",
    description: "Aesthetic and durable packaging solutions for high-end beauty brands, including airless pumps and luxury PET jars.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Home Care Containers",
    description: "Robust, chemical-resistant containers for detergents, cleaners, and household chemicals in various sizes.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: "Custom Mold Design",
    description: "Bespoke engineering from concept to final mold production. We bring your unique product vision to life.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    title: "Injection Molding",
    description: "High-speed production for complex parts including caps, closures, and industrial components.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing for durability, leak protection, and material purity in our state-of-the-art lab.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const facilities = [
  {
    title: "High-Speed Production",
    description: "24/7 automated manufacturing lines.",
  },
  {
    title: "Blow Molding",
    description: "Optimal for high-volume bottle orders.",
  },
  {
    title: "Design Engineering",
    description: "Advanced prototyping and CAD design.",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background">
      <Header />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-12 pb-24 xl:pb-12">
        {/* Page Heading */}
        <section className="mb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6 text-foreground">
              Manufacturing Capabilities
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We provide high-quality plastic packaging solutions designed for precision and durability. Our facility in Ghana specializes in containers for the pharmaceutical, cosmetic, and home care industries.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20" aria-labelledby="services-grid">
          <h2 id="services-grid" className="sr-only">Our Services</h2>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </section>

        {/* Facility Grid */}
        <section className="mb-20" aria-labelledby="facility-heading">
          <h2 id="facility-heading" className="text-2xl font-bold mb-8 flex items-center gap-3 text-foreground">
            <span className="w-8 h-[2px] bg-primary"></span>
            Inside Our Facility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <FacilityCard
                key={index}
                title={facility.title}
                description={facility.description}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <ServicesCTA />
      </main>

      <FooterNew />
      <MobileBottomNav />
    </div>
  );
}
