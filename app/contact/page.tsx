import Header from "../components/layout/Header";
import FooterNew from "../components/layout/FooterNew";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import { company } from "@/app/config/company";

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col pt-16 bg-background">
      <Header />

      <main className="flex-1 py-16 px-4 md:px-10 max-w-7xl mx-auto w-full pb-24 xl:pb-16">
        {/* Page Heading */}
        <div className="flex flex-col gap-3 mb-12">
          <h1 className="text-foreground text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Contact and Support
          </h1>
          <p className="text-primary text-lg font-medium max-w-2xl">
            We're here to support your packaging needs with professional solutions for pharmaceutical, cosmetics, and home care containers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Info & Quick Actions */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4">
              <a
                href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 rounded-xl h-12 md:h-14 px-4 sm:px-6 bg-white border border-border text-foreground text-sm sm:text-base font-bold shadow-sm hover:border-primary transition-all group"
              >
                <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Us</span>
              </a>
              <a
                href={`mailto:${company.contact.email}`}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 rounded-xl h-12 md:h-14 px-4 sm:px-6 bg-white border border-border text-foreground text-sm sm:text-base font-bold shadow-sm hover:border-primary transition-all group"
              >
                <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email Us</span>
              </a>
            </div>

            {/* Address & Details */}
            <div className="bg-white rounded-2xl p-8 border border-border shadow-sm flex flex-col gap-8">
              <div>
                <h3 className="text-foreground text-xl font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Our Office
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-7">
                  {company.contact.address.street},<br />
                  {company.contact.address.city},<br />
                  {company.contact.address.country}
                </p>
              </div>

              <div>
                <h3 className="text-foreground text-xl font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-7">
                  {company.contact.phone}
                </p>
              </div>

              <div>
                <h3 className="text-foreground text-xl font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-7">
                  {company.contact.email}
                </p>
              </div>

              <div>
                <h3 className="text-foreground text-xl font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Operating Hours
                </h3>
                <p className="text-muted-foreground leading-relaxed pl-7">
                  {company.operatingHours.weekdays}<br />
                  {company.operatingHours.saturday}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 border border-border shadow-sm h-full">
              <h3 className="text-foreground text-xl font-bold mb-6">Send us a Message</h3>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="full-name" className="text-sm font-bold text-foreground">Full Name</label>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="John Doe"
                    className="rounded-lg bg-input border border-border h-12 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-foreground">Business Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    className="rounded-lg bg-input border border-border h-12 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="subject" className="text-sm font-bold text-foreground">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Inquiry about custom molds"
                    className="rounded-lg bg-input border border-border h-12 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-bold text-foreground">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="rounded-lg bg-input border border-border p-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="w-full sm:w-auto px-10 h-14 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-md">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 w-full">
          <div className="rounded-2xl overflow-hidden border border-border h-[400px]">
            <iframe
              src={company.map.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${company.name} location`}
            />
          </div>
        </div>
      </main>

      <FooterNew />
      <MobileBottomNav />
    </div>
  );
}
