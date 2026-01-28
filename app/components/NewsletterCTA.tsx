const NewsletterCTA = () => {
  return (
    <section className="px-4 mb-16" id="contact" aria-labelledby="newsletter-heading">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="max-w-xl text-center md:text-left">
          <h2 id="newsletter-heading" className="text-3xl font-bold mb-4 text-foreground">
            Request a Bulk Quote
          </h2>
          <p className="text-muted-foreground text-lg">
            Looking for 10,000+ units? Get personalized pricing and shipping timelines from our manufacturing team in Accra.
          </p>
        </div>
        <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <label htmlFor="business-email" className="sr-only">Business email</label>
          <input
            id="business-email"
            type="email"
            className="flex-1 min-w-[300px] border border-border bg-input focus:ring-2 focus:ring-primary focus:border-primary rounded-lg h-12 px-4 text-foreground placeholder:text-muted-foreground"
            placeholder="Enter your business email"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-bold px-8 h-12 rounded-lg hover:opacity-90 transition-all whitespace-nowrap shadow-md"
          >
            Get Quote
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterCTA;
