"use client"
import { useRouter } from "next/navigation" 

// app/terms/page.tsx o donde prefieras montarlo
export default function TermsPage() {
    const router = useRouter()
    return (
      <main className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            📝 Términos y Condiciones
          </h1>

          <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md mb-6 text-sm font-medium">
            ⚠️ Sí, sí… puse la página de Términos y Condiciones.  
            <span className="font-semibold"> No está vacía.</span>  
            Si vos pensaste que pondria solo un <code className="bg-white px-1 py-0.5 rounded text-red-500">#</code>…  
            <span className="text-red-600 font-bold"> te equivocaste.</span>  
            <span className="italic"> Perdiste.</span>  
          </div>

          <p className="mb-4 text-gray-700">
            Bienvenido/a a este rincón oculto de Internet. Si estás leyendo esto, probablemente:
          </p>
          <ul className="list-disc list-inside mb-6 text-gray-700">
            <li>Te dio curiosidad,</li>
            <li>Tocaste algún botón que claramente no estaba en la publicación,</li>
            <li>O simplemente querés ver hasta dónde llega todo esto.</li>
          </ul>
  
          <p className="mb-6 text-gray-700">
            Y por eso, antes que nada, <span className="font-semibold">felicitaciones</span>, sos parte de una minoría selecta con iniciativa, alma de tester y probablemente un poquito de ansiedad 😅.
          </p>
  
          <h2 className="text-xl font-semibold mb-2 text-gray-800">📌 Aclaraciones importantes:</h2>
          <ul className="list-disc list-inside mb-6 text-gray-700">
            <li>Esta página es una versión de prueba. No es real, no vende nada, no roba datos (al menos no intencionalmente 😇).</li>
            <li>Si te topaste con errores, botones raros o cosas sin sentido… sí, es parte del plan.</li>
            <li>
              Cualquier cosa que pongas acá (emails, contraseñas, etc.) <strong>deberías asumir que no es seria</strong>.
            </li>
          </ul>
  
          <div className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-6">
            “Si llegaste hasta acá significa que se te dio por probar los botones que claramente no subí en la publicación de linkedin. Jajajaja. Sos de los míos.”
          </div>
  
          <p className="text-center text-sm text-gray-500">
            Gracias por pasar. En una de esas te ganás un sticker por el aguante 💻✨
          </p>
          <button
            onClick={() => router.back()}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
            Volver derrotado 😞
            </button>
        </div>
      </main>
    )
  }
  