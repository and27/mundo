import { Heart, CheckCircle, Clock, Award } from "lucide-react";

interface CourseStats {
  progressPercentage: number;
  completedModules: number;
  totalModules: number;
  estimatedTimeHours: number;
}

interface CourseHeaderProps {
  stats: CourseStats;
}

export default function CourseHeader({ stats }: CourseHeaderProps) {
  const isCompleted = stats.progressPercentage >= 100;

  return (
    <div className="p-6">
      <div className="relative z-10">
        <div className="relative">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <Heart className="w-5 h-5 md:w-10 md:h-10 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                  Manual para padres, educadores y cuidadores conscientes
                </h1>
                <p className="font-medium text-indigo-600 mb-4">
                  Fundamentos para Acompañar el Desarrollo Emocional Infantil
                </p>
              </div>
            </div>

            {/* <p className="text-slate-600 max-w-3xl leading-relaxed">
              Forma parte de la nueva generación de adultos conscientes que
              acompañan el desarrollo emocional infantil integrando sabiduría
              ancestral andina, ciencia moderna y metodología MIM.
            </p> */}
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            icon={<CheckCircle className="w-5 h-5 text-emerald-500" />}
            label="Completado"
            value={`${Math.round(stats.progressPercentage)}%`}
            highlight={isCompleted}
          />
          <InfoCard
            icon={<Heart className="w-5 h-5 text-blue-500" />}
            label="Módulos"
            value={`${stats.completedModules}/${stats.totalModules}`}
          />
          <InfoCard
            icon={<Clock className="w-5 h-5 text-amber-500" />}
            label="Duración"
            value={`${stats.estimatedTimeHours}h`}
          />
          <InfoCard
            icon={<Award className="w-5 h-5 text-purple-500" />}
            label="Certificación"
            value={
              stats.progressPercentage >= 100 ? "Disponible" : "En progreso"
            }
            highlight={stats.progressPercentage >= 100}
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={"bg-white/70 backdrop-blur-sm rounded-xl p-3 md:p-4"}>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div
          className={`
          p-0 md:p-2 rounded-lg
          ${highlight ? "bg-emerald-100" : "bg-slate-100/50"}
        `}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {label}
          </p>
          <p
            className={`
            lg:text-lg font-bold
            ${highlight ? "text-emerald-700" : "text-slate-800"}
          `}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
