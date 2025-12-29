"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Input } from "@/components/atoms";

/**
 * LoginForm Component
 *
 * Formulario de inicio de sesión para la página de autenticación.
 *
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 */
export const LoginForm = memo(function LoginForm() {
  return (
    <div className="bg-[#FEFEFE] w-[30%] min-w-80 p-10 rounded-2xl flex flex-col mx-auto">
      <div className="w-full flex justify-center">
        <Image
          src="/images/logo/altoq.webp"
          alt="Altoq Logo"
          width={120}
          height={50}
          className="py-2 mb-8"
        />
      </div>

      <form className="space-y-6 mb-5">
        <Input type="email" placeholder="Correo" size="lg" />
        <Input type="password" placeholder="Contraseña" size="lg" />
      </form>

      <Link
        href="/forgot-password"
        className="text-[#FF2727] text-lg flex justify-end hover:underline transition-all cursor-pointer"
      >
        ¿Olvidaste tu contraseña?
      </Link>

      <Button size="lg" className="mt-5">
        Iniciar sesión
      </Button>

      <div className="flex justify-center gap-4 mt-5 flex-wrap">
        <Typography>¿No tienes una cuenta?</Typography>
        <Link
          href="/register"
          className="text-[#FF2727] underline text-lg hover:opacity-80 transition-opacity cursor-pointer"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
});
