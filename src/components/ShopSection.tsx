import { ShoppingBag, Star, Plus, ArrowRight, Check, Sparkles } from 'lucide-react';
import { shopProducts } from '../data/mockData';
import { ShopProduct } from '../types';

interface ShopSectionProps {
  onAddToCart: (product: ShopProduct) => void;
  onOpenShop: () => void;
}

export function ShopSection({ onAddToCart, onOpenShop }: ShopSectionProps) {
  return (
    <section id="shop" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <ShoppingBag size={13} className="text-emerald-600" />
              <span>15. Direct-To-Consumer Hygiene</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#031F5E] tracking-tight leading-[1.18]">
              Keep Your Space Clean <br className="hidden sm:inline" />
              <span className="text-[#1693d9]">Between Visits</span>
            </h2>

            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Commercial-strength formulations and ergonomic tools developed by our field cleaning teams for effortless daily maintenance.
            </p>
          </div>

          <div className="self-start md:self-end">
            <button
              onClick={onOpenShop}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#031F5E] hover:bg-[#1693d9] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Visit the Dr•Kleen Shop</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* 4 Category Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {shopProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Category badge */}
                <span className="absolute top-6 left-6 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-[#031F5E] uppercase tracking-wider shadow-xs border border-slate-100">
                  {product.category}
                </span>

                {product.volumeOrSize && (
                  <span className="absolute bottom-6 right-6 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                    {product.volumeOrSize}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-1.5 text-xs">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span className="font-extrabold text-slate-800">{product.rating}</span>
                    <span className="text-slate-400">({product.reviewsCount})</span>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-[#031F5E] group-hover:text-[#1693d9] transition-colors leading-snug mb-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 font-normal">
                    {product.description}
                  </p>
                </div>

                {/* Price & Add to Cart button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-[#031F5E]">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1.5">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-2.5 rounded-xl bg-sky-50 text-[#1693d9] hover:bg-[#1693d9] hover:text-white transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                    title="Add to Cart"
                  >
                    <Plus size={16} />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Brand Promise note */}
        <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-sky-900">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-white text-[#1693d9] flex items-center justify-center font-bold shadow-xs">
              <Sparkles size={18} />
            </span>
            <p>
              <strong>Dr•Kleen Formulations:</strong> 100% biodegradable active ingredients, child-safe bio-enzymes, and streak-free finish guaranteed.
            </p>
          </div>

          <button
            onClick={onOpenShop}
            className="text-xs font-extrabold text-[#1693d9] hover:underline self-start sm:self-center shrink-0 cursor-pointer"
          >
            Explore Complete Equipment Catalog →
          </button>
        </div>

      </div>
    </section>
  );
}
