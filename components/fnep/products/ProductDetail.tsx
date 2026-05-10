'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Leaf, Recycle, MapPin, AlertCircle, Info, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Product, NutritionInfo } from '@/app/product-static/products';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-neps-red selection:text-white pt-24 font-sans">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          {/* LEFT: Architectural Image Frame */}
          <div className="lg:sticky lg:top-32 space-y-8 pb-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] bg-slate-50 overflow-hidden"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
              />
              
              {/* Sourcing Badge */}
              <div className="absolute top-8 left-8">
                <div className="bg-black text-white px-4 py-2 flex items-center gap-3">
                  <MapPin className="w-3 h-3 text-neps-red" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{product.origin}</span>
                </div>
              </div>
            </motion.div>

            {/* Claims Badges - Centered below image */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              {product.claims.map((claim) => (
                <div key={claim} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neps-red" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/80">{claim}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Editorial Content */}
          <div className="space-y-16 pb-32">
            
            {/* 1. Header Section */}
            <header className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-neps-red">
                  Archive No. {product.sku}
                </span>
                <h1 className="text-5xl lg:text-8xl font-medium tracking-tight leading-[0.85] font-serif italic">
                  {product.name}
                </h1>
                {product.nativeName && (
                  <p className="text-4xl font-medium text-black/20 font-serif mt-2">
                    {product.nativeName}
                  </p>
                )}
              </div>
              <div className="space-y-6 max-w-xl">
                <p className="text-xl text-black font-serif italic leading-relaxed">
                  {product.subtitle || product.description}
                </p>
                {product.fullDescription && (
                  <p className="text-sm text-black/60 leading-relaxed font-sans">
                    {product.fullDescription}
                  </p>
                )}
              </div>
            </header>

            {/* 2. Selection & Pricing */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/5">
              <div className="space-y-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Select Pack Size</span>
                <div className="flex flex-wrap gap-3">
                  {product.weights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${
                        selectedWeight === w ? 'bg-black text-white border-black' : 'bg-transparent text-black/40 border-black/10 hover:border-black/40'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Retail Value</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-medium font-serif italic">AUD ${product.price}</span>
                  <span className="text-[10px] font-black text-black/20 uppercase tracking-widest">Inc. GST</span>
                </div>
              </div>
            </section>

            {/* 3. Specifications & Safety */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 pt-12 border-t border-black/5">
              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-neps-red" />
                  Ingredients List
                </h3>
                <p className="text-sm leading-loose text-black/80 font-serif italic">
                  {product.ingredients.join(', ')}
                </p>
                
                <div className="bg-slate-50 p-6 space-y-4 border-l-4 border-neps-red">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-neps-red flex items-center gap-2">
                    <AlertCircle className="w-3 h-3" />
                    Allergen Disclosure
                  </h4>
                  <p className="text-[11px] leading-relaxed font-bold uppercase tracking-tight">
                    {product.allergens}
                  </p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-black">Storage Standards</h3>
                  <p className="text-sm leading-loose text-black/80 font-serif italic">
                    {product.storage}
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-black">Preparation Methods</h3>
                  <ul className="space-y-4">
                    {product.directions.map((dir, i) => (
                      <li key={i} className="flex items-start gap-4 text-xs font-medium">
                        <span className="text-black/20 font-black">0{i+1}</span>
                        <span className="text-black/60">{dir}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Nutrition Information Panel (NIP) - Architectural Table */}
            <section className="pt-16 border-t border-black/5">
              <div className="space-y-8">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-medium font-serif italic">Nutrition Information</h2>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">
                      Standardized for Australian Food Standards
                    </p>
                  </div>
                  <div className="flex gap-12">
                    <div className="text-right">
                      <span className="block text-[8px] font-black text-black/30 uppercase tracking-widest">Servings / Pack</span>
                      <span className="text-xl font-medium font-serif">{product.nutrition.servingsPerPackage}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] font-black text-black/30 uppercase tracking-widest">Serving Size</span>
                      <span className="text-xl font-medium font-serif">{product.nutrition.servingSize}</span>
                    </div>
                  </div>
                </header>

                <div className="border border-black/5">
                  <div className="grid grid-cols-3 bg-black text-white p-4">
                    <div className="text-[9px] font-black uppercase tracking-widest">Nutrient Profile</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-right">Avg. Qty / Serving</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-right">Avg. Qty / 100g</div>
                  </div>
                  <div className="divide-y divide-black/5">
                    <NIPRow label="Energy" value={product.nutrition.energy} />
                    <NIPRow label="Protein" value={product.nutrition.protein} />
                    <NIPRow label="Fat, Total" value={product.nutrition.fatTotal} />
                    <NIPRow label="— Saturated" value={product.nutrition.fatSaturated} indent />
                    <NIPRow label="Carbohydrate" value={product.nutrition.carbohydrate} />
                    <NIPRow label="— Sugars" value={product.nutrition.sugars} indent />
                    {product.nutrition.fiber && <NIPRow label="Dietary Fiber" value={product.nutrition.fiber} />}
                    <NIPRow label="Sodium" value={product.nutrition.sodium} />
                    {product.nutrition.potassium && <NIPRow label="Potassium" value={product.nutrition.potassium} />}
                  </div>
                </div>

                <p className="text-[9px] text-black/40 font-bold uppercase italic leading-loose">
                  * All specified values are averages. Batch codes and Best Before dates are verified on physical pack labels for traceability.
                </p>
              </div>
            </section>

            {/* 5. Business & Compliance Footer */}
            <footer className="pt-16 border-t border-black/5 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Recycle className="w-12 h-12 stroke-[0.5] text-green-600" />
                  <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-black/40">
                    Packaging recyclable where <br />
                    soft-plastic recycling is available.
                  </p>
                </div>
              </div>
              <div className="space-y-8 text-right md:text-left">
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-black/30 uppercase tracking-[0.2em]">Exclusively Imported By</span>
                  <p className="text-[10px] font-bold uppercase tracking-tight text-black">
                    Neps Foods Australia <br />
                    Registered Importer | Sydney, Australia
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-black/30 uppercase tracking-[0.2em]">Contact & Support</span>
                  <a href="https://www.nepsfoods.com.au" className="block text-[10px] font-bold text-neps-red uppercase border-b border-neps-red w-fit">
                    www.nepsfoods.com.au
                  </a>
                </div>
              </div>
            </footer>
          </div>

        </div>
      </div>
    </div>
  );
}

function NIPRow({ label, value, indent = false }: { label: string, value: { perServe: string, per100g: string }, indent?: boolean }) {
  return (
    <div className="grid grid-cols-3 p-4 hover:bg-slate-50 transition-colors">
      <div className={`text-[11px] font-bold uppercase tracking-tight ${indent ? 'pl-6 text-black/40' : 'text-black'}`}>
        {label}
      </div>
      <div className="text-[11px] font-medium text-right font-mono tracking-tighter">
        {value.perServe}
      </div>
      <div className="text-[11px] font-medium text-right font-mono tracking-tighter">
        {value.per100g}
      </div>
    </div>
  );
}
