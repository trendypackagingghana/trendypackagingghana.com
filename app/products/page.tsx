import Header from "../components/Header";
import FooterNew from "../components/FooterNew";
import MobileBottomNav from "../components/MobileBottomNav";
import ProductCard from "../components/ProductCard";

const products = [
  {
    title: "500ml Boston Round",
    description: "Neck: 24/410 • Crystal Clear",
    category: "Cosmetic",
    categoryColor: "primary" as const,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIoihnaxoWeLiP34KxQYegQbdOzR4FYtwPRh8-LAYBejOjuTQb5rz6QA03UotD5vdBkSzsZOi0YNSx8CxlY0T7wmruGKEExBPzdjuRwWuEqb8wvJBg9g8SwJvdYTmzFgncj4gUtiJY14Y-bSR5CkfcyX3kefTD8YRoxzhd5dl8ATy5trZn3RbyIQXFfoC6grFdfABChLq-ucId80dCHNsH24PtE0Sx1pa2gaAmjXth2OsMNbG4dOCzDKvc2f6V7SmDMUWmV-UJTlWi",
  },
  {
    title: "30ml Amber Syrup Bottle",
    description: "Neck: 28mm • UV Protection",
    category: "Pharmaceutical",
    categoryColor: "blue" as const,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHNvYAhztnJ5z2o77LHCOpnGzs19HVxskJlDcl0nXkflR0BHxlO0DG5mVnNT0-hkagbv62udXlDZsBNoAdgnuUNTKwSYDJdERVCha4M-bkUTrgtC2iesZc7CeZeyxj17_OHdZBIZt0ZbqKPR5JVm60RG3nigiES3EToOg7Enwe479O4cQ72oqIFVlkHk7waEgGRiUOwTTiAW1WDSMplJ_M_YuD0TIXJ4i5Pj3bZBKpsX-7BNO13dFLEc_UvDv1B9SvedqtZF2Ka0Yy",
  },
  {
    title: "100g Wide Mouth Jar",
    description: "Neck: 70mm • Opaque White",
    category: "Home Care",
    categoryColor: "orange" as const,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKMd9rvRZHFjyrY-No4az-YJbR3zl2nj7umrg3ER8WrZQ8u-wZmEQZb5lu5eusV14zrl7fQJHkFw_haAy4cMPGdOcSY-Z1Jg4H-l8zPjIjZVaEUCvdaHkXCgQ-VdyBAffOvLck5Cd0k71KawpJfXGDG8jTj5NsTS4e0Jx7bzs3lnewgbPSeccPcUPekiiRq96K4Huz_FgWmZVUdpP3TXuQnxH6vEDl3dkgUkUJm6hrLRi85lXJhj3rbcieoCn4GasxRAwWLH1MCjP1",
  },
  {
    title: "250ml Cosmo Round",
    description: "Neck: 24/410 • Matte Finish",
    category: "Cosmetic",
    categoryColor: "primary" as const,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOZFcU3SC2hMp-ShoxRwUD53l_956y5F7WVCuNtE0cYkI72HFZ7XbAz5XC-lgxPotr0jMNLxAz9W-lnlN_YK745K00w7mjHhtpc8AGLYI29QwoEI_IL0nJGoG9A0dQxFwREN1b9sDF13YW-cYrYWHiK5_Z8SjeNKIUtFNVZgSPU__sMQB8HvTz3vGLv3muq-HsEFJCxm_gWfZcew18ypjrBScEUyXp6PPXyTrj8NW4Ro1Ym1mhaeH9O9h0sNuuogM9BWQH7taUBOcV",
  },
  {
    title: "60ml Dropper Bottle",
    description: "Neck: 18/415 • Precision Tip",
    category: "Pharmaceutical",
    categoryColor: "blue" as const,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDngBG4d1K_HE7t6ZHa5G8mO7WARhpSn9dymyc0W4evnsD05_RabCHHSPCHfbLIwE_qelwkpphrX-yXurTcmhTWVKGeFHsZnIF9OYN5c7bjViDH6StBS16vhUsEyqEpKUHP-u9VP1nyDpXD28fYO7Ywz9j7S9ykh6Fp86bXRJvgfwpB3_tQCH75qYyBbKFNf-ItANkeC2E9yO317wmY3OX6f8tjrW4PkP9E5Q_S0pplHwfFbscooxpfdhdT6bVCSDm2OmTrPBFpkJxq",
  },
  {
    title: "500g Industrial Tub",
    description: "Neck: Snap-on • Heavy Duty",
    category: "Home Care",
    categoryColor: "orange" as const,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbY3YjLq-_FTP-7uzaSzgyBxSORXF4JKsYL-ghoOryccMVOABgg2GNxVuNiXC9Rz9boGWXaJYq1pn6Fr5UP_psV7p_K3IQZcoJXg5JywEPDGRdq3bkmyMVfV62B9jpYN1FmnccvD7soULCgVevKLrc-xPtjU5frKf2w-UyYox1seORy53f7z1HM5wI40nB6l098VXdlVWgRubo4KzolvtouTCqA-LSXhyv7Dd-_v6dyHj2WYFP9qks59XdNGADcam03d83Lx2BK2Cp",
  },
  {
    title: "Ribbed Screw Cap",
    description: "Size: 24/410 • Assorted Colors",
    category: "Closures",
    categoryColor: "slate" as const,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC9Xjrb2hrik5xAa3cs4VlEwcvROOXvsPG2yHJaXhTmRJI0H_5DPHUfHJC_oHWCELXLJNEZH0OInCYZ6lnEEUpEKPyJmKT0ISGq1mvFOItChS9UoUW55LIsLtVokfKFmMSH4o0caKAb-kSdOcbZpzab90FR2O7JASDFP0Ao3avcwVsxK6fqTa-ugnASCdDhEzVdP2HOYsNb5O98C0WgFJ7JJtFTl5GI-fHkJtBV_UGkBpm6onJwhyFgSsB_gzJrmoVhPo_xhhG4uz-",
  },
  {
    title: "1000ml Juice Bottle",
    description: "Neck: 38mm • High Clarity",
    category: "Food & Beverage",
    categoryColor: "orange" as const,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDo7nvJUHRJ1K_PKk2_hC4M2-YuDd3VmSvLwL8WJPau5OYo1N3HDECyS_od6ahfRqD6HQkuKVacmwWBqN7UkNSk_PUyhbPozSiCJTucyUTqgqe9qYeCv81wnXPcDCUltuIqvahEnhJQjdK51vf_f49KT7J-ew9pUYEx5kjli-YIZdt3Ryngy17dpvOZCwBNF8b8vFQhG-zaYCd3qamMmNT2VoQlK2bQzlRVuktr2jBRAyCZRFgoD3HIcI0tOHCv_uTjCloM5iYWvmv8",
  },
];

export default function ProductsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background">
      <Header />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-8 pb-24 xl:pb-8">
        {/* Section Header & Filter Chips */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Product Catalog</h1>
              <p className="text-muted-foreground mt-1">
                Browse our premium range of industrial packaging solutions.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span>Showing {products.length} products</span>
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2">Category:</span>
              <button className="px-4 py-1.5 rounded-full bg-primary text-white text-sm font-semibold border border-primary transition-colors">
                All Products
              </button>
              {["Bottles", "Jars", "Closures"].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-1.5 rounded-full bg-card text-muted-foreground hover:text-primary text-sm font-medium border border-border hover:border-primary transition-colors flex items-center gap-1 group"
                >
                  {filter}
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold transition-colors">1</button>
          <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">2</button>
          <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">3</button>
          <span className="px-2 text-muted-foreground">...</span>
          <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">12</button>
          
          <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>

      <FooterNew />
      <MobileBottomNav />
    </div>
  );
}
