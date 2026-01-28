import Link from "next/link";

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
}

const CategoryCard = ({ title, description, imageUrl, href }: CategoryCardProps) => {
  return (
    <article className="flex-none w-80 group cursor-pointer bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden mb-3">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 bg-gradient-to-br from-primary/10 to-primary/5"
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
          role="img"
          aria-label={title}
        />
        {/* Overlay gradient for text readability if image exists, otherwise subtle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
      </div>
      <div className="p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <Link
          href={href}
          className="w-full flex items-center justify-center gap-2 rounded-lg h-10 bg-muted border border-border text-foreground text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all"
        >
          Explore Category
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default CategoryCard;
