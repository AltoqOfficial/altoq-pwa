import React from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/atoms/Checkbox";
import { CandidateFormData } from "../types";

const TECHNICAL_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "SQL",
  "Tailwind CSS",
];

const SOFT_SKILLS = [
  "Liderazgo",
  "Comunicación",
  "Trabajo en equipo",
  "Resolución de problemas",
  "Adaptabilidad",
];

export const SkillsStep: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CandidateFormData>();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-bold text-surface mb-4 font-flexo-bold">
          Habilidades Técnicas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TECHNICAL_SKILLS.map((skill) => (
            <Checkbox
              key={skill}
              label={skill}
              value={skill}
              {...register("skills.technicalSkills", {
                required: "Selecciona al menos una habilidad",
              })}
              error={!!errors.skills?.technicalSkills}
            />
          ))}
        </div>
        {errors.skills?.technicalSkills && (
          <p className="mt-2 text-sm text-primary-600">
            {errors.skills.technicalSkills.message}
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold text-surface mb-4 font-flexo-bold">
          Habilidades Blandas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SOFT_SKILLS.map((skill) => (
            <Checkbox
              key={skill}
              label={skill}
              value={skill}
              {...register("skills.softSkills", {
                required: "Selecciona al menos una habilidad",
              })}
              error={!!errors.skills?.softSkills}
            />
          ))}
        </div>
        {errors.skills?.softSkills && (
          <p className="mt-2 text-sm text-primary-600">
            {errors.skills.softSkills.message}
          </p>
        )}
      </div>
    </div>
  );
};
