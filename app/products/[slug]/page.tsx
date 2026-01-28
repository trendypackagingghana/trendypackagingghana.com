"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import FooterNew from "../../components/FooterNew";
import MobileBottomNav from "../../components/MobileBottomNav";
import ProductCard from "../../components/ProductCard";

interface ProductDetailProps {
  params: {
    slug: string;
  };
}

// Mock data - In a real app this would come from an API/Database
// For now, we'll hardcode the "Premium Lotion Bottle" data from the template
// but allowing looking up by slug if we had more. If slug doesn't match, we show default.
const productData = {
  title: "Premium Lotion Bottle",
  category: "Cosmetics Containers",
  description: "Our Premium Lotion Bottle is engineered for high-end cosmetic formulations. Crafted from medical-grade, BPA-free PET plastic, it offers glass-like clarity with superior shatter resistance. The 24/410 neck finish is compatible with a wide range of dispensing pumps and disc-top caps, making it ideal for lotions, serums, and liquid soaps.",
  price: "Request Quote",
  specs: {
    capacity: "250 ml",
    neckSize: "24 / 410",
    material: "Clear PET",
    color: "Transparent",
  },
  minOrder: "1,000 units",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAE92LsTyn1_J-1ShWNCMeGAX0fGj4TDSpUU6CeqsDtiSc2C2fA_Y-kuQdzGt7VhG20vyKMejepzbL6X1E_5D0IrIO36LVnkLzb8Nk-fpSbrZC-dfL1a0gG_3jEn48ye_IvwgVGcAbjaYoviiMa_oiKR9KROJ7EXDQqmmlF6D5qvXlG_lSala7e--ZP62l6szVKkbG4mXGZ-E95zvVRltHow9N5D5vEdH3LSyZFluWFOK0fnB0hD_Q6uz-gTA1yamgBHxmDM5jtzyEr",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCavdUcmHIX8p5sXxtcNux9WB-HS-ukTcZw9xDP7VyE-lW9oHICm9v1PQFM9N-n3Q5rmS1irnQS9g7avCOL4jia8ebiEXGRMMP7DJ7yY_8vHNvFhNfHtyYBoGha2g2EICkhq_z-t2r5KriGaB3sVRgT8Uf8pXITscFRy76VsvFJqGMLRJoNAxDyxE8wF6e7A2TwCVjyLtHOVnEMFjgrP7Sy_Q1n9iq_4GO7mGfgHSFOrHIyjTecEi_rH9-QBS9YKtpTkSi-k8Zx1xX7",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC4AZWjBc-wrLX1mhIUgNDrm1j7WO-FTDOPNHIo0Aaz6vbsDALK2UTJSOK-_WFfMEmf1RSqE4yxZmU2IbZTHWeKME55XXXJrshejeZIQJL6OzCzshO8hmehLyBGXYFeM4bR017GxAghdcPA9Fxj9VI9TNa-2t29-clNpg_3272edVJXyJ1StwlBgiq8KH3okGZnveIgjah8zdKVUpmgdKg8UbA_FDzEx4YsADkxFB7xGCSQvQgpYzHnbeYhbUddE4upcClROUB6ryoD",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCl1rkE0BJIVbaMuslXGwr2M3na59uRMtfPDc6qKqkb-0mJPwCYQobhIcoxZU8t94cwIPsqmuwQ_f-zD3emgALJcLvf4KlurmstHHcSjpF3HMWhqPFgAP0a5_27fHpQuC7c8VKkLel_T4GWml84nwhSR_XRy7OY2SXMt2ssbWhtGqMpPVPhhM7Y5Hsr4QQfdE86NWB81ycrc6qUEBjh1ilwvZXHznMt2XEoOmSu6Fb_LtpkLSvojXZLt8aOGufKiaM0mFYYBMl55SQD",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWEI_thpIKPVUr5uaOUB1PML7VE5-1QmgU3Y_kFV5TMl8Av2AUNHAAZIE9Xv0GlfAOt2I_YUiSr5hH60UCyzUHJaah03JMYyINhP2YPpRAV1IdW5_ii6JSK_Tph7sWWyueSfTJ8OFihUmBlu0OTLeRfKaCbM-sHvkb32Cc1I13HDrRCcxukLgLottesGKQDjXcJiOZmU12CTTRXUGHggqnFkk3v_UHigj1NzqXhMDMzjfhdiwhOl-O4Uo2wwpWr_GwAhZXW-rj8e1c",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAaf36lYP_tbF33LiiaClyM6D5XbmneIIvPaqmMO2CEy9Gkxh08t1IMjAyELZxr9KPkTPibnVSQM15eOchi6Gf7RZfC6RM-BQGt3xNoyccz55IrgtaS1XgARzpjUScVbh28fWg-DJr1CbDGvWUeND7546WnV_J4CjYLYur8xx9sUG8Pbo3_8ldL-O-3l0fmjxUuRCDvYIXXFNDLkyQLt2D0qMD58mHXabhwLQVYIt-L6xMBnRhXKpmIhJKvN8A5Adr9Urw7uM9zzy-B"
  ],
  relatedProducts: [
    {
      title: "Double Wall Cream Jar",
      description: "50ml | PP Plastic",
      category: "Cosmetic",
      categoryColor: "primary" as const,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJlzGv-zad-L6z1NOmlaMP0EDg2Bh_hsmJ97z64bxVEYL3BUCACFEsvMNsOZt8li8bHbCrFNvotUw5A74p6rtUKLJ4v587SEC697NuVv274PexmdZGAr8M2quYvrrwtQkuaAQTa_OoOCEmkQYFZL-0-hsop2Z0aWw5rnW4mEa4lJ8bmq2B_5rpYM9fCQtyOvQPsxfIzLEGHVTC0YOMtw7M0R71uly3vVGJ6t_Qzh_aQXhhhphv8Zv9i6tXkEd69JtmFlaan--tZMJN"
    },
    {
      title: "Dropper Bottle",
      description: "30ml | Glass-look PET",
      category: "Pharmaceutical",
      categoryColor: "blue" as const,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqjhCQR8q8sl7Be9Zsxb3JpI5fGC1H4KtML7rUV4tA8Znx6ABYUjbVE_LYGJV-wVIw0lxe0ayRlu6V7Ar68ZkfBxJNgtO84Tw_vGHO93vPfEAVeSyQo4bHPbg2bMMr3zMecRu7R-fIciQHFdOkQiUX5rg-1toNSt_LOhNuVujTYGm9_nphKqBvoZHL2urE0IV8zMLgbGMvlJjvQaiNGr6okPtqjWUU7ppEvDm7cVlktHMcZdpM47Z0wLLVCWnT1HcuK0cXEbJDcfG9"
    },
    {
      title: "Hair Care Bottle",
      description: "500ml | HDPE",
      category: "Home Care",
      categoryColor: "orange" as const,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuMIYFL5dhQb3LDTkzx8LjbUTajfbPcyqn-D8EQmN7QT4_TpdmauHqU8QyDXXjqtApmd5H6cQZ8L71v2buVIFJBogoGvM4P4GlUE4MdIcwnlgbcRHN6ppAz2QXIZQu3aqUjiAkJF7SO1I158Skd815pe0gX6mrRqTYatlx6LIePAAGOB1K1r4r055UiP7x7fjJc5RJFsbe2-sfykiRp2Iz0QHa5wpJbAWYcrxH9geg5_cgZkrI9Y5uwpbvrGwPNfaHSiNznSC3uZSH"
    },
    {
      title: "Fine Mist Sprayer",
      description: "100ml | PET",
      category: "Cosmetic",
      categoryColor: "primary" as const,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPLmSVbFji1FvGQQTL8IV0RSazUSyUhQaryOrUO71CaiSivmWqWYP1ck_OSmXtwCV84C3pNz5cgwL5y-VGFmPR7WbfUtD2DYuZJMLbz_XeD9FYO-rgDAKrP4pKGUDLZHVD25rEtrYNnl6Z76MHhEckxlwEkz-nlORWq1HzwrWIdE9Ue9pBJ8NWYBN9KEWApBGx4n9GT-g6eFtX2Y-cVEkOYXbuq_AOZY8ieQMCeqnuETS_5R4zWAn6C57tdVsx3Dg-RI5EEX-4fyz2"
    }
  ]
};

export default function ProductDetailPage({ params }: ProductDetailProps) {
  // In a real implementation we would fetch based on params.slug
  // const product = getProduct(params.slug);
  const product = productData;
  const [activeImage, setActiveImage] = useState(productData.images[0]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col items-center py-8">
        <div className="max-w-[1200px] w-full px-6 flex flex-col gap-6">
          
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap gap-2 items-center text-sm">
            <Link className="text-primary font-medium hover:underline" href="/">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link className="text-primary font-medium hover:underline" href="/products">Products</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
            {/* Left: Image Gallery & Carousel */}
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-[4/5] bg-card rounded-xl overflow-hidden shadow-sm flex items-center justify-center border border-border relative">
                <img 
                  alt={product.title} 
                  className="w-full h-full object-contain p-12 transition-opacity duration-300" 
                  src={activeImage} 
                />
              </div>
              
              {/* Carousel Selection */}
              <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 size-24 rounded-lg border-2 overflow-hidden cursor-pointer bg-card transition-colors ${
                      activeImage === img ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div 
                      className="w-full h-full bg-center bg-no-repeat bg-contain p-2"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Information */}
            <div className="flex flex-col gap-8">
              {/* Header Info */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                    {product.title}
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">
                    Cosmetic Grade High-Clarity PET Plastic
                  </p>
                </div>
                
                {/* Chips / Badges */}
                <div className="flex gap-3 flex-wrap">
                  <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/10 px-4 border border-primary/20">
                    <span className="material-symbols-outlined text-primary text-lg">energy_savings_leaf</span>
                    <p className="text-primary text-sm font-semibold">Eco-Friendly</p>
                  </div>
                  <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-emerald-50/50 px-4 border border-emerald-100">
                    <span className="material-symbols-outlined text-emerald-600 text-lg">recycling</span>
                    <p className="text-foreground text-sm font-medium">100% Recyclable</p>
                  </div>
                  <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-emerald-50/50 px-4 border border-emerald-100">
                    <span className="material-symbols-outlined text-emerald-600 text-lg">verified</span>
                    <p className="text-foreground text-sm font-medium">Pharma Grade</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold border-b border-border pb-2 text-foreground">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {product.description}
                </p>
              </div>

              {/* Technical Specs Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 bg-card p-6 rounded-xl border border-border shadow-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Capacity</p>
                  <p className="text-lg font-semibold text-foreground">{product.specs.capacity}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Neck Size</p>
                  <p className="text-lg font-semibold text-foreground">{product.specs.neckSize}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Material</p>
                  <p className="text-lg font-semibold text-foreground">{product.specs.material}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Standard Color</p>
                  <p className="text-lg font-semibold text-foreground">{product.specs.color}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  href="#contact"
                  className="flex-1 flex min-w-[180px] cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl h-14 px-6 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  <span className="material-symbols-outlined">request_quote</span>
                  <span className="truncate">Request Quote</span>
                </Link>
              </div>

              {/* Industrial Features List */}
              <ul className="flex flex-col gap-3 mt-4">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Minimum Order Quantity: {product.minOrder}
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Custom branding & labeling available
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Ghana Standards Authority (GSA) Certified
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products / Secondary Section */}
        <div className="max-w-[1200px] w-full px-6 flex flex-col gap-6 mt-20 pb-20">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
              <p className="text-muted-foreground">Packaging solutions for the cosmetic industry</p>
            </div>
            <Link className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="/products">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((related, idx) => (
              <ProductCard
                key={idx}
                {...related}
              />
            ))}
          </div>
        </div>
      </main>

      <FooterNew />
      <MobileBottomNav />
    </div>
  );
}
