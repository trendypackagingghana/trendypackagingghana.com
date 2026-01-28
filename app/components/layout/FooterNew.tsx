import Link from "next/link";
import { company } from "@/app/config/company";

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
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-white border-t border-border px-4 md:px-10 lg:px-40 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <span className="text-lg font-bold text-foreground">{company.name}</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-6">
            {company.tagline}
          </p>

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
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-bold mb-6 text-foreground">Contact Info</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{company.contact.address.full}</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{company.contact.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{company.contact.email}</span>
            </li>
          </ul>
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {company.legalName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
