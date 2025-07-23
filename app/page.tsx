"use client";

import HeroSidebar from "@/components/hero-sidebar";
import ProductListShowMore from "@/components/product-list-show-more";
import Image from "next/image";

export default function Home() {  
  return (
      <section className="section-container pt-4">
        <div className="hero-layout">
          <div className="hero-main relative">
            <div className="absolute top-0 left-0 w-[170px] h-[50px] bg-white z-10 rounded-ee-3xl">
              <div className="playwrite h-full flex justify-center items-center"><i className="text-xl">NandoShop</i></div>
              <div className="hero-curve hero-curve_one max-md:shadow-none"></div>
              <div className="hero-curve hero-curve_two"></div>
            </div>
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden rounded-3xl " >
              <Image 
                src="/images/hero.webp"
                fill={true}
                alt="Picture of the author"        
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full md:w-[470px] h-[65px] md:h-[100px] bg-white z-10 max-sm:rounded-none md:rounded-se-3xl">
                <div className="text-lg md:text-2xl h-full text-[hsl(var(--primary))] flex justify-center items-center  px-4">
                  <div className="relative">
                      <h2 className="inline rowdies-300 "><h2 className="inline afacad">Un  </h2>Diseño <h2 className="inline afacad"> que no solo se mira, sino que se siente con la mirada.</h2></h2> 
                  </div>
                  
                </div>
                <div className="hero-curve hero-curve_three z-[-1]"></div>
                <div className="hero-curve hero-curve_four"></div>
              </div>
          
            </div>

            
          </div>
          <HeroSidebar />
          {/* <div className="hero-curve hero-curve_two"></div> */}
        </div>
        <ProductListShowMore />
      </section>
  );
}
