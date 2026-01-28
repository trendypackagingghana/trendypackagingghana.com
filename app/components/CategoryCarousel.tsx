"use client";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Cosmetic Excellence",
    description: "Elegant jars for premium beauty brands, designed for luxury and ease of use.",
    href: "/products",
  },
  {
    title: "Pharmaceutical Safety",
    description: "Medical-grade durability and precision containers for healthcare standards.",
    href: "/products",
  },
  {
    title: "Home Care Solutions",
    description: "Robust designs for household essentials, from soaps to industrial cleaners.",
    href: "/products",
  },
  {
    title: "Food & Beverage",
    description: "FDA-compliant PET and HDPE containers for the food processing sector.",
    href: "/products",
  },
];

const CategoryCarousel = () => {
  return (
    <section className="mb-12" id="products" aria-labelledby="categories-heading">
      <div className="flex items-center justify-between px-4 pb-6">
        <h2 id="categories-heading" className="text-2xl font-bold tracking-tight text-foreground">
          Industrial Categories
        </h2>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full bg-card border border-border hover:bg-muted text-muted-foreground transition-colors"
            aria-label="Previous categories"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="p-2 rounded-full bg-card border border-border hover:bg-muted text-muted-foreground transition-colors"
            aria-label="Next categories"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 px-4 scrollbar-hide gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            description={category.description}
            href={category.href}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryCarousel;
