import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/molecules/FormField";
import { CandidateFormData } from "@/components/candidate-form/types";

export const ExperienceStep: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CandidateFormData>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormField
        label="Cargo más reciente"
        type="input"
        placeholder="Director de Proyectos"
        required
        {...register("experience.recentRole", {
          required: "Este campo es obligatorio",
        })}
        error={errors.experience?.recentRole?.message}
      />

      <FormField
        label="Empresa"
        type="input"
        placeholder="Empresa S.A."
        required
        {...register("experience.recentCompany", {
          required: "Este campo es obligatorio",
        })}
        error={errors.experience?.recentCompany?.message}
      />

      <FormField
        label="Años de experiencia"
        type="select"
        required
        {...register("experience.yearsOfExperience", {
          required: "Selecciona una opción",
        })}
        options={[
          { value: "", label: "Selecciona una opción" },
          { value: "0-2", label: "0 a 2 años" },
          { value: "3-5", label: "3 a 5 años" },
          { value: "6-10", label: "6 a 10 años" },
          { value: "10+", label: "Más de 10 años" },
        ]}
        error={errors.experience?.yearsOfExperience?.message}
      />
    </div>
  );
};
