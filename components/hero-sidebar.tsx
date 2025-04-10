import { BsHandbag } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { userMe } from "@/api/auth/user_me";
import { AuthInterfaces } from "@/interfaces/auth";
import { Button } from "./ui/button";
import { VscMenu } from "react-icons/vsc";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
export default function HeroSidebar () {
    const [userData, setUserData] = useState<AuthInterfaces.UserMeResponse | null>(null);
    
    function getCapitalLetter(str: string): string {
        return str && str.length > 0 ? str.charAt(0).toUpperCase() : "";
    }

    const firstLetter = getCapitalLetter(userData?.firstName || "");
    const lastLetter = getCapitalLetter(userData?.lastName || "");


    useEffect(() => {
        const fetchUser = async () => {
        try {
            const res = await userMe(); // ⚠️ Cambiá esta URL según tu backend
            setUserData(res.data);
            
        } catch (error) {
            console.error("Fallo en fetch:", error);
        }
        };

        fetchUser();
    }, []);

    const handleCloseSession = () => {
      
      localStorage.removeItem("jwt");
      window.location.href = "/";
    }
    return (
        <div className="hero-sidebar">
            <div className="hero-header-controls">
              {/* menu hamburguesa, cuenta, carrito  */}
              <div className="user-cart-actions min-w-[230px] border-[2px] border-neutral-600 rounded-3xl ">
                {/* btn de cuenta y btn de carrito  */}
                <button className=" p-2 px-4 rounded-s-full ">
                  <BsHandbag />
                </button>
                <button className=" rounded-e-full flex gap-1 pl-2 border-s-[2px] w-full justify-between">
                  <div className="items-center justify-center flex flex-col text-base/4 w-full">
                    {userData ? 
                      <>
                        <span className="afacad font-">Bienvenido</span>
                        <span className="font-afacad-fallback">{ userData.firstName } { userData.lastName }</span>
                      </>
                    : 
                      <>
                        <span className="afacad font-">Bienvenido</span>
                        <span className="font-afacad-fallback">Invitado</span>
                      </>
                    }
                    
                  </div>
                  <div className="items-center flex">
                    <Avatar className="">
                      <AvatarImage src="https://github.com/shadcn.pngs" alt="@shadcn" />
                      <AvatarFallback>{firstLetter || "I"}{lastLetter}</AvatarFallback>
                    </Avatar>
                  </div>
                </button>
              </div>
              
              <div className="h-auto">
                
                  <Menubar className="h-full border-none shadow-none p-0">
                    <MenubarMenu>
                      <MenubarTrigger className="p-0 h-full"><Button className="rounded-full h-full"><VscMenu /></Button></MenubarTrigger>
                        <MenubarContent>
                        {
                          !userData?
                            <>
                              <MenubarItem>
                                <a href="/login">Iniciar Sesion</a>
                              </MenubarItem>
                              <MenubarItem>
                                <a href="/register">Registrarme</a>
                              </MenubarItem>
                            </>
                          :
                            <MenubarItem onClick={() => handleCloseSession()}>
                              Cerrar Sesion
                            </MenubarItem>
                        }
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                
              </div>
            </div>
        </div>
    );
}