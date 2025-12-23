import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/molecules/FormField";
import { CandidateFormData } from "@/components/candidate-form/types";

export const EducationStep: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CandidateFormData>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormField
        label="Grado académico más alto"
        type="select"
        required
        {...register("education.highestDegree", {
          required: "Este campo es obligatorio",
        })}
        options={[
          { value: "", label: "Selecciona un grado" },
          { value: "bachiller", label: "Bachiller" },
          { value: "titulado", label: "Titulado" },
          { value: "maestria", label: "Maestría" },
          { value: "doctorado", label: "Doctorado" },
        ]}
        error={errors.education?.highestDegree?.message}
      />

      <FormField
        label="Institución"
        type="input"
        placeholder="Universidad Nacional..."
        required
        {...register("education.institution", {
          required: "Este campo es obligatorio",
        })}
        error={errors.education?.institution?.message}
      />

      <FormField
        label="Año de graduación"
        type="input"
        placeholder="Ej: 2020"
        required
        {...register("education.graduationYear", {
          required: "Este campo es obligatorio",
          pattern: {
            value: /^[0-9]{4}$/,
            message: "Año inválido",
          },
        })}
        error={errors.education?.graduationYear?.message}
      />
    </div>
  );
};
