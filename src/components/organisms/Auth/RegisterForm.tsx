"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Input, Select } from "@/components/atoms";

/**
 * RegisterForm Component
 *
 * Formulario de registro para la página de autenticación.
 *
 * @example
 * ```tsx
 * <RegisterForm />
 * ```
 */
export const RegisterForm = memo(function RegisterForm() {
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
        <Input type="text" placeholder="Nombre" size="lg" />
        <Select
          placeholder="Rango de edad"
          size="lg"
          options={[
            { value: "1", label: "18 - 21" },
            { value: "2", label: "22 - 39" },
            { value: "3", label: "40 a más" },
          ]}
          error={true}
          errorMessage="Este campo es requerido"
        />
        <Input type="email" placeholder="Correo" size="lg" />
        <Input type="password" placeholder="Contraseña" size="lg" />
        <Input type="password" placeholder="Confirmar contraseña" size="lg" />
        <Select
          placeholder="¿Qué te motiva a informarte sobre política?"
          size="lg"
          options={[
            { value: "1", label: "Tomar mejores decisiones antes de votar" },
            {
              value: "2",
              label: "Saber si los políticos cumplen lo que prometen",
            },
            {
              value: "3",
              label: "Quiero información confiable para mi análisis",
            },
            {
              value: "4",
              label: "Quiero impulsar el cambio con información real",
            },
          ]}
          error={true}
          errorMessage="Este campo es requerido"
        />
        <Select
          placeholder="¿Con qué perfil te identificas?"
          size="lg"
          options={[
            { value: "1", label: "Tomar mejores decisiones antes de votar" },
            {
              value: "2",
              label: "Saber si los políticos cumplen lo que prometen",
            },
            {
              value: "3",
              label: "Quiero información confiable para mi análisis",
            },
            {
              value: "4",
              label: "Quiero impulsar el cambio con información real",
            },
          ]}
          error={true}
          errorMessage="Este campo es requerido"
        />
      </form>

      <Button size="lg" className="mt-5">
        Crear cuenta
      </Button>

      <div className="flex justify-center gap-4 mt-5 flex-wrap">
        <Typography>¿Ya tienes una cuenta?</Typography>
        <Link
          href="/login"
          className="text-[#FF2727] underline text-lg hover:opacity-80 transition-opacity cursor-pointer"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
});
