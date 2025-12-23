import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/molecules/FormField";
import { CandidateFormData } from "../types";

export const DocumentsStep: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CandidateFormData>();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-2 border-dashed border-neutral-200 rounded-lg bg-neutral-50/50">
        <h3 className="text-lg font-bold text-surface mb-2 font-sohne-breit">
          Carga de Documentos
        </h3>
        <p className="text-sm text-neutral-600 mb-6">
          Sube tu CV y otros documentos relevantes para completar tu perfil.
        </p>

        <FormField
          label="URL de CV (LinkedIn o Google Drive)"
          type="input"
          placeholder="https://linkedin.com/in/..."
          required
          {...register("documents.cvUrl", {
            required: "La URL del CV es obligatoria",
            pattern: {
              value: /^https?:\/\/.+/,
              message: "URL inválida",
            },
          })}
          error={errors.documents?.cvUrl?.message}
        />

        <FormField
          label="URL de Portafolio (Opcional)"
          type="input"
          placeholder="https://miportafolio.com"
          wrapperClassName="mt-4"
          {...register("documents.portfolioUrl")}
          error={errors.documents?.portfolioUrl?.message}
        />
      </div>

      <div className="bg-primary-600/5 p-4 rounded-lg">
        <p className="text-sm text-surface font-medium">
          Al hacer clic en &quot;Enviar Formulario&quot;, tus datos serán
          guardados y procesados para vincularte con los mejores candidatos.
        </p>
      </div>
    </div>
  );
};
