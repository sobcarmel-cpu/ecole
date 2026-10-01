import React, { useState, useRef, useEffect } from 'react';

export interface Message {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
}

export interface ChatCoachProps {
  apiKey?: string;
  systemPrompt?: string;
}

export const DEFAULT_MARCUS_PROMPT = `Tu es Marcus, le Coach Senior en Art Oratoire de "Verbe — École d'art oratoire".

PORTRAIT & STYLE :
- Tu incarnes la bienveillance exigeante. Tu es direct, très concret, sans blabla académique.
- Ton ton est dynamique, élégant et motivant.
- Tu illustres toujours tes conseils en citant des figures historiques ou contemporaines de la parole publique (Winston Churchill pour la structure et les silences, Steve Jobs pour le storytelling minimaliste et le rythme, Barack Obama pour la modulation et la cadence, Martin Luther King pour l'anaphore et l'émotion vocale).
- Tu adaptes ton niveau d'exigence au niveau déclaré par l'élève (Débutant : déblocage du trac et clarté ; Intermédiaire : structure et figures de style ; Avancé : charisme, nuances, gestion du débat et punchlines).

RÈGLES D'INTERACTION :
1. Diagnostic Initial : Si l'utilisateur n'a pas défini son profil, pose-lui 2 questions ciblées : son objectif prioritaire (pitch, grand oral, réunion, conférence) et son plus grand blocage (trac, débit, tics, conviction).
2. Format de Feedback : Après chaque simulation oratoire de l'élève, structure ta réponse ainsi :
   - 👏 Ce qui a fonctionné (1 point précis lié à la rhétorique ou la voix)
   - 🎯 Le détail à corriger immédiatement (1 seul axe prioritaire)
   - 🏛️ L'exemple d'expert (Comment Steve Jobs / Churchill aurait tourné la phrase)
   - ⚡ L'exercice éclair (2 minutes max)
3. Mode Simulation du Public : Si l'élève lance une simulation, incarne une audience dynamique (auditoire sceptique, jury bienveillant, journalistes incisifs) et pose des relances directes.

Réponds toujours en français, de manière claire et percutante.`;

export const TEST_PROMPTS = [
  { label: 'Trac', text: "J'ai les mains qui tremblent et la voix qui déraille avant de monter sur scène." },
  { label: 'Accroche', text: "Comment démarrer ma présentation d'entreprise sans commencer par 'Bonjour à tous' ?" },
  { label: 'Tics', text: "Je dis 'du coup' et 'en fait' à chaque phrase, comment m'en débarrasser ?" },
  { label: 'Structure', text: "Quelle est la meilleure structure pour un discours d'inauguration de 3 minutes ?" },
  { label: 'Silences', text: "J'ai peur du vide quand je m'arrête de parler. Que faire ?" },
  { label: 'Objections', text: "Simule un investisseur très sceptique qui interrompt mon pitch sur l'IA." },
  { label: 'Regard', text: "Où dois-je fixer mon regard face à une salle de 200 personnes ?" },
  { label: 'Modulation', text: "Comment donner de l'énergie à un discours technique sur la finance ?" },
  { label: 'Storytelling', text: "Donne-moi une métaphore pour expliquer la blockchain à des débutants." },
  { label: 'Conclusion', text: "Comment finir une intervention en laissant une impression mémorable ?" }
];

export const ChatCoach: React.FC<ChatCoachProps> = ({
  apiKey = '',
  systemPrompt = DEFAULT_MARCUS_PROMPT
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'coach',
      text: "Bonjour ! Je suis Marcus, ton coach d'art oratoire sur Verbe. Quel est ton objectif de prise de parole cette semaine ?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const effectiveApiKey =
    apiKey ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    (typeof window !== 'undefined' ? (window as any).GEMINI_API_KEY : '');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (!effectiveApiKey) {
        setTimeout(() => {
          const coachReply: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'coach',
            text: `👏 **Ce qui a fonctionné :** Ta question va droit au but. C'est exactement l'attitude d'un orateur qui cherche l'efficacité.

🎯 **Le détail à corriger immédiatement :** Ne cherche pas à éliminer ton émotion, apprends à la canaliser. Le trac n'est que de l'adrénaline brute mal oxygénée. Winston Churchill lui-même avouait avoir des nœuds à l'estomac avant de monter à la tribune de la Chambre des Communes.

🏛️ **L'exemple d'expert :**
Martin Luther King ne commençait jamais à parler immédiatement en montant sur l'estrade. Il attendait 5 secondes complètes, ancré dans le sol, le buste ouvert, les yeux posés sur le fond de la salle. Le silence est ton armure.

⚡ **L'exercice éclair (2 minutes) :**
Pratique la respiration carrée (4s inspiration, 4s rétention poumons pleins, 4s expiration, 4s rétention poumons vides) pendant 3 cycles. Fais-le maintenant et teste ta prochaine phrase.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, coachReply]);
          setLoading(false);
        }, 700);
        return;
      }

      const contentsHistory = messages.concat(userMsg).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${effectiveApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: contentsHistory,
            generationConfig: {
              temperature: 0.7,
              topP: 0.9,
              maxOutputTokens: 1024
            }
          })
        }
      );

      const data = await res.json();
      const replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Je t'écoute. Répète ta phrase avec plus d'ancrage vocal.";

      const coachMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, coachMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: "Pardon, la liaison a sauté. Reprenons : qu'as-tu prévu pour ton entrée en matière ?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[700px] text-white">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            M
          </div>
          <div>
            <h4 className="font-bold text-base leading-tight text-white">
              Marcus — Coach Oratoire IA
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Verbe — École d'Art Oratoire
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Gemini 2.5 Active
          </span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/80">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                m.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{m.text}</div>
              <div
                className={`text-[10px] mt-1.5 font-mono ${
                  m.sender === 'user' ? 'text-cyan-200' : 'text-slate-400'
                }`}
              >
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2.5 text-xs text-slate-400 p-3 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Marcus réfléchit...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 10 Suggestions de Test Rapides */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <span className="text-slate-400 font-semibold shrink-0">Tests rapides :</span>
        {TEST_PROMPTS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(item.text)}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 whitespace-nowrap transition-colors cursor-pointer text-xs"
            title={item.text}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Posez une question ou entraînez votre discours..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-500"
        />

        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm disabled:opacity-40 transition-all cursor-pointer shadow-md"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};
