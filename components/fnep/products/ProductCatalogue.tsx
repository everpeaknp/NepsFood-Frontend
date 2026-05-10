'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Plus, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/app/product-static/products';

const CATEGORIES = ["All Collections", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

export default function ProductCatalogue() {
  const [activeCategory, setActiveCategory] = useState("All Collections");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredProducts = useMemo(() => {
    setCurrentPage(1);
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === "All Collections" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="min-h-screen bg-white selection:bg-neps-red selection:text-white pt-12 lg:pt-20 font-sans">
      <GlobalStyles />
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Sidebar - Sticky Navigation */}
        <aside className="w-full lg:w-[400px] lg:h-screen lg:sticky lg:top-0 border-r border-slate-900/5 p-8 lg:p-16 flex flex-col gap-12 bg-white scrollbar-hide">
          <div className="flex-1">
            <nav className="space-y-6">
              {CATEGORIES.map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="group flex items-center gap-4 w-full text-left"
                >
                  <span className={`text-[10px] font-black transition-colors font-sans ${activeCategory === cat ? 'text-neps-red' : 'text-black'}`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-base font-medium transition-all duration-300 font-serif italic ${
                    activeCategory === cat ? 'text-black translate-x-2' : 'text-black/60 group-hover:text-black group-hover:translate-x-1'
                  }`}>
                    {cat}
                  </span>
                  {activeCategory === cat && (
                    <motion.div layoutId="nav-line" className="h-[1px] flex-1 bg-neps-red" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-10 mt-auto pt-12 border-t border-slate-100">
            {/* Search Database - Integrated at Sidebar Bottom */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-black py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-neps-red transition-all placeholder:text-black/20"
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black group-focus-within:text-neps-red transition-colors" />
            </div>

          </div>
        </aside>

        {/* Right Content - Scrollable Grid */}
        <main className="flex-1 p-8 lg:p-16 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-12 lg:gap-20">
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product, idx) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={idx}
                  isHovered={hoveredId === product.id}
                  onHover={() => setHoveredId(product.id)}
                  onLeave={() => setHoveredId(null)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Minimalist Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 pt-12 border-t border-slate-900/5 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black">
                ENTRY {((currentPage - 1) * itemsPerPage) + 1} — {Math.min(currentPage * itemsPerPage, filteredProducts.length)} / {filteredProducts.length}
              </span>
              
              <div className="flex items-center gap-6">
                <button
                  onClick={() => {
                    setCurrentPage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 disabled:opacity-20 hover:text-neps-red transition-colors"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-6 h-6 flex items-center justify-center text-[9px] font-black transition-all ${
                        currentPage === page ? 'text-neps-red border-b border-neps-red' : 'text-black/30 hover:text-black'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 disabled:opacity-20 hover:text-neps-red transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center">
              <h3 className="text-2xl font-black text-slate-200 uppercase tracking-tighter italic">Archive entry not found</h3>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("All Collections");}}
                className="mt-6 text-[10px] font-black uppercase tracking-widest border-b border-slate-900 pb-1"
              >
                Restore View
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

function ProductCard({ product, index, isHovered, onHover, onLeave }: { 
  product: Product, 
  index: number, 
  isHovered: boolean,
  onHover: () => void,
  onLeave: () => void
}) {
  return (
    <Link href={`/product-static/${product.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group cursor-pointer"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Immersive Image Frame */}
        <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-white">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-1000 grayscale hover:grayscale-0"
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? 'grayscale(0)' : 'grayscale(1)'
            }}
          />
          
          {/* Floating Category Tag */}
          <div className="absolute bottom-6 right-6">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white bg-slate-900 px-3 py-1.5 backdrop-blur-md">
              {product.category}
            </span>
          </div>

          {/* Hover Reveal - Subtle Lines */}
          <div className="absolute inset-0 border border-neps-red/0 group-hover:border-neps-red/20 transition-all duration-700 pointer-events-none" />
        </div>

        {/* Narrative Label */}
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-2xl font-medium text-black tracking-tight leading-none group-hover:text-neps-red transition-colors duration-500 font-serif italic">
              {product.name}
            </h3>
            <span className="text-[10px] font-bold text-black/20 font-sans">
              {String(product.id).padStart(3, '0')}
            </span>
          </div>
          
          <p className="text-[13px] text-black font-normal leading-relaxed line-clamp-2 transition-colors font-serif italic">
            {product.description}
          </p>

          <div className="flex items-center gap-3 pt-4 group/btn font-sans">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black group-hover/btn:text-neps-red transition-colors">
              Specifications
            </span>
            <div className="h-[1px] w-8 bg-black/10 group-hover/btn:w-16 group-hover/btn:bg-neps-red transition-all duration-500" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Global styles to hide scrollbars for the sidebar while preserving functionality
const GlobalStyles = () => (
  <style jsx global>{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);
