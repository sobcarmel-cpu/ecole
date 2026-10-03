import React, { useMemo, useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Sparkles, Upload, WandSparkles, Copy, Check, Smartphone, Instagram, Share2 } from 'lucide-react';

const DEFAULT_COPY = {
  title: 'LE TEMPS, À VOTRE RYTHME.',
  subtitle: 'ÉLÉGANCE. PRÉCISION. SIMPLICITÉ.',
  body: 'Une présence discrète, pensée pour accompagner chaque moment.',
  cta: 'DÉCOUVRIR',
};

export function CampaignView() {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState<'portrait' | 'square'>('portrait');
  const [copied, setCopied] = useState(false);
  const copy = useMemo(() => DEFAULT_COPY, []);

  const handleFile = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copy.title + '\n' + copy.subtitle + '\n\n' + copy.body + '\n\n' + copy.cta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button onClick={() => { window.location.href = '/'; }} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#f2552f] flex items-center justify-center"><WandSparkles className="w-4 h-4" /></div>
            <span className="font-semibold tracking-tight">Campaign Studio</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
            <Sparkles className="w-3.5 h-3.5" /> Création publicitaire
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-12 items-start">
          <section className="space-y-7">
            <div>
              <p className="text-[#f2552f] text-xs font-bold uppercase tracking-[0.25em] mb-3">Campagne produit</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.02]">Transformez une photo en <span className="text-white/45">campagne.</span></h1>
              <p className="mt-4 text-white/55 leading-relaxed max-w-xl">Importez votre visuel, choisissez un format et obtenez une direction créative prête pour les réseaux sociaux.</p>
            </div>

            <label className="block rounded-3xl border border-dashed border-white/20 bg-white/[0.035] hover:bg-white/[0.055] transition-colors p-6 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0"><Upload className="w-5 h-5 text-[#f2552f]" /></div>
                <div>
                  <p className="font-semibold">Déposez votre photo ici</p>
                  <p className="text-sm text-white/40 mt-1">JPG, PNG ou WEBP · glisser-déposer ou sélectionner un fichier</p>
                </div>
              </div>
            </label>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Format de diffusion</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setFormat('portrait')} className={`rounded-2xl border p-4 text-left transition-all ${format === 'portrait' ? 'border-[#f2552f] bg-[#f2552f]/10' : 'border-white/10 bg-white/[0.03]'}`}>
                  <Smartphone className="w-5 h-5 mb-3" /><span className="block text-sm font-semibold">Story / Affiche</span><span className="text-xs text-white/40">4:5 · 1080 × 1350</span>
                </button>
                <button onClick={() => setFormat('square')} className={`rounded-2xl border p-4 text-left transition-all ${format === 'square' ? 'border-[#f2552f] bg-[#f2552f]/10' : 'border-white/10 bg-white/[0.03]'}`}>
                  <Instagram className="w-5 h-5 mb-3" /><span className="block text-sm font-semibold">Social post</span><span className="text-xs text-white/40">1:1 · 1080 × 1080</span>
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div><p className="font-semibold">Texte de campagne</p><p className="text-xs text-white/40 mt-1">Direction premium générée pour le produit.</p></div>
                <button onClick={handleCopy} className="text-xs text-white/55 hover:text-white flex items-center gap-1.5">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}{copied ? 'Copié' : 'Copier'}
                </button>
              </div>
              <div className="space-y-2 text-sm"><p className="font-semibold">{copy.title}</p><p className="text-white/65">{copy.subtitle}</p><p className="text-white/45">{copy.body}</p></div>
            </div>
          </section>

          <section className="lg:sticky lg:top-24">
            <div className={`mx-auto w-full ${format === 'portrait' ? 'max-w-[520px]' : 'max-w-[620px]'}`}>
              <div className={`relative overflow-hidden rounded-[2rem] bg-[#111] shadow-2xl ring-1 ring-white/10 ${format === 'portrait' ? 'aspect-[4/5]' : 'aspect-square'}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,.14),transparent_28%),linear-gradient(135deg,#1a1a1a,#050505)]" />
                {image ? (
                  <>
                    <img src={image} alt="Produit importé" className="absolute inset-0 w-full h-full object-cover opacity-85" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-56 h-56 rounded-full border-[18px] border-neutral-400/70 bg-neutral-950 shadow-[0_0_80px_rgba(255,255,255,.08)]">
                      <div className="absolute inset-8 rounded-full border border-white/10" />
                      <div className="absolute -right-9 top-1/2 -translate-y-1/2 w-10 h-5 rounded-r-full bg-neutral-400/70" />
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-20 h-16 rounded-t-xl bg-neutral-800" />
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-20 h-16 rounded-b-xl bg-neutral-800" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 p-7 sm:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-white/55">Campaign Studio · 01</p>
                    <h2 className="mt-8 text-4xl sm:text-6xl font-semibold tracking-[-0.04em] leading-[0.92] max-w-xl">{copy.title}</h2>
                    <p className="mt-4 text-sm sm:text-base text-white/75 tracking-[0.12em] uppercase">{copy.subtitle}</p>
                  </div>
                  <div className="flex items-end justify-between gap-6">
                    <div className="max-w-xs"><p className="text-sm text-white/65 leading-relaxed">{copy.body}</p><button className="mt-5 px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold tracking-wider">{copy.cta}</button></div>
                    <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35"><Share2 className="w-3.5 h-3.5" /> Social ready</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-white/35"><span className="flex items-center gap-2"><ImageIcon className="w-3.5 h-3.5" /> Aperçu campagne</span><span>Version 1.0</span></div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
