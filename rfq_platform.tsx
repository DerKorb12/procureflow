import { useState, useEffect, useCallback } from "react";

// ─── Initial seed data ────────────────────────────────────────────────────────
const SEED = {
  users: [
    { id: "u1", email: "buyer@chemco.ch", password: "buyer123", role: "buyer", name: "Anna Müller", company: "ChemCo AG" },
    { id: "u2", email: "supplier@basf.ch", password: "supplier123", role: "supplier", name: "Thomas Bauer", company: "BASF Schweiz", approved: true },
    { id: "u3", email: "supplier2@solvay.ch", password: "supplier456", role: "supplier", name: "Marie Dupont", company: "Solvay SA", approved: false },
    { id: "u4", email: "admin@platform.ch", password: "admin123", role: "admin", name: "Platform Admin", company: "RFQ Platform" },
  ],
  rfqs: [
    { id: "r1", buyerId: "u1", product: "Sodium Hydroxide", quantity: "500 kg", specs: "Purity ≥99%, food grade", delivery: "2026-04-15", incoterms: "DDP Zürich", status: "open", createdAt: "2026-03-10", assignedSuppliers: ["u2"] },
  ],
  quotes: [
    { id: "q1", rfqId: "r1", supplierId: "u2", price: "1250", currency: "CHF", deliveryDays: "14", terms: "Net 30", notes: "Stock available. Certificate of Analysis included.", createdAt: "2026-03-12" },
  ],
  notifications: [
    { id: "n1", userId: "u1", message: "New quote received for RFQ: Sodium Hydroxide", read: false, createdAt: "2026-03-12" },
  ],
};

function loadDB() {
  try {
    const raw = localStorage.getItem("chemrfq_db");
    return raw ? JSON.parse(raw) : SEED;
  } catch { return SEED; }
}
function saveDB(db) {
  localStorage.setItem("chemrfq_db", JSON.stringify(db));
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name, cls = "w-5 h-5" }) => {
  const icons = {
    bell: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    plus: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    logout: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
    check: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    x: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    file: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    flask: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v10l-4 6h14l-4-6V3M9 3h6" /></svg>,
    users: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" /></svg>,
    chart: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  };
  return icons[name] || null;
};

const Badge = ({ label, color }) => {
  const colors = { green: "bg-green-100 text-green-800", yellow: "bg-yellow-100 text-yellow-800", red: "bg-red-100 text-red-800", blue: "bg-blue-100 text-blue-800", gray: "bg-gray-100 text-gray-600" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.gray}`}>{label}</span>;
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-screen overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Icon name="x" /></button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" {...props} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" {...props}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" rows={3} {...props} />
  </div>
);

// ─── Landing Page ─────────────────────────────────────────────────────────────
const QUALITY_OPTS = ["Food Grade", "Pharma / GMP", "Technical Grade", "Electronic Grade", "Reagent Grade", "Cosmetic Grade", "Agriculture Grade"];

function AnonQuestions({ questions, onChange }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const t = draft.trim();
    if (!t) return;
    onChange([...questions, { id: Date.now(), text: t }]);
    setDraft("");
  };
  const remove = (id) => onChange(questions.filter(q => q.id !== id));
  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="z.B. Ist eine Lieferung in Kleingebinden möglich?"
          value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
        />
        <button onClick={add} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
          <Icon name="plus" cls="w-4 h-4" /> Frage
        </button>
      </div>
      {questions.length > 0 && (
        <ul className="space-y-2">
          {questions.map((q, i) => (
            <li key={q.id} className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 bg-blue-200 text-blue-700 rounded-full text-xs font-bold flex items-center justify-center">{i+1}</span>
              <span className="flex-1 text-sm text-gray-700">{q.text}</span>
              <button onClick={() => remove(q.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"><Icon name="x" cls="w-4 h-4" /></button>
            </li>
          ))}
        </ul>
      )}
      {questions.length === 0 && (
        <div className="text-xs text-gray-400 italic">Noch keine Fragen hinzugefügt.</div>
      )}
    </div>
  );
}
const UNIT_OPTS = ["kg", "t", "L", "m³", "IBC (1000L)", "Drum (200L)", "Bag (25kg)", "Bag (50kg)"];
const INCOTERMS_OPTS = ["EXW","FCA","CPT","CIP","DAP","DPU","DDP","FAS","FOB","CFR","CIF"];

function LandingPage({ onLogin }) {
  const [step, setStep] = useState("hero"); // hero | form | success | login
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [authErr, setAuthErr] = useState("");
  const [rfq, setRfq] = useState({ product:"", cas:"", quantity:"", unit:"kg", spec:"", quality:[], annualQty:"", incoterms:"DDP", requirements:"", preferredMfr:"", sdsFile:"" });
  const [errors, setErrors] = useState({});

  const demos = [
    { label: "Buyer", email: "buyer@chemco.ch", password: "buyer123" },
    { label: "Supplier", email: "supplier@basf.ch", password: "supplier123" },
    { label: "Admin", email: "admin@platform.ch", password: "admin123" },
  ];

  const attempt = (e, pw) => {
    const db = loadDB();
    const user = db.users.find(u => u.email === (e||email) && u.password === (pw||password));
    if (!user) { setAuthErr("Ungültige Anmeldedaten."); return; }
    onLogin(user);
  };

  const toggleQuality = (q) => setRfq(r => ({ ...r, quality: r.quality.includes(q) ? r.quality.filter(x=>x!==q) : [...r.quality, q] }));

  const validate = () => {
    const e = {};
    if (!rfq.product.trim()) e.product = "Pflichtfeld";
    if (!rfq.quantity.trim()) e.quantity = "Pflichtfeld";
    if (rfq.quality.length === 0) e.quality = "Bitte mindestens eine Qualität wählen";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitRFQ = () => { if (!validate()) return; setStep("success"); };

  // ── Q&A Component (used in RFQ form preview — not shown on landing) ──

  const features = [
    { icon: "flask", title: "Schnelle Anfragen", desc: "RFQ in unter 3 Minuten erstellen und an geprüfte Lieferanten senden." },
    { icon: "users", title: "Verifizierte Lieferanten", desc: "Nur freigeschaltete, qualitätsgeprüfte Chemikalienlieferanten in der DACH-Region." },
    { icon: "chart", title: "Angebote vergleichen", desc: "Preise, Lieferzeiten und Konditionen übersichtlich in einer Tabelle." },
    { icon: "check", title: "Compliance-ready", desc: "SDS-Upload, GMP- und Food-Grade Kennzeichnung direkt im Prozess." },
  ];

  // ── Hero ──
  if (step === "hero") return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"><Icon name="flask" cls="w-4 h-4 text-white"/></div>
          <span className="text-white font-bold text-lg">ChemRFQ</span>
        </div>
        <div className="flex gap-3">
          <button onClick={()=>setStep("login")} className="text-blue-300 hover:text-white text-sm font-medium transition-colors">Anmelden</button>
          <button onClick={()=>setStep("form")} className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Jetzt anfragen</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/>
          <span className="text-blue-300 text-sm font-medium">B2B Chemikalien-Beschaffung · DACH</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          Chemikalien beschaffen —<br/><span className="text-blue-400">schneller, transparenter.</span>
        </h1>
        <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">Erstellen Sie eine Anfrage in Minuten. Erhalten Sie vergleichbare Angebote von geprüften Lieferanten. Für Food, Pharma und Industrie.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={()=>setStep("form")} className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3.5 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-all">
            Kostenlos anfragen →
          </button>
          <button onClick={()=>setStep("login")} className="border border-white/20 text-white hover:bg-white/10 font-medium px-8 py-3.5 rounded-xl text-lg transition-all">
            Zum Login
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(f => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3"><Icon name={f.icon} cls="w-5 h-5 text-blue-400"/></div>
            <div className="text-white font-semibold mb-1">{f.title}</div>
            <div className="text-blue-300 text-sm leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <div className="border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-8 text-center">
          {[["120+","Lieferanten"],["5'000+","RFQs abgewickelt"],["98%","Angebotsquote"],["CHF 2M+","Beschaffungsvolumen"]].map(([v,l])=>(
            <div key={l}><div className="text-2xl font-bold text-white">{v}</div><div className="text-blue-400 text-sm">{l}</div></div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── RFQ Form ──
  if (step === "form") return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={()=>setStep("hero")}>
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"><Icon name="flask" cls="w-4 h-4 text-white"/></div>
          <span className="text-white font-bold text-lg">ChemRFQ</span>
        </div>
        <button onClick={()=>setStep("login")} className="text-blue-300 hover:text-white text-sm font-medium">Anmelden</button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Ihre Anfrage erstellen</h2>
          <p className="text-blue-300 mt-1 text-sm">Kostenlos und unverbindlich · Angebote in 24–48 Stunden</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-7">
          {/* Product */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Produkt</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input label="Produktname *" value={rfq.product} onChange={e=>setRfq({...rfq,product:e.target.value})} placeholder="z.B. Natriumhydroxid" />
                {errors.product && <p className="text-red-500 text-xs -mt-3 mb-3">{errors.product}</p>}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Input label="CAS-Nummer" value={rfq.cas} onChange={e=>setRfq({...rfq,cas:e.target.value})} placeholder="z.B. 1310-73-2" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Input label="Bevorzugter Hersteller" value={rfq.preferredMfr} onChange={e=>setRfq({...rfq,preferredMfr:e.target.value})} placeholder="z.B. BASF, Dow, Solvay" />
              </div>
            </div>
          </div>

          {/* Menge */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Menge & Lieferung</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bestellmenge *</label>
                <div className="flex gap-2">
                  <input className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="500" value={rfq.quantity} onChange={e=>setRfq({...rfq,quantity:e.target.value})}/>
                  <select className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={rfq.unit} onChange={e=>setRfq({...rfq,unit:e.target.value})}>
                    {UNIT_OPTS.map(u=><option key={u}>{u}</option>)}
                  </select>
                </div>
                {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
              </div>
              <div>
                <Input label="Jahresmenge (optional)" value={rfq.annualQty} onChange={e=>setRfq({...rfq,annualQty:e.target.value})} placeholder="z.B. 5000 kg/Jahr" />
              </div>
              <div className="col-span-2">
                <Select label="Incoterms" value={rfq.incoterms} onChange={e=>setRfq({...rfq,incoterms:e.target.value})} options={INCOTERMS_OPTS.map(t=>({value:t,label:t}))}/>
              </div>
            </div>
          </div>

          {/* Qualität */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Qualität *</h3>
            <div className="flex flex-wrap gap-2">
              {QUALITY_OPTS.map(q=>(
                <button key={q} type="button" onClick={()=>toggleQuality(q)}
                  className={`px-3 py-1.5 rounded-full text-sm border font-medium transition-colors ${rfq.quality.includes(q)?"bg-blue-600 border-blue-600 text-white":"border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"}`}>{q}</button>
              ))}
            </div>
            {errors.quality && <p className="text-red-500 text-xs mt-2">{errors.quality}</p>}
          </div>

          {/* Spezifikation */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Spezifikation & Anforderungen</h3>
            <Textarea label="Technische Spezifikation" value={rfq.spec} onChange={e=>setRfq({...rfq,spec:e.target.value})} placeholder="Reinheit ≥99%, Feuchtigkeitsgehalt max. 0.5%, Schüttdichte ..." />
            <Textarea label="Besondere Anforderungen" value={rfq.requirements} onChange={e=>setRfq({...rfq,requirements:e.target.value})} placeholder="Zertifikate (CoA, CoC, Halal, Kosher), Verpackung, Lagerung ..." />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Spezifikation / SDS hochladen</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={()=>setRfq({...rfq,sdsFile:"SDS_"+rfq.product.replace(/\s/g,"_")||"Dokument"+".pdf"})}>
                {rfq.sdsFile ? <><Icon name="file" cls="w-5 h-5 text-green-500 mx-auto mb-1"/><p className="text-sm text-green-600">{rfq.sdsFile}</p></> :
                  <><Icon name="file" cls="w-5 h-5 text-gray-400 mx-auto mb-1"/><p className="text-sm text-gray-500">PDF, DOCX oder XLSX · Klicken zum Simulieren</p></>}
              </div>
            </div>
          </div>

          {/* Kontakt */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Ihre Kontaktdaten</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Vorname" placeholder="Anna" />
              <Input label="Nachname" placeholder="Müller" />
              <div className="col-span-2"><Input label="Geschäfts-E-Mail *" type="email" placeholder="a.mueller@firma.ch" /></div>
              <div className="col-span-2"><Input label="Unternehmen" placeholder="ChemCo AG" /></div>
            </div>
          </div>

          <button onClick={submitRFQ} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-base transition-colors shadow-lg shadow-blue-600/20">
            Anfrage absenden →
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">Kostenlos & unverbindlich · Kein Account erforderlich</p>
        </div>
      </div>
    </div>
  );

  // ── Success ──
  if (step === "success") return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Icon name="check" cls="w-8 h-8 text-green-600"/></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Anfrage eingegangen!</h2>
        <p className="text-gray-500 mb-2">Ihre RFQ für <strong>{rfq.product}</strong> wurde erfolgreich übermittelt.</p>
        <p className="text-gray-500 text-sm mb-6">Geprüfte Lieferanten werden innerhalb von 24–48 Stunden ein Angebot einreichen. Sie erhalten eine Bestätigung per E-Mail.</p>
        <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-600 mb-6 space-y-1">
          <div><span className="font-medium">Produkt:</span> {rfq.product} {rfq.cas && `(CAS ${rfq.cas})`}</div>
          <div><span className="font-medium">Menge:</span> {rfq.quantity} {rfq.unit}</div>
          {rfq.quality.length>0 && <div><span className="font-medium">Qualität:</span> {rfq.quality.join(", ")}</div>}
          {rfq.annualQty && <div><span className="font-medium">Jahresmenge:</span> {rfq.annualQty}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={()=>setStep("form")} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg">Weitere Anfrage erstellen</button>
          <button onClick={()=>setStep("login")} className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 rounded-lg">Zum Login</button>
        </div>
      </div>
    </div>
  );

  // ── Login ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500 rounded-2xl mb-3 cursor-pointer" onClick={()=>setStep("hero")}>
            <Icon name="flask" cls="w-7 h-7 text-white"/>
          </div>
          <h1 className="text-2xl font-bold text-white">ChemRFQ</h1>
          <p className="text-blue-300 text-sm mt-1">Plattform Login</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Anmelden</h2>
          {authErr && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{authErr}</div>}
          <Input label="E-Mail" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ihre@email.ch" />
          <Input label="Passwort" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          <button onClick={()=>attempt()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">Anmelden</button>
          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Demo-Zugänge</p>
            <div className="grid grid-cols-3 gap-2">
              {demos.map(d=>(
                <button key={d.label} onClick={()=>{setEmail(d.email);setPassword(d.password);attempt(d.email,d.password);}}
                  className="text-xs bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 py-2 px-2 rounded-lg transition-colors">{d.label}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>setStep("hero")} className="mt-4 w-full text-sm text-gray-400 hover:text-blue-600 transition-colors">← Zurück zur Startseite</button>
        </div>
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────
function Shell({ user, onLogout, children, notifCount }) {
  const [showNotif, setShowNotif] = useState(false);
  const db = loadDB();
  const notifs = db.notifications.filter(n => n.userId === user.id);

  const markRead = () => {
    const db2 = loadDB();
    db2.notifications = db2.notifications.map(n => n.userId === user.id ? { ...n, read: true } : n);
    saveDB(db2);
    setShowNotif(false);
  };

  const roleColors = { buyer: "bg-blue-600", supplier: "bg-emerald-600", admin: "bg-purple-600" };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="flask" cls="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">ChemRFQ</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Icon name="bell" />
                {notifCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{notifCount}</span>}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="flex items-center justify-between p-4 border-b"><span className="font-semibold text-gray-800">Notifications</span><button onClick={markRead} className="text-xs text-blue-600 hover:underline">Mark all read</button></div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifs.length === 0 ? <p className="p-4 text-sm text-gray-500">No notifications</p> :
                      notifs.map(n => <div key={n.id} className={`p-4 border-b border-gray-100 text-sm ${n.read ? "text-gray-500" : "text-gray-800 bg-blue-50"}`}>{n.message}<div className="text-xs text-gray-400 mt-1">{n.createdAt}</div></div>)}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 ${roleColors[user.role]} rounded-full flex items-center justify-center text-white text-sm font-bold`}>{user.name[0]}</div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.company}</div>
              </div>
            </div>
            <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Icon name="logout" /></button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

// ─── Buyer Dashboard ──────────────────────────────────────────────────────────
function BuyerDash({ user }) {
  const [db, setDB] = useState(loadDB);
  const [view, setView] = useState("list"); // list | new | detail
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [form, setForm] = useState({ product: "", quantity: "", specs: "", delivery: "", incoterms: "DDP", sdsFile: "" });

  const refresh = () => setDB(loadDB());

  const myRFQs = db.rfqs.filter(r => r.buyerId === user.id);
  const approvedSuppliers = db.users.filter(u => u.role === "supplier" && u.approved);

  const submitRFQ = () => {
    if (!form.product || !form.quantity || !form.delivery) return;
    const db2 = loadDB();
    const newRFQ = {
      id: "r" + Date.now(), buyerId: user.id, ...form,
      status: "open", createdAt: new Date().toISOString().slice(0, 10),
      assignedSuppliers: approvedSuppliers.map(s => s.id),
    };
    db2.rfqs.push(newRFQ);
    approvedSuppliers.forEach(s => {
      db2.notifications.push({ id: "n" + Date.now() + s.id, userId: s.id, message: `New RFQ available: ${form.product}`, read: false, createdAt: newRFQ.createdAt });
    });
    saveDB(db2);
    refresh();
    setForm({ product: "", quantity: "", specs: "", delivery: "", incoterms: "DDP", sdsFile: "" });
    setView("list");
  };

  const quotesForRFQ = (rfqId) => db.quotes.filter(q => q.rfqId === rfqId);
  const supplierName = (id) => db.users.find(u => u.id === id)?.company || id;

  const statusColor = { open: "blue", closed: "gray", awarded: "green" };

  if (view === "new") return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setView("list")} className="text-gray-500 hover:text-blue-600 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-gray-900">New Request for Quotation</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
        <Input label="Product Name *" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} placeholder="e.g. Sodium Hydroxide NaOH" />
        <Input label="Quantity *" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 500 kg" />
        <Textarea label="Specifications" value={form.specs} onChange={e => setForm({ ...form, specs: e.target.value })} placeholder="Purity, grade, packaging requirements..." />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">SDS Upload (Simulation)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors" onClick={() => setForm({ ...form, sdsFile: "SDS_" + form.product.replace(/\s/g, "_") + ".pdf" })}>
            {form.sdsFile ? <><Icon name="file" cls="w-5 h-5 text-green-500 mx-auto mb-1" /><p className="text-sm text-green-600">{form.sdsFile}</p></> : <><Icon name="file" cls="w-5 h-5 text-gray-400 mx-auto mb-1" /><p className="text-sm text-gray-500">Click to simulate SDS upload</p></>}
          </div>
        </div>
        <Input label="Required Delivery Date *" type="date" value={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.value })} />
        <Select label="Incoterms" value={form.incoterms} onChange={e => setForm({ ...form, incoterms: e.target.value })}
          options={["EXW","FCA","CPT","CIP","DAP","DPU","DDP","FAS","FOB","CFR","CIF"].map(t => ({ value: t, label: t }))} />
        <div className="flex gap-3 mt-2">
          <button onClick={submitRFQ} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">Send RFQ to {approvedSuppliers.length} Supplier{approvedSuppliers.length !== 1 ? "s" : ""}</button>
          <button onClick={() => setView("list")} className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
        </div>
      </div>
    </div>
  );

  if (view === "detail" && selectedRFQ) {
    const rfq = db.rfqs.find(r => r.id === selectedRFQ);
    const quotes = quotesForRFQ(selectedRFQ);
    const best = quotes.length ? quotes.reduce((a, b) => parseFloat(a.price) < parseFloat(b.price) ? a : b) : null;
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView("list")} className="text-gray-500 hover:text-blue-600 text-sm">← Back</button>
          <h1 className="text-2xl font-bold text-gray-900">RFQ: {rfq.product}</h1>
          <Badge label={rfq.status} color={statusColor[rfq.status]} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[["Quantity", rfq.quantity], ["Delivery", rfq.delivery], ["Incoterms", rfq.incoterms]].map(([k, v]) => (
            <div key={k} className="bg-white rounded-xl border border-gray-200 p-4"><div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{k}</div><div className="font-semibold text-gray-900">{v}</div></div>
          ))}
        </div>
        {rfq.specs && <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6"><div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Specifications</div><div className="text-sm text-gray-700">{rfq.specs}</div></div>}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quotes Received ({quotes.length})</h2>
        {quotes.length === 0 ? <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">No quotes received yet.</div> : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>{["Supplier", "Price (CHF)", "Delivery", "Terms", "Notes", ""].map(h => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>)}</tr>
              </thead>
              <tbody>
                {quotes.map(q => (
                  <tr key={q.id} className={`border-b border-gray-100 ${best?.id === q.id ? "bg-green-50" : ""}`}>
                    <td className="px-4 py-3 font-medium text-gray-900">{supplierName(q.supplierId)}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">{q.price} {q.currency}{best?.id === q.id && <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Best</span>}</td>
                    <td className="px-4 py-3 text-gray-600">{q.deliveryDays} days</td>
                    <td className="px-4 py-3 text-gray-600">{q.terms}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{q.notes}</td>
                    <td className="px-4 py-3"><button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">Award</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your chemical procurement requests</p>
        </div>
        <button onClick={() => setView("new")} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Icon name="plus" cls="w-4 h-4" /> New RFQ
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[["Total RFQs", myRFQs.length, "chart"], ["Open RFQs", myRFQs.filter(r => r.status === "open").length, "flask"], ["Quotes Received", db.quotes.filter(q => myRFQs.find(r => r.id === q.rfqId)).length, "file"]].map(([l, v, icon]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center"><Icon name={icon} cls="w-6 h-6 text-blue-600" /></div>
            <div><div className="text-2xl font-bold text-gray-900">{v}</div><div className="text-sm text-gray-500">{l}</div></div>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">My RFQs</h2>
      {myRFQs.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
          <Icon name="flask" cls="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No RFQs yet. Create your first request.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myRFQs.map(rfq => {
            const quotes = quotesForRFQ(rfq.id);
            return (
              <div key={rfq.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:border-blue-300 transition-colors cursor-pointer" onClick={() => { setSelectedRFQ(rfq.id); setView("detail"); }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><Icon name="flask" cls="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <div className="font-semibold text-gray-900">{rfq.product}</div>
                    <div className="text-sm text-gray-500">{rfq.quantity} · {rfq.incoterms} · Due {rfq.delivery}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{quotes.length} quote{quotes.length !== 1 ? "s" : ""}</span>
                  <Badge label={rfq.status} color={statusColor[rfq.status]} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Supplier Dashboard ───────────────────────────────────────────────────────
function SupplierDash({ user }) {
  const [db, setDB] = useState(loadDB);
  const [quoteModal, setQuoteModal] = useState(null);
  const [qForm, setQForm] = useState({ price: "", deliveryDays: "", terms: "Net 30", notes: "" });

  const refresh = () => setDB(loadDB());

  if (!user.approved) return (
    <div className="flex items-center justify-center min-h-64">
      <div className="text-center bg-white rounded-2xl border border-yellow-200 shadow-sm p-10 max-w-md">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"><Icon name="bell" cls="w-8 h-8 text-yellow-600" /></div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Approval Pending</h2>
        <p className="text-gray-500">Your supplier account is awaiting admin approval. You'll be notified once approved.</p>
      </div>
    </div>
  );

  const myRFQs = db.rfqs.filter(r => r.assignedSuppliers?.includes(user.id) && r.status === "open");
  const myQuotes = db.quotes.filter(q => q.supplierId === user.id);
  const hasQuoted = (rfqId) => myQuotes.find(q => q.rfqId === rfqId);

  const submitQuote = () => {
    if (!qForm.price || !qForm.deliveryDays) return;
    const db2 = loadDB();
    const rfq = db2.rfqs.find(r => r.id === quoteModal.id);
    db2.quotes.push({ id: "q" + Date.now(), rfqId: quoteModal.id, supplierId: user.id, ...qForm, currency: "CHF", createdAt: new Date().toISOString().slice(0, 10) });
    db2.notifications.push({ id: "n" + Date.now(), userId: rfq.buyerId, message: `New quote received for RFQ: ${rfq.product}`, read: false, createdAt: new Date().toISOString().slice(0, 10) });
    saveDB(db2);
    refresh();
    setQuoteModal(null);
    setQForm({ price: "", deliveryDays: "", terms: "Net 30", notes: "" });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h1>
        <p className="text-gray-500 mt-1">{user.company} · Submit competitive quotes</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[["Available RFQs", myRFQs.length, "file"], ["Quotes Submitted", myQuotes.length, "chart"], ["Win Rate", myQuotes.length ? "—" : "0%", "check"]].map(([l, v, icon]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center"><Icon name={icon} cls="w-6 h-6 text-emerald-600" /></div>
            <div><div className="text-2xl font-bold text-gray-900">{v}</div><div className="text-sm text-gray-500">{l}</div></div>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Open RFQs</h2>
      {myRFQs.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
          <Icon name="flask" cls="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No open RFQs assigned to you at this time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myRFQs.map(rfq => {
            const quoted = hasQuoted(rfq.id);
            return (
              <div key={rfq.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center"><Icon name="flask" cls="w-5 h-5 text-emerald-600" /></div>
                  <div>
                    <div className="font-semibold text-gray-900">{rfq.product}</div>
                    <div className="text-sm text-gray-500">{rfq.quantity} · {rfq.incoterms} · Deliver by {rfq.delivery}</div>
                    {rfq.specs && <div className="text-xs text-gray-400 mt-0.5">{rfq.specs}</div>}
                  </div>
                </div>
                <div>
                  {quoted ? (
                    <div className="text-right">
                      <Badge label="Quoted" color="green" />
                      <div className="text-sm font-bold text-gray-900 mt-1">{quoted.price} CHF</div>
                    </div>
                  ) : (
                    <button onClick={() => setQuoteModal(rfq)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">Submit Quote</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {quoteModal && (
        <Modal title={`Quote for: ${quoteModal.product}`} onClose={() => setQuoteModal(null)}>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
            <strong>Quantity:</strong> {quoteModal.quantity} · <strong>Incoterms:</strong> {quoteModal.incoterms} · <strong>Delivery by:</strong> {quoteModal.delivery}
          </div>
          <Input label="Price (CHF) *" type="number" value={qForm.price} onChange={e => setQForm({ ...qForm, price: e.target.value })} placeholder="1250.00" />
          <Input label="Delivery Time (days) *" type="number" value={qForm.deliveryDays} onChange={e => setQForm({ ...qForm, deliveryDays: e.target.value })} placeholder="14" />
          <Select label="Payment Terms" value={qForm.terms} onChange={e => setQForm({ ...qForm, terms: e.target.value })}
            options={["Net 15", "Net 30", "Net 45", "Net 60", "Prepayment", "LC"].map(t => ({ value: t, label: t }))} />
          <Textarea label="Notes" value={qForm.notes} onChange={e => setQForm({ ...qForm, notes: e.target.value })} placeholder="Certificates, packaging, availability notes..." />
          <button onClick={submitQuote} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors">Submit Quote</button>
        </Modal>
      )}
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDash({ user }) {
  const [db, setDB] = useState(loadDB);

  const refresh = () => setDB(loadDB());
  const suppliers = db.users.filter(u => u.role === "supplier");

  const approve = (id, val) => {
    const db2 = loadDB();
    db2.users = db2.users.map(u => u.id === id ? { ...u, approved: val } : u);
    if (val) {
      const sup = db2.users.find(u => u.id === id);
      db2.notifications.push({ id: "n" + Date.now(), userId: id, message: "Your supplier account has been approved!", read: false, createdAt: new Date().toISOString().slice(0, 10) });
    }
    saveDB(db2);
    refresh();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage supplier approvals and platform overview</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[["Total Suppliers", suppliers.length, "users", "purple"], ["Approved", suppliers.filter(s => s.approved).length, "check", "green"], ["Pending", suppliers.filter(s => !s.approved).length, "bell", "yellow"]].map(([l, v, icon, c]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`w-12 h-12 bg-${c}-50 rounded-xl flex items-center justify-center`}><Icon name={icon} cls={`w-6 h-6 text-${c}-600`} /></div>
            <div><div className="text-2xl font-bold text-gray-900">{v}</div><div className="text-sm text-gray-500">{l}</div></div>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Supplier Management</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>{["Company", "Contact", "Email", "Status", "Actions"].map(h => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>)}</tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-4 font-medium text-gray-900">{s.company}</td>
                <td className="px-4 py-4 text-gray-600">{s.name}</td>
                <td className="px-4 py-4 text-gray-500">{s.email}</td>
                <td className="px-4 py-4"><Badge label={s.approved ? "Approved" : "Pending"} color={s.approved ? "green" : "yellow"} /></td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    {!s.approved && <button onClick={() => approve(s.id, true)} className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700"><Icon name="check" cls="w-3 h-3" />Approve</button>}
                    {s.approved && <button onClick={() => approve(s.id, false)} className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200"><Icon name="x" cls="w-3 h-3" />Revoke</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Platform Activity</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[["Total RFQs", db.rfqs.length], ["Total Quotes", db.quotes.length]].map(([l, v]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500 mb-1">{l}</div>
            <div className="text-3xl font-bold text-gray-900">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    if (user) {
      const db = loadDB();
      setNotifCount(db.notifications.filter(n => n.userId === user.id && !n.read).length);
      const t = setInterval(() => {
        const db2 = loadDB();
        setNotifCount(db2.notifications.filter(n => n.userId === user.id && !n.read).length);
      }, 3000);
      return () => clearInterval(t);
    }
  }, [user]);

  if (!user) return <LandingPage onLogin={setUser} />;

  const dashboards = { buyer: BuyerDash, supplier: SupplierDash, admin: AdminDash };
  const Dash = dashboards[user.role];

  return (
    <Shell user={user} onLogout={() => setUser(null)} notifCount={notifCount}>
      <Dash user={user} />
    </Shell>
  );
}
