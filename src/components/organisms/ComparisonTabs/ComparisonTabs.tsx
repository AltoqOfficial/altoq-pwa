"use client";

import { useState } from "react";

import { Typography } from "@/components/atoms/Typography";
import { COMPARISON_TABS } from "@/constants";

/**
 * ComparisonTabs Component (Organism)
 * Tabbed comparison interface with 6 sections
 *
 * Tabs:
 * I. Perfil General
 * II. Trayectoria Política
 * III. Antecedentes e Investigaciones
 * IV. Propuestas por Temas
 * V. Coherencia con el Plan del Partido
 * VI. Financiamiento
 *
 * Features:
 * - Tab navigation
 * - Two-column comparison layout
 * - Responsive design
 */
export function ComparisonTabs() {
  const [activeTab, setActiveTab] = useState<
    (typeof COMPARISON_TABS)[number]["id"]
  >(COMPARISON_TABS[0].id);

  return (
    <section className="bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tab Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 border-b border-neutral-300 pb-2">
              {COMPARISON_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap rounded-t-lg px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary-600 bg-white text-primary-600"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="rounded-lg bg-white p-8 shadow-sm">
            {activeTab === "perfil-general" && <PerfilGeneralTab />}
            {activeTab === "trayectoria-politica" && <TrayectoriaPoliticaTab />}
            {activeTab === "antecedentes" && <AntecedentesTab />}
            {activeTab === "propuestas" && <PropuestasTab />}
            {activeTab === "coherencia" && <CoherenciaTab />}
            {activeTab === "financiamiento" && <FinanciamientoTab />}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Tab I: Perfil General
 */
function PerfilGeneralTab() {
  return (
    <div>
      <Typography variant="h3" className="mb-6 text-primary-600">
        I. Perfil General
      </Typography>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Candidate */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato A
          </Typography>

          <div className="space-y-3">
            <InfoItem label="Edad" value="48 años" />
            <InfoItem label="Profesión" value="Administradora de empresas" />
            <InfoItem label="Partido" value="Fuerza Popular" />
            <InfoItem
              label="Experiencia Pública"
              value="Congresista (2006-2011)"
            />
            <InfoItem label="Experiencia Privada" value="Empresaria" />
          </div>
        </div>

        {/* Right Candidate */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato B
          </Typography>

          <div className="space-y-3">
            <InfoItem label="Edad" value="60 años" />
            <InfoItem label="Profesión" value="Empresario" />
            <InfoItem label="Partido" value="Renovación Popular" />
            <InfoItem
              label="Experiencia Pública"
              value="Alcalde de Lima (2019-2022)"
            />
            <InfoItem
              label="Experiencia Privada"
              value="CEO de múltiples empresas"
            />
          </div>
        </div>
      </div>

      {/* TODO: Replace with actual candidate data */}
      <div className="mt-6 rounded-lg bg-yellow-50 p-4">
        <Typography variant="small" className="text-yellow-800">
          ℹ️ Esta información es de ejemplo. Será reemplazada con datos reales
          de los candidatos.
        </Typography>
      </div>
    </div>
  );
}

/**
 * Tab II: Trayectoria Política
 */
function TrayectoriaPoliticaTab() {
  return (
    <div>
      <Typography variant="h3" className="mb-6 text-primary-600">
        II. Trayectoria Política
      </Typography>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Candidate Timeline */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato A
          </Typography>

          <TimelineItem
            year="2020 - Actual"
            title="Líder de partido político"
          />
          <TimelineItem
            year="2006 - 2011"
            title="Congresista de la República"
          />
          <TimelineItem
            year="2011 - 2016"
            title="Candidata presidencial (2da vuelta)"
          />
          <TimelineItem
            year="2016 - 2021"
            title="Candidata presidencial (2da vuelta)"
          />
        </div>

        {/* Right Candidate Timeline */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato B
          </Typography>

          <TimelineItem year="2019 - 2022" title="Alcalde de Lima" />
          <TimelineItem
            year="2018 - Actual"
            title="Fundador de partido político"
          />
          <TimelineItem year="2021" title="Candidato presidencial" />
        </div>
      </div>

      {/* TODO: Replace with actual candidate data */}
      <div className="mt-6 rounded-lg bg-yellow-50 p-4">
        <Typography variant="small" className="text-yellow-800">
          ℹ️ Esta información es de ejemplo. Será reemplazada con datos reales
          de los candidatos.
        </Typography>
      </div>
    </div>
  );
}

/**
 * Tab III: Antecedentes e Investigaciones
 */
function AntecedentesTab() {
  return (
    <div>
      <Typography variant="h3" className="mb-6 text-primary-600">
        III. Antecedentes e Investigaciones
      </Typography>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Candidate */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato A
          </Typography>

          <div className="space-y-3">
            <InfoItem label="Antecedentes penales" value="Sí (en proceso)" />
            <InfoItem label="Sentencias" value="Ninguna" />
            <InfoItem
              label="Investigaciones fiscales"
              value="3 casos activos"
            />
            <InfoItem label="Estado" value="En investigación" />
          </div>
        </div>

        {/* Right Candidate */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato B
          </Typography>

          <div className="space-y-3">
            <InfoItem label="Antecedentes penales" value="No" />
            <InfoItem label="Sentencias" value="Ninguna" />
            <InfoItem
              label="Investigaciones fiscales"
              value="1 caso archivado"
            />
            <InfoItem label="Estado" value="Sin investigaciones activas" />
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="mt-6 rounded-lg bg-yellow-50 p-4">
        <Typography variant="small" className="text-yellow-800">
          ℹ️ Esta información es de ejemplo y debe ser verificada con fuentes
          oficiales como el Poder Judicial, Ministerio Público y JNE.
        </Typography>
      </div>
    </div>
  );
}

/**
 * Tab IV: Propuestas por Temas
 */
function PropuestasTab() {
  const temas = [
    "Economía",
    "Educación",
    "Salud",
    "Seguridad",
    "Corrupción",
    "Medio Ambiente",
  ];

  return (
    <div>
      <Typography variant="h3" className="mb-6 text-primary-600">
        IV. Propuestas por Temas
      </Typography>

      <div className="space-y-8">
        {temas.map((tema) => (
          <div key={tema}>
            <Typography variant="h5" className="mb-4 border-b pb-2">
              {tema}
            </Typography>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Candidate */}
              <div className="rounded-lg bg-neutral-50 p-4">
                <Typography variant="h6" className="mb-2">
                  Candidato A
                </Typography>
                <Typography variant="p" className="text-sm text-neutral-600">
                  Propuesta de ejemplo para {tema.toLowerCase()}. Esta será
                  reemplazada con las propuestas reales del plan de gobierno.
                </Typography>
              </div>

              {/* Right Candidate */}
              <div className="rounded-lg bg-neutral-50 p-4">
                <Typography variant="h6" className="mb-2">
                  Candidato B
                </Typography>
                <Typography variant="p" className="text-sm text-neutral-600">
                  Propuesta de ejemplo para {tema.toLowerCase()}. Esta será
                  reemplazada con las propuestas reales del plan de gobierno.
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TODO: Replace with actual proposals */}
      <div className="mt-6 rounded-lg bg-yellow-50 p-4">
        <Typography variant="small" className="text-yellow-800">
          ℹ️ Las propuestas mostradas son de ejemplo. Serán reemplazadas con
          información extraída de los planes de gobierno oficiales registrados
          ante el JNE.
        </Typography>
      </div>
    </div>
  );
}

/**
 * Tab V: Coherencia con el Plan del Partido
 */
function CoherenciaTab() {
  return (
    <div>
      <Typography variant="h3" className="mb-6 text-primary-600">
        V. Coherencia con el Plan del Partido
      </Typography>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Candidate */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato A
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography variant="h6" className="mb-2">
                Coherencia Ideológica
              </Typography>
              <div className="h-4 w-full rounded-full bg-neutral-200">
                <div className="h-4 w-3/4 rounded-full bg-green-500" />
              </div>
              <Typography variant="small" className="mt-1 text-neutral-600">
                75% de coherencia con ideario del partido
              </Typography>
            </div>

            <div>
              <Typography variant="h6" className="mb-2">
                Puntos clave alineados
              </Typography>
              <ul className="list-inside list-disc space-y-1 text-sm text-neutral-600">
                <li>Política económica liberal</li>
                <li>Reforma del Estado</li>
                <li>Seguridad ciudadana</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Candidate */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato B
          </Typography>

          <div className="space-y-4">
            <div>
              <Typography variant="h6" className="mb-2">
                Coherencia Ideológica
              </Typography>
              <div className="h-4 w-full rounded-full bg-neutral-200">
                <div className="h-4 w-4/5 rounded-full bg-green-500" />
              </div>
              <Typography variant="small" className="mt-1 text-neutral-600">
                80% de coherencia con ideario del partido
              </Typography>
            </div>

            <div>
              <Typography variant="h6" className="mb-2">
                Puntos clave alineados
              </Typography>
              <ul className="list-inside list-disc space-y-1 text-sm text-neutral-600">
                <li>Libre mercado</li>
                <li>Reducción del gasto público</li>
                <li>Inversión privada</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: Replace with actual analysis */}
      <div className="mt-6 rounded-lg bg-yellow-50 p-4">
        <Typography variant="small" className="text-yellow-800">
          ℹ️ Esta información es de ejemplo. El análisis de coherencia será
          realizado comparando declaraciones públicas con el plan de gobierno
          del partido.
        </Typography>
      </div>
    </div>
  );
}

/**
 * Tab VI: Financiamiento
 */
function FinanciamientoTab() {
  return (
    <div>
      <Typography variant="h3" className="mb-6 text-primary-600">
        VI. Financiamiento
      </Typography>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Candidate */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato A
          </Typography>

          <div className="space-y-3">
            <InfoItem label="Financiamiento total" value="S/ 5,000,000" />
            <InfoItem
              label="Financiamiento público"
              value="S/ 1,000,000 (20%)"
            />
            <InfoItem
              label="Financiamiento privado"
              value="S/ 4,000,000 (80%)"
            />
            <InfoItem label="Transparencia" value="Declaraciones completas" />
            <InfoItem label="Fuente" value="ONPE / Declaración jurada" />
          </div>
        </div>

        {/* Right Candidate */}
        <div className="space-y-4">
          <Typography variant="h5" className="border-b pb-2">
            Candidato B
          </Typography>

          <div className="space-y-3">
            <InfoItem label="Financiamiento total" value="S/ 3,500,000" />
            <InfoItem label="Financiamiento público" value="S/ 500,000 (14%)" />
            <InfoItem
              label="Financiamiento privado"
              value="S/ 3,000,000 (86%)"
            />
            <InfoItem label="Transparencia" value="Declaraciones completas" />
            <InfoItem label="Fuente" value="ONPE / Declaración jurada" />
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <Typography variant="small" className="text-blue-800">
          💡 Los datos de financiamiento provienen de la ONPE (Oficina Nacional
          de Procesos Electorales) y las declaraciones juradas de los
          candidatos.
        </Typography>
      </div>

      {/* TODO: Replace with actual data */}
      <div className="mt-4 rounded-lg bg-yellow-50 p-4">
        <Typography variant="small" className="text-yellow-800">
          ℹ️ Esta información es de ejemplo. Será actualizada con datos
          oficiales de la ONPE.
        </Typography>
      </div>
    </div>
  );
}

/**
 * Helper Components
 */

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex justify-between border-b border-neutral-100 py-2">
      <Typography variant="small" className="font-medium text-neutral-700">
        {label}
      </Typography>
      <Typography variant="small" className="text-neutral-900">
        {value}
      </Typography>
    </div>
  );
}

interface TimelineItemProps {
  year: string;
  title: string;
}

function TimelineItem({ year, title }: TimelineItemProps) {
  return (
    <div className="flex gap-4 border-l-2 border-primary-600 pl-4">
      <div className="shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
          •
        </div>
      </div>
      <div>
        <Typography variant="small" className="font-medium text-neutral-900">
          {year}
        </Typography>
        <Typography variant="small" className="text-neutral-600">
          {title}
        </Typography>
      </div>
    </div>
  );
}
