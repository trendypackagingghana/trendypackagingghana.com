import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  categoryColor?: "primary" | "blue" | "orange" | "slate";
  imageUrl: string;
}

const ProductCard = ({ title, description, category, categoryColor = "primary", imageUrl }: ProductCardProps) => {
  const colorClasses = {
    primary: "text-primary",
    blue: "text-accent-blue",
    orange: "text-accent-orange",
    slate: "text-muted-foreground",
  };

  // Generate a URL-friendly slug from the title if not provided
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  return (
    <Link href={`/products/${slug}`} className="group flex flex-col bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <div className="relative aspect-square bg-muted flex items-center justify-center p-8 overflow-hidden">
        {/* Using standard img tag for external URLs */}
        <img
          alt={title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          src={imageUrl}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${colorClasses[categoryColor]}`}>
          {category}
        </span>
        <h3 className="text-foreground font-bold leading-tight mb-1">{title}</h3>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
