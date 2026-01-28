"use client";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Cosmetic Excellence",
    description: "Elegant jars for premium beauty brands, designed for luxury and ease of use.",
    href: "/products",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Yix-9W4oy2d7zsz5c14zSRsCtdqFGfl5pJqYSoy7H2m2f1lxozR12dL7owChnlM6CvWiyzEw0SFWdEP_siGdnYE6yBBCg1rNg2jMMyppzlHFKIrmcB2ltOIm6RBWCpLN8MrV7cjIF_Vb5M1IT3Bj-r3abIafYJlBIZi1bo99KD-VL1F3uHCrTv-1Z45RE8-c29Ctey2EsJe3UKYHq5SUmPUdjhZg6eVj_bmtxFG52SOzCKiVW0jQFNgUIlBL0c5FO2GGmX6EB1jb",
  },
  {
    title: "Pharmaceutical Safety",
    description: "Medical-grade durability and precision containers for healthcare standards.",
    href: "/products",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzLKxk_vzDqFykezX6x14L2XfscZWN_Fs2kq2HvF53qVJJNkKnzCI8H96oTbgdI_PM3nvIA563nWMgZRZMcP1zu6gNEASI-GL_j97onT1hZxrOoyG8MKQ2nYGUi6JK64WaiISCCSDmBNJKwfKjLImG9JzuL-WBCv99P3_ikkSTQQ3UGieXaGnxt-_hfDWaxZLs5Ab6auY8Mh8sFTqlAC4S0Ll6Mc68flv9fJVXKxw9EmTbIYwDAnjkaHlBcVSk1pAx4IHz6eHGTq8d",
  },
  {
    title: "Home Care Solutions",
    description: "Robust designs for household essentials, from soaps to industrial cleaners.",
    href: "/products",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdq9cU3QEaHrxrE9Wnrns5mkEAHyjVjLfJ-n4_IV4ILMaB7blE6VBAUuP9-ZsLayGgb-F6XgRJlXBnQqANqZafbFyJRpC4PI8wzPRTFlQVY0_zi9XHfL4UDyxnmSvZ30WFrJzmVlie6YXH6nBSEo9gxC9hLiBq5wl-679MREd7-nezklL1X4-jtCdvSkDDxjKbFZlL7rSMMaTGYrzq4Chas_F5WcS4RErAHYl5P03tJUx8Su1xh8iDej7_18iZKRzHITZzPDJm3En8",
  },
  {
    title: "Food & Beverage",
    description: "FDA-compliant PET and HDPE containers for the food processing sector.",
    href: "/products",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlp6ZiGUxyUZxidJPO0IWvc0Hn2PRfafd1DiMZh_LeFxv0cH5Ny1f8JAr24tR68pAs3UXl6EerbSB5FrrpV1vCV5Usn6HTblWBEYAM-ZOKBKDc9xOhvYwvtd9owm0ht4-XaiqBLC8If7UFXNqR_DOVyIjODhAXKPZ1uGllSwge1p5KNaFgJEnKp5GboOQLW6SyNaVovaz4dlE4OK9NUKJSaxXRLTZJP4xhdt4DX1l9WcF6llH__5xODpImuppRf2Kw8Bb2fsf7ak3f",
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
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryCarousel;
