"use client";

import HeroSidebar from "@/components/hero-sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

export default function Home() {
  const [hovered, setHovered] = useState(false);
  
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null); 
  
  const handleMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setHovered(false); 
    }, 1000);
  };
  const handleMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current); // Cancelar el timeout si vuelve a entrar antes del segundo
    }
    setHovered(true);
  };
  return (
      <section className="section-container pt-4">
        <div className="hero-layout">
          <div className="hero-main  relative">
            <div className="absolute top-0 left-0 w-[170px] h-[50px] bg-white z-10 rounded-ee-3xl">
              <div className="playwrite h-full flex justify-center items-center"><i className="text-xl">NandoShop</i></div>
              <div className="hero-curve hero-curve_one"></div>
              <div className="hero-curve hero-curve_two"></div>
            </div>
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden rounded-3xl " >
              <Image 
                src="/images/hero.webp"
                fill={true}
                alt="Picture of the author"        
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-[470px] h-[100px] bg-white z-10 rounded-se-3xl">
                <div className="text-3xl h-full text-[hsl(var(--primary))] flex justify-center items-center  px-4">
                  <div className="relative">
                      <h2 className="inline rowdies-300"><h2 className="inline afacad">Un  </h2>Diseño <h2 className="inline afacad"> que no solo se mira, sino que se siente con la mirada.</h2></h2> 
                      <Button
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className={`absolute left-0 bottom-0 z-100 border-white btn-shop-now-animation 
                        flex items-center justify-start transition-all duration-1000 ease-in-out overflow-hidden 
                        bg-[hsl(var(--primary))] text-white rounded-full left-[330px] gap-0
                        ${hovered ? 'w-48 px-4' : 'w-12 pl-3'}
                      `}
                    >
                      <MdArrowOutward className="w-5 h-5 min-w-[20px]" />
                      <span className={`ml-2 whitespace-nowrap transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                        COMPRAR AHORA
                      </span>
                    </Button>
                   
                  </div>
                  
                </div>
                <div className="hero-curve hero-curve_three z-[-1]"></div>
                <div className="hero-curve hero-curve_four"></div>


                <div className={`absolute bottom-0 bg-white right-[0px] z-[-1] w-[90px] h-[67px]  z-10 rounded-se-3xl ${hovered ? 'animate-slideRight' : 'animate-slideLeft'}`}>
                  <div className="relative  ">
                    <div className="hero-curve hero-curve_five"></div>
                  </div>
                </div>
              </div>
          
            </div>

            
          </div>
          <HeroSidebar />
          
          {/* <div className="hero-curve hero-curve_two"></div> */}
        </div>
      </section>
  );
}
