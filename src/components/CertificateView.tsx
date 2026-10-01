import React from 'react';
import { Award, Printer, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Course } from '../data/courses';

interface CertificateViewProps {
  user: { name: string; username: string };
  course?: Course | null;
  isGrandGrandCertification?: boolean;
  score: number;
  dateStr: string;
  onBack: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  user,
  course,
  isGrandGrandCertification,
  score,
  dateStr,
  onBack,
}) => {
  const serialNo = `VB-${(user.username + (course ? course.id : 'MASTER')).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)}-${dateStr.replace(/\D/g, '') || '2026'}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-neutral-200 rounded-2xl shadow-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au tableau de bord
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-500 hidden sm:inline">
            Document officiel vérifiable · Code : <code className="font-mono text-neutral-800">{serialNo}</code>
          </span>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#f2552f] hover:bg-[#d94420] rounded-full shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimer / Télécharger en PDF
          </button>
        </div>
      </div>

      {/* Diplôme Haute Qualité */}
      <div className="printable-cert bg-[#fffdf5] text-[#1d1b3a] border-8 border-double border-[#c9a24a] rounded-xl p-8 sm:p-14 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
        {/* Filigrane d'authenticité */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <Award className="w-[500px] h-[500px] text-[#c9a24a]" />
        </div>

        {/* Cadre intérieur fin */}
        <div className="border border-[#c9a24a]/80 p-6 sm:p-10 text-center relative z-10 flex flex-col justify-between min-h-[580px]">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#f2552f] text-white flex items-center justify-center font-bold text-lg">
                V
              </span>
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-neutral-900">
                VERBE · ÉCOLE D'ART ORATOIRE
              </span>
            </div>
            <div className="w-24 h-0.5 bg-[#c9a24a] mx-auto mt-2"></div>
            <p className="text-xs tracking-[0.25em] text-[#f2552f] uppercase font-bold pt-2">
              {isGrandGrandCertification ? 'Certificat d’Excellence Oratoire' : 'Certificat Officiel de Réussite'}
            </p>
          </div>

          {/* Corps principal */}
          <div className="my-8 space-y-4">
            <p className="text-sm italic text-neutral-600 font-serif-title">
              Le Conseil Pédagogique et la Direction Académique certifient que
            </p>

            <div className="py-2">
              <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight italic border-b-2 border-[#c9a24a]/60 inline-block px-8 pb-2">
                {user.name}
              </h1>
            </div>

            <p className="text-sm text-neutral-600 max-w-lg mx-auto pt-2">
              {isGrandGrandCertification
                ? 'a complété avec succès l’intégralité des 5 cycles supérieurs d’éloquence, validé les QCM académiques et obtenu le titre d’'
                : 'a suivi avec assiduité et validé les épreuves théoriques et pratiques du cursus :'}
            </p>

            <div className="text-xl sm:text-2xl font-cinzel font-bold text-neutral-900 py-1">
              {isGrandGrandCertification ? '« 🏆 GRAND ORATEUR VERBE »' : `« ${course?.title} »`}
            </div>

            {course?.badgeUnlocked && !isGrandGrandCertification && (
              <div className="inline-block px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-900">
                Badge officiel : {course.badgeUnlocked}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 text-xs text-neutral-500 font-medium">
              <span>Mention : Très Bien</span>
              <span>·</span>
              <span>Score obtenu : <b className="text-[#2f9e63] font-semibold">{score}%</b></span>
              <span>·</span>
              <span>Volume horaire validé</span>
            </div>
          </div>

          {/* Signatures & Sceau */}
          <div className="pt-8 border-t border-[#c9a24a]/40 grid grid-cols-3 items-end text-left">
            <div>
              <div className="font-serif-title italic text-sm text-neutral-800">Marc-Aurèle V.</div>
              <div className="text-[11px] text-neutral-500">Président du Jury</div>
              <div className="w-28 h-px bg-neutral-400 mt-1"></div>
            </div>

            <div className="flex flex-col items-center justify-center">
              {/* Sceau doré */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-radial from-[#fae596] to-[#b8892f] border-4 border-[#fffdf5] shadow-lg flex flex-col items-center justify-center text-white ring-2 ring-[#c9a24a]">
                <ShieldCheck className="w-6 h-6 text-white drop-shadow-xs" />
                <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5">Sceau</span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif-title italic text-sm text-neutral-800">Sarah Danis</div>
              <div className="text-[11px] text-neutral-500">Directrice Pédagogique</div>
              <div className="w-28 h-px bg-neutral-400 mt-1 ml-auto"></div>
            </div>
          </div>

          {/* Footer métadonnées */}
          <div className="mt-6 pt-3 border-t border-neutral-200/60 flex flex-wrap items-center justify-between text-[11px] text-neutral-400">
            <span>Délivré le : {dateStr || 'Octobre 2026'}</span>
            <span>Identifiant de certification : {serialNo}</span>
            <span className="flex items-center gap-1 text-[#2f9e63]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Signature cryptographique validée
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
