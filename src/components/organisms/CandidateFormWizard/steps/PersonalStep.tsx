import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "../../../molecules/FormField";
import { CandidateFormData } from "../types";

export const PersonalStep: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CandidateFormData>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Nombre(s)"
          type="input"
          placeholder="Juan"
          required
          {...register("personal.firstName", {
            required: "El nombre es obligatorio",
          })}
          error={errors.personal?.firstName?.message}
        />
        <FormField
          label="Apellidos"
          type="input"
          placeholder="Pérez"
          required
          {...register("personal.lastName", {
            required: "Los apellidos son obligatorios",
          })}
          error={errors.personal?.lastName?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Correo Electrónico"
          type="input"
          placeholder="juan.perez@ejemplo.com"
          required
          {...register("personal.email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico inválido",
            },
          })}
          error={errors.personal?.email?.message}
        />
        <FormField
          label="Teléfono"
          type="input"
          placeholder="+51 987 654 321"
          required
          {...register("personal.phone", {
            required: "El teléfono es obligatorio",
          })}
          error={errors.personal?.phone?.message}
        />
      </div>

      <FormField
        label="Resumen Profesional"
        type="textarea"
        placeholder="Cuéntanos un poco sobre tu trayectoria..."
        required
        rows={4}
        {...register("personal.professionalSummary", {
          required: "El resumen profesional es obligatorio",
        })}
        error={errors.personal?.professionalSummary?.message}
      />
    </div>
  );
};
