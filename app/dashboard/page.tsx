"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import data from "./data.json"
import { useEffect, useState } from "react"
import { ProductsInterfaces } from "@/interfaces/products"
import { myProducts } from "@/api/auth/products"

export default function Page() {
  const [productsData, setProductsData] = useState<ProductsInterfaces.myProducts[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
    try {
        const res = await myProducts(); // ⚠️ Cambiá esta URL según tu backend
        setProductsData(res.data);
        
    } catch (error) {
        console.error("Fallo en fetch:", error);
    } finally {
      setLoading(false);
    }
    };

    fetchUser();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
              {loading ? (
                <div className="text-center py-8">Cargando productos...</div>
              ) : (
                <DataTable data={productsData} />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
