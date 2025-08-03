// app/(shop)/layout.tsx o app/products/[id]/layout.tsx
import HeroSidebar from "@/components/hero-sidebar"; // ajustá el import si está en otra ruta
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white section-container pt-4">
      {/* Header */}
      <div className="flex justify-between">
        <div className="playwrite h-full flex justify-center items-center">
          <i className="text-xl">NandoShop</i>
        </div>
        <HeroSidebar />
      </div>

      {/* Contenido principal */}
      <main className="mx-auto  ">
        {children}
      </main>
    </div>
  );
}
