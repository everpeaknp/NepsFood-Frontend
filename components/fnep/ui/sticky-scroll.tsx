'use client';
import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';

const StickyScrollGallery = forwardRef<HTMLElement>((props, ref) => {
  return (
    <main className='bg-white' ref={ref}>
        <div className='wrapper'>
          <section className='text-neps-blue h-[40vh] md:h-[50vh] w-full bg-white grid place-content-center sticky top-0 z-0'>
            <div className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>

            <div className="relative z-10 text-center px-6">
                <p className="text-neps-gold font-black text-xs md:text-sm tracking-[0.4em] uppercase mb-4">Industrial Vision</p>
                <h2 className='text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-neps-blue'>
                  Our Scale,<br />
                  Your Success.
                </h2>
                <p className="mt-8 text-slate-400 font-bold uppercase tracking-widest text-xs">Scroll to witness the facility</p>
            </div>
          </section>
        </div>

        <section className='text-white w-full bg-white relative z-10'>
          <div className='grid grid-cols-12 gap-2 px-2'>
            {/* Column 1 */}
            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=600&auto=format&fit=crop'
                  alt='Food Prep'
                  className='transition-all duration-300 w-full h-64 md:h-96 align-bottom object-cover rounded-2xl shadow-sm'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop'
                  alt='Spices'
                  className='transition-all duration-300 w-full h-64 md:h-96 align-bottom object-cover rounded-2xl shadow-sm'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop'
                  alt='Grains'
                  className='transition-all duration-300 w-full h-64 md:h-96 align-bottom object-cover rounded-2xl shadow-sm'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=600&auto=format&fit=crop'
                  alt='Momo'
                  className='transition-all duration-300 w-full h-64 md:h-96 align-bottom object-cover rounded-2xl shadow-sm'
                />
              </figure>
            </div>

            {/* Sticky Center Column */}
            <div className='sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3 py-2'>
              <figure className='w-full h-full'>
                <img
                  src='https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=600&auto=format&fit=crop'
                  alt='Scale'
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-2xl shadow-lg border-2 border-white'
                />
              </figure>
              <figure className='w-full h-full'>
                <img
                  src='https://images.unsplash.com/photo-1547514701-42782101795e?w=600&auto=format&fit=crop'
                  alt='Facility'
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-2xl shadow-lg border-2 border-white'
                />
              </figure>
              <figure className='w-full h-full'>
                <img
                  src='https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&auto=format&fit=crop'
                  alt='Production'
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-2xl shadow-lg border-2 border-white'
                />
              </figure>
            </div>

            {/* Column 3 */}
            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1601314167099-232775b3d6fd?w=600&auto=format&fit=crop'
                  alt='Packaged'
                  className='transition-all duration-300 w-full h-64 md:h-96 align-bottom object-cover rounded-2xl shadow-sm'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop'
                  alt='Fresh'
                  className='transition-all duration-300 w-full h-64 md:h-96 align-bottom object-cover rounded-2xl shadow-sm'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop'
                  alt='Ingredients'
                  className='transition-all duration-300 w-full h-64 md:h-96 align-bottom object-cover rounded-2xl shadow-sm'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.unsplash.com/photo-1547514701-42782101795e?w=600&auto=format&fit=crop'
                  alt='Dal'
                  className='transition-all duration-300 w-full h-64 md:h-96 align-bottom object-cover rounded-2xl shadow-sm'
                />
              </figure>
            </div>
          </div>
        </section>
      </main>
  );
});

StickyScrollGallery.displayName = 'StickyScrollGallery';

export default StickyScrollGallery;
