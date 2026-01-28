import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

const ServiceCard = ({ title, description, icon, href = "#" }: ServiceCardProps) => {
  return (
    <article className="group flex flex-col gap-5 p-8 rounded-xl border border-border bg-card hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto pt-4 border-t border-border/50">
        <Link
          href={href}
          className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all"
        >
          Learn More
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
