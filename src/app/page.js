"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Verifica si el usuario está autenticado y redirige según sea necesario
    if (status === "authenticated") {
      router.push("/main");
    } else if (status === "loading") {
      // Espera a que la sesión se cargue antes de realizar redirecciones
      // Puedes agregar un mensaje de carga o cualquier otra lógica aquí
    } else {
      router.push("/login");
      // El usuario no está autenticado, puede acceder a la página de inicio de sesión
    }
  }, [status, router]);

  return null;
}

export default HomePage;
