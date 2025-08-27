import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";

export default function Admin() {
    return (
        <div className="w-full flex flex-wrap">

            <div className="w-full *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Card className="@container/card">
                    <CardHeader>
                    <CardDescription>Visitas</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        2003
                    </CardTitle>
                    
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Tendencias de alza este mes <HiArrowTrendingUp />
                    </div>
                    <div className="text-muted-foreground">
                        Visitas en los ultimos 6 meses
                    </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                    <CardDescription>Vendedores</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        1,211
                    </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Bajo un 20% este ultimo mes <HiArrowTrendingDown />
                    </div>
                    <div className="text-muted-foreground">
                        Vendedores con cuenta activa
                    </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                    <CardDescription>Usuarios</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        45,678
                    </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Fuerte retención de usuarios este mes <HiArrowTrendingUp />
                    </div>
                    <div className="text-muted-foreground">Cuentas activas de clientes</div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                    <CardDescription>Pagos realizados</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        47
                    </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Aumento un 20% este ultimo mes  <HiArrowTrendingUp />
                    </div>
                    <div className="text-muted-foreground">Pagos realizados en la plataforma</div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}