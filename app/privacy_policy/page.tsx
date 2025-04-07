"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PrivacyPolicyPage() {
  const router = useRouter()

  const handleBack = () => {
    if (document.referrer) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-8">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-3xl font-bold mb-4 text-center">Política de Privacidad</h1>

        <p className="text-gray-700 mb-6">
          ¿Otra vez? ¿No aprendiste con la página de Términos y Condiciones?
          De seguro esta vez viste la esquina de la página para ver si era un enlace… y lo abriste igual.
          Entendé que <span className="font-semibold text-red-500">esto lo escribí con una empanada en una mano y el mouse en la otra</span>, y aún así te tomaste el tiempo de leerlo. Sos un campeón.
        </p>

        <p className="text-gray-700 mb-6">
          Sí, sí, también me acordé de subir la de Política de Privacidad. <span className="font-bold">Perdiste de vuelta.</span>
          Aunque admito que <span className="italic">casi me olvido de subir el PR de esto</span>.
        </p>

        <p className="text-gray-700 mb-6">
          Si no entendés qué está pasando porque decidiste tocar el enlace de Política de Privacidad primero,
          te recomiendo que vayas a la página de{" "}
          <Link href="/terms_and_conditions" className="text-blue-600 underline hover:text-blue-800 transition-colors">
            Términos y Condiciones
          </Link>{" "}
          para entender el lore completo.
        </p>

        <button
          onClick={handleBack}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          Volver derrotado X2😞
        </button>
      </div>
    </div>
  )
}
