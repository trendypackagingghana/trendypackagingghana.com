import Link from "next/link";

const FooterNew = () => {
  const productLinks = [
    { name: "Cosmetic Jars", href: "#" },
    { name: "Lotion Bottles", href: "#" },
    { name: "Pharma Vials", href: "#" },
    { name: "Household Jerrycans", href: "#" },
    { name: "Caps & Closures", href: "#" },
  ];

  const companyLinks = [
    { name: "Manufacturing Process", href: "#" },
    { name: "Quality Control", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-white border-t border-border px-4 md:px-10 lg:px-40 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <span className="text-lg font-bold text-foreground">Trendy Packaging</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-6">
            Leaders in plastic manufacturing in Ghana, providing high-quality packaging for the West African market since 2010.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-muted border border-border text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Website"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted border border-border text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Share"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted border border-border text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Products Column */}
        <nav aria-label="Products">
          <h4 className="font-bold mb-6 text-foreground">Products</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            {productLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company Column */}
        <nav aria-label="Company">
          <h4 className="font-bold mb-6 text-foreground">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            {companyLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Column */}
        <div>
          <h4 className="font-bold mb-6 text-foreground">Contact Info</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Plot 42, Spintex Road, Accra, Ghana</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+233 (0) 50 123 4567</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>sales@trendypackaging.com</span>
            </li>
          </ul>
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Trendy Packaging Ghana Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
