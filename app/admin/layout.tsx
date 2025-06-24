"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { useEffect, useState } from "react"
import { ProductsInterfaces } from "@/interfaces/products"
import { myProducts } from "@/api/auth/products"
import { Tabs } from "@radix-ui/react-tabs"

export default function LayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                <Tabs defaultValue="outline" className="flex w-full flex-col justify-start gap-6">
                    <div className="flex items-center justify-between px-4 lg:px-6">

                        {children}
                    </div>
                </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
