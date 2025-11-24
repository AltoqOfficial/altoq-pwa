"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  profession: string;
  specialty: string;
  reason: string;
  cv?: File | null;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  profession?: string;
  specialty?: string;
  reason?: string;
}

/**
 * VolunteerForm Component (Organism)
 * Complete volunteer registration form
 *
 * Features:
 * - Two-column layout (image left, form right)
 * - Required fields: firstName, lastName, phone, email, profession, specialty, reason
 * - Optional: CV upload
 * - Form validation
 * - Success/error states
 * - File upload handling
 */
export function VolunteerForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    profession: "",
    specialty: "",
    reason: "",
    cv: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Los apellidos son requeridos";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Formato de teléfono inválido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de correo inválido";
    }

    if (!formData.profession.trim()) {
      newErrors.profession = "La profesión es requerida";
    }

    if (!formData.specialty.trim()) {
      newErrors.specialty = "La especialidad es requerida";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Este campo es requerido";
    } else if (formData.reason.length < 20) {
      newErrors.reason = "Describe con al menos 20 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo debe ser menor a 5MB");
        return;
      }
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Solo se permiten archivos PDF o Word");
        return;
      }
      setFormData((prev) => ({ ...prev, cv: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission
      // const formDataToSend = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   if (value) formDataToSend.append(key, value);
      // });
      // await fetch('/api/volunteer', { method: 'POST', body: formDataToSend });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          profession: "",
          specialty: "",
          reason: "",
          cv: null,
        });
        setFileName("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Hubo un error al enviar el formulario. Por favor, intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-neutral-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Side - Image */}
            <div className="flex items-center justify-center">
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-xl lg:h-[600px]">
                {/* TODO: Replace with actual volunteer image */}
                <Image
                  src="/images/volunteer-placeholder.jpg"
                  alt="Persona trabajando en laptop"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Fallback content if image doesn't load */}
                <div className="flex h-full items-center justify-center bg-linear-to-br from-primary-100 to-primary-200">
                  <Typography variant="h3" className="text-primary-600">
                    Únete al Equipo
                  </Typography>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              {isSuccess ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
                    <svg
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <Typography variant="h3" className="mb-4">
                    ¡Registro exitoso!
                  </Typography>
                  <Typography variant="p" className="text-neutral-600">
                    Gracias por tu interés en unirte a Altoq. Te contactaremos
                    pronto.
                  </Typography>
                </div>
              ) : (
                <>
                  {/* Form Header */}
                  <div className="mb-8">
                    <Typography variant="h3" className="mb-2">
                      Datos Generales (requerido)
                    </Typography>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: First Name & Last Name */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* First Name */}
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-neutral-700"
                        >
                          Nombres Completos
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-neutral-300"
                          } bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50`}
                          placeholder="Juan Carlos"
                        />
                        {errors.firstName && (
                          <Typography
                            variant="small"
                            className="mt-1 text-red-500"
                          >
                            {errors.firstName}
                          </Typography>
                        )}
                      </div>

                      {/* Last Name */}
                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-2 block text-sm font-medium text-neutral-700"
                        >
                          Apellidos Completos
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-neutral-300"
                          } bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50`}
                          placeholder="Pérez García"
                        />
                        {errors.lastName && (
                          <Typography
                            variant="small"
                            className="mt-1 text-red-500"
                          >
                            {errors.lastName}
                          </Typography>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone & Email */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-neutral-700"
                        >
                          Número de Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border ${
                            errors.phone
                              ? "border-red-500"
                              : "border-neutral-300"
                          } bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50`}
                          placeholder="+51 999 999 999"
                        />
                        {errors.phone && (
                          <Typography
                            variant="small"
                            className="mt-1 text-red-500"
                          >
                            {errors.phone}
                          </Typography>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-neutral-700"
                        >
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border ${
                            errors.email
                              ? "border-red-500"
                              : "border-neutral-300"
                          } bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50`}
                          placeholder="tu@email.com"
                        />
                        {errors.email && (
                          <Typography
                            variant="small"
                            className="mt-1 text-red-500"
                          >
                            {errors.email}
                          </Typography>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Profession & Specialty */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Profession */}
                      <div>
                        <label
                          htmlFor="profession"
                          className="mb-2 block text-sm font-medium text-neutral-700"
                        >
                          Profesión
                        </label>
                        <input
                          type="text"
                          id="profession"
                          name="profession"
                          value={formData.profession}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border ${
                            errors.profession
                              ? "border-red-500"
                              : "border-neutral-300"
                          } bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50`}
                          placeholder="Ej: Ingeniero de Sistemas"
                        />
                        {errors.profession && (
                          <Typography
                            variant="small"
                            className="mt-1 text-red-500"
                          >
                            {errors.profession}
                          </Typography>
                        )}
                      </div>

                      {/* Specialty */}
                      <div>
                        <label
                          htmlFor="specialty"
                          className="mb-2 block text-sm font-medium text-neutral-700"
                        >
                          Especialidad
                        </label>
                        <input
                          type="text"
                          id="specialty"
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border ${
                            errors.specialty
                              ? "border-red-500"
                              : "border-neutral-300"
                          } bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50`}
                          placeholder="Ej: Desarrollo Web"
                        />
                        {errors.specialty && (
                          <Typography
                            variant="small"
                            className="mt-1 text-red-500"
                          >
                            {errors.specialty}
                          </Typography>
                        )}
                      </div>
                    </div>

                    {/* Reason */}
                    <div>
                      <label
                        htmlFor="reason"
                        className="mb-2 block text-sm font-medium text-neutral-700"
                      >
                        Razón de unirse al proyecto
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows={5}
                        value={formData.reason}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg border ${
                          errors.reason
                            ? "border-red-500"
                            : "border-neutral-300"
                        } bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50`}
                        placeholder="Cuéntanos por qué te gustaría ser parte de Altoq..."
                      />
                      {errors.reason && (
                        <Typography
                          variant="small"
                          className="mt-1 text-red-500"
                        >
                          {errors.reason}
                        </Typography>
                      )}
                    </div>

                    {/* CV Upload (Optional) */}
                    <div>
                      <label
                        htmlFor="cv"
                        className="mb-2 block text-sm font-medium text-neutral-700"
                      >
                        Subir CV (Opcional)
                      </label>
                      <div className="flex items-center gap-4">
                        <label
                          htmlFor="cv"
                          className="cursor-pointer rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                        >
                          Buscar CV
                        </label>
                        <input
                          type="file"
                          id="cv"
                          name="cv"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        {fileName && (
                          <Typography
                            variant="small"
                            className="text-neutral-600"
                          >
                            {fileName}
                          </Typography>
                        )}
                      </div>
                      <Typography
                        variant="small"
                        className="mt-1 text-neutral-500"
                      >
                        PDF o Word, máximo 5MB
                      </Typography>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? "Enviando..." : "Enviar"}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
