import Link from "next/link";

const ServicesCTA = () => {
  return (
    <section className="bg-primary/5 rounded-2xl p-10 md:p-16 text-center border border-primary/10">
      <h3 className="text-3xl font-bold mb-4 text-foreground">
        Have a custom packaging requirement?
      </h3>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Whether you&apos;re a startup or an established enterprise, our engineering team is ready to help you develop the perfect container for your product.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="#contact"
          className="bg-primary hover:opacity-90 text-white px-10 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md"
        >
          Request a Consultation
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </Link>
        <Link
          href="/products"
          className="bg-card border border-border px-10 py-4 rounded-xl font-bold transition-all text-foreground hover:border-primary hover:text-primary"
        >
          View Catalog
        </Link>
      </div>
    </section>
  );
};

export default ServicesCTA;
