"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Share2,
  Filter,
  Users,
  TrendingUp,
  AlertTriangle,
  Download,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { getDashboardData } from "@/lib/analytics/aggregation";

const MOCK_DISTRICTS = [
  "Todos",
  "Carabayllo",
  "San Juan de Lurigancho",
  "Lince",
  "Miraflores",
  "Trujillo",
];

const TOPIC_COLORS = ["#EF4444", "#3B82F6", "#F59E0B", "#10B981", "#8B5CF6"];

export default function IntelligenceDashboard() {
  const searchParams = useSearchParams();
  const [selectedDistrict, setSelectedDistrict] = useState(
    searchParams.get("district") || "Carabayllo"
  );
  const [timeRange, setTimeRange] = useState("7d");

  // Get Data from Mock Aggregation Logic
  const { topics, trends, insight } = useMemo(
    () => getDashboardData(selectedDistrict),
    [selectedDistrict]
  );

  const chartData = topics.map((t, i) => ({
    name: t.name,
    value: t.value,
    color: TOPIC_COLORS[i % TOPIC_COLORS.length],
  }));

  // Generate Share Link
  const shareLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/formulario-candidato?distrito=${selectedDistrict.toLowerCase()}`
      : `https://altoq.pe/formulario-candidato?distrito=${selectedDistrict.toLowerCase()}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Enlace copiado: " + shareLink);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-200 dark:border-white/10 pb-6 transition-colors duration-300">
        <div>
          <h1 className="text-3xl font-flexo-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300">
            Altoq{" "}
            <span className="text-primary-600 dark:text-primary-500 transition-colors duration-300">
              Intelligence
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1 transition-colors duration-300">
            Panel de Control Estratégico • Versión Piloto
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-colors duration-300"
          >
            {MOCK_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <Button
            variant="secondary"
            size="sm"
            onClick={copyLink}
            className="gap-2 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm transition-all duration-300"
          >
            <Share2 size={16} />
            Copiar Enlace
          </Button>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Ciudadanos Encuestados"
          value="1,248"
          trend="+12% vs ayer"
          icon={
            <Users
              size={20}
              className="text-blue-500 dark:text-blue-400 transition-colors duration-300"
            />
          }
        />
        <KpiCard
          title="Principal Preocupación"
          value="Corrupción"
          trend="Alta Intensidad"
          icon={
            <AlertTriangle
              size={20}
              className="text-red-500 dark:text-red-400 transition-colors duration-300"
            />
          }
        />
        <KpiCard
          title="Sentimiento General"
          value="Escéptico"
          trend="Necesita Propuestas"
          icon={
            <TrendingUp
              size={20}
              className="text-amber-500 dark:text-amber-400 transition-colors duration-300"
            />
          }
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Concerns Chart */}
        <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 rounded-2xl p-6 shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white transition-colors duration-300">
              Prioridades del Distrito
            </h3>
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-lg transition-colors duration-300">
              <Download size={18} className="text-neutral-500" />
            </button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.1}
                  horizontal={false}
                  stroke="#9ca3af" // Explicit stroke for visibility in light mode
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#6b7280"
                  fontSize={12}
                  width={100}
                  tick={{ fill: "currentColor" }}
                  className="text-neutral-600 dark:text-neutral-400 font-medium"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(23, 23, 23, 0.9)",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#fff", marginBottom: "4px" }}
                  cursor={{ fill: "transparent" }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Trend */}
        <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 rounded-2xl p-6 shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white transition-colors duration-300">
              Actividad Reciente
            </h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent text-neutral-500 dark:text-neutral-400 text-sm outline-none cursor-pointer transition-colors duration-300 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient
                    id="colorInteractions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.1}
                  vertical={false}
                  stroke="#9ca3af" // Explicit stroke for visibility
                />
                <XAxis
                  dataKey="day"
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fill: "currentColor" }}
                  className="text-neutral-600 dark:text-neutral-400 font-medium"
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fill: "currentColor" }}
                  className="text-neutral-600 dark:text-neutral-400 font-medium"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(23, 23, 23, 0.9)",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#fff", marginBottom: "4px" }}
                />
                <Area
                  type="monotone"
                  dataKey="interactions"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorInteractions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-linear-to-r from-primary-50 to-white dark:from-primary-900/20 dark:to-transparent border border-primary-100 dark:border-primary-500/20 rounded-xl p-6 relative overflow-hidden transition-colors duration-300 shadow-sm">
        <div className="relative z-10">
          <h4 className="flex items-center gap-2 text-primary-700 dark:text-primary-400 font-bold mb-2 transition-colors duration-300">
            <Filter size={18} />
            Insight Destacado
          </h4>
          <p className="text-lg md:text-xl text-neutral-900 dark:text-white max-w-2xl transition-colors duration-300 leading-relaxed">
            &quot;{insight}&quot;
          </p>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  trend,
  icon,
}: {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 p-6 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-neutral-100 dark:bg-white/5 rounded-lg transition-colors duration-300">
          {icon}
        </div>
        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-black/40 px-2 py-1 rounded transition-colors duration-300">
          EN VIVO
        </span>
      </div>
      <div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1 transition-colors duration-300">
          {title}
        </p>
        <div className="flex items-baseline gap-3">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white transition-colors duration-300">
            {value}
          </h2>
          <span className="text-xs text-green-600 dark:text-green-400 font-medium transition-colors duration-300">
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}
