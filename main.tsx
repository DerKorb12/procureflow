import { useState, useEffect, createContext, useContext } from "react";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const T = {
  de: {
    appName: "ChemRFQ", appSub: "B2B Chemikalien-Beschaffung · DACH",
    navLogin: "Anmelden", navRequest: "Jetzt anfragen",
    heroTag: "B2B Chemikalien-Beschaffung · DACH",
    heroTitle: "Chemikalien beschaffen —", heroTitleAccent: "schneller, transparenter.",
    heroSub: "Erstellen Sie eine Anfrage in Minuten. Erhalten Sie vergleichbare Angebote von geprüften Lieferanten.",
    heroCta: "Kostenlos anfragen →", heroLogin: "Zum Login",
    feat1t: "Schnelle Anfragen", feat1d: "RFQ in unter 3 Minuten erstellen und an geprüfte Lieferanten senden.",
    feat2t: "Verifizierte Lieferanten", feat2d: "Nur freigeschaltete, qualitätsgeprüfte Chemikalienlieferanten in der DACH-Region.",
    feat3t: "Angebote vergleichen", feat3d: "Preise, Lieferzeiten und Konditionen übersichtlich in einer Tabelle.",
    feat4t: "Compliance-ready", feat4d: "SDS-Upload, GMP- und Food-Grade Kennzeichnung direkt im Prozess.",
    stat1: "Lieferanten", stat2: "RFQs abgewickelt", stat3: "Angebotsquote", stat4: "Beschaffungsvolumen",
    formTitle: "Ihre Anfrage erstellen", formSub: "Kostenlos und unverbindlich · Angebote in 24–48 Stunden",
    secProduct: "Produkt", secQty: "Menge & Lieferung", secQuality: "Qualität", secSpec: "Spezifikation & Anforderungen", secContact: "Ihre Kontaktdaten",
    fProductName: "Produktname *", fProductPh: "z.B. Natriumhydroxid",
    fCas: "CAS-Nummer", fCasPh: "z.B. 1310-73-2",
    fMfr: "Bevorzugter Hersteller", fMfrPh: "z.B. BASF, Dow, Solvay",
    fQty: "Bestellmenge *", fQtyPh: "500",
    fAnnual: "Jahresmenge (optional)", fAnnualPh: "z.B. 5000 kg/Jahr",
    fInco: "Incoterms",
    fSpec: "Technische Spezifikation", fSpecPh: "Reinheit ≥99%, Feuchtigkeitsgehalt max. 0.5% ...",
    fReq: "Besondere Anforderungen", fReqPh: "Zertifikate (CoA, CoC, Halal, Kosher), Verpackung ...",
    fSds: "Spezifikation / SDS hochladen", fSdsPh: "PDF, DOCX oder XLSX · Klicken zum Simulieren",
    fFirst: "Vorname", fLast: "Nachname", fEmail: "Geschäfts-E-Mail *", fEmailPh: "a.mueller@firma.ch", fCompany: "Unternehmen", fCompanyPh: "ChemCo AG",
    qualityOpts: ["Food Grade","Pharma / GMP","Technical Grade","Electronic Grade","Reagent Grade","Cosmetic Grade","Agriculture Grade"],
    qualityErr: "Bitte mindestens eine Qualität wählen",
    submit: "Anfrage absenden →", submitNote: "Kostenlos & unverbindlich · Kein Account erforderlich",
    errRequired: "Pflichtfeld",
    successTitle: "Anfrage eingegangen!", successSub: "Ihre RFQ für", successSub2: "wurde erfolgreich übermittelt.",
    successNote: "Geprüfte Lieferanten werden innerhalb von 24–48 Stunden ein Angebot einreichen.",
    successProduct: "Produkt", successQty: "Menge", successQual: "Qualität", successAnnual: "Jahresmenge",
    successNew: "Weitere Anfrage erstellen", successLogin: "Zum Login",
    loginTitle: "Anmelden", loginEmail: "E-Mail", loginPw: "Passwort", loginBtn: "Anmelden", loginErr: "Ungültige Anmeldedaten.", loginDemo: "Demo-Zugänge", loginBack: "← Zurück zur Startseite",
    buyerDashTitle: "Käufer Dashboard", buyerDashSub: "Verwalten Sie Ihre Chemikalienbeschaffung",
    newRfq: "Neue Anfrage", totalRfqs: "Anfragen gesamt", openRfqs: "Offene Anfragen", quotesRec: "Angebote erhalten",
    myRfqs: "Meine Anfragen", noRfqs: "Noch keine Anfragen. Erstellen Sie Ihre erste Anfrage.",
    newRfqTitle: "Neue Anfrage (RFQ)", back: "← Zurück",
    sendTo: "Anfrage senden an", suppliers: "Lieferant(en)",
    rfqProduct: "Produkt", rfqQty: "Menge", rfqInco: "Incoterms", rfqDue: "Lieferdatum", rfqSpec: "Spezifikationen",
    quotesReceived: "Erhaltene Angebote", noQuotes: "Noch keine Angebote.",
    colSupplier: "Lieferant", colPrice: "Preis (CHF)", colDelivery: "Lieferzeit", colTerms: "Konditionen", colNotes: "Notizen",
    best: "Bestes Angebot", award: "Beauftragen",
    supplierDash: "Lieferanten Dashboard", supplierSub: "Wettbewerbsfähige Angebote einreichen",
    pendingTitle: "Freischaltung ausstehend", pendingText: "Ihr Lieferantenkonto wartet auf die Admin-Freigabe.",
    availRfqs: "Offene Anfragen", quotesSubmitted: "Eingereichte Angebote", winRate: "Erfolgsquote",
    openRfqsTitle: "Offene Anfragen", noOpenRfqs: "Keine offenen Anfragen für Sie verfügbar.",
    quoted: "Angeboten", submitQuote: "Angebot einreichen",
    quoteFor: "Angebot für", qPrice: "Preis (CHF) *", qPricePh: "1250.00", qDays: "Lieferzeit (Tage) *", qDaysPh: "14", qTerms: "Zahlungsbedingungen", qNotes: "Notizen", qNotesPh: "Zertifikate, Verpackung, Verfügbarkeit ...", qSubmit: "Angebot absenden",
    adminDash: "Admin Dashboard", adminSub: "Lieferanten und Plattform verwalten",
    totalSupp: "Lieferanten gesamt", approved: "Freigegeben", pending: "Ausstehend",
    suppMgmt: "Lieferantenverwaltung", colCompany: "Unternehmen", colContact: "Kontakt", colStatus: "Status", colActions: "Aktionen",
    approveBtn: "Freigeben", revokeBtn: "Widerrufen",
    platformActivity: "Plattform-Aktivität", totalRfqsStat: "Anfragen gesamt", totalQuotesStat: "Angebote gesamt",
    notifications: "Benachrichtigungen", markRead: "Alle gelesen", noNotif: "Keine Benachrichtigungen",
    qaTitle: "Anonymes Q&A", qaQuestions: "Frage", qaAnon: "Anonym · Sichtbar für alle Lieferanten",
    qaHint: "Ihre Frage wird anonym gestellt. Kein Lieferant kann Ihre Identität sehen.",
    qaPlaceholder: "Frage an den Käufer stellen...", qaBtn: "Fragen",
    qaEmpty: "Noch keine Fragen.", qaEmptyBuyer: "Noch keine Fragen von Lieferanten.",
    qaAnonLabel: "Anonymer Lieferant", qaBuyer: "Käufer",
    qaAnswerPh: "Antwort eingeben (sichtbar für alle Lieferanten)...", qaAnswerBtn: "Antworten", qaPending: "Noch keine Antwort vom Käufer.",
    notifNewQuote: "Neues Angebot für Anfrage", notifNewQ: "Neue anonyme Frage zu Anfrage", notifAnswer: "Antwort auf Frage zu Anfrage", notifApproved: "Ihr Lieferantenkonto wurde freigegeben!",
  },
  en: {
    appName: "ChemRFQ", appSub: "B2B Chemical Procurement · DACH",
    navLogin: "Login", navRequest: "Request now",
    heroTag: "B2B Chemical Procurement · DACH",
    heroTitle: "Procure chemicals —", heroTitleAccent: "faster, more transparent.",
    heroSub: "Create a request in minutes. Receive comparable quotes from verified suppliers.",
    heroCta: "Request for free →", heroLogin: "Go to Login",
    feat1t: "Fast Requests", feat1d: "Create an RFQ in under 3 minutes and send it to verified suppliers.",
    feat2t: "Verified Suppliers", feat2d: "Only approved, quality-checked chemical suppliers in the DACH region.",
    feat3t: "Compare Quotes", feat3d: "Prices, delivery times and conditions clearly in one table.",
    feat4t: "Compliance-ready", feat4d: "SDS upload, GMP and food-grade labelling directly in the process.",
    stat1: "Suppliers", stat2: "RFQs processed", stat3: "Quote rate", stat4: "Procurement volume",
    formTitle: "Create your request", formSub: "Free and non-binding · Quotes within 24–48 hours",
    secProduct: "Product", secQty: "Quantity & Delivery", secQuality: "Quality", secSpec: "Specification & Requirements", secContact: "Your Contact Details",
    fProductName: "Product name *", fProductPh: "e.g. Sodium Hydroxide",
    fCas: "CAS Number", fCasPh: "e.g. 1310-73-2",
    fMfr: "Preferred Manufacturer", fMfrPh: "e.g. BASF, Dow, Solvay",
    fQty: "Order quantity *", fQtyPh: "500",
    fAnnual: "Annual quantity (optional)", fAnnualPh: "e.g. 5000 kg/year",
    fInco: "Incoterms",
    fSpec: "Technical Specification", fSpecPh: "Purity ≥99%, moisture max. 0.5% ...",
    fReq: "Special Requirements", fReqPh: "Certificates (CoA, CoC, Halal, Kosher), packaging ...",
    fSds: "Upload Specification / SDS", fSdsPh: "PDF, DOCX or XLSX · Click to simulate",
    fFirst: "First name", fLast: "Last name", fEmail: "Business Email *", fEmailPh: "a.smith@company.com", fCompany: "Company", fCompanyPh: "ChemCo Ltd.",
    qualityOpts: ["Food Grade","Pharma / GMP","Technical Grade","Electronic Grade","Reagent Grade","Cosmetic Grade","Agriculture Grade"],
    qualityErr: "Please select at least one quality",
    submit: "Submit request →", submitNote: "Free & non-binding · No account required",
    errRequired: "Required",
    successTitle: "Request received!", successSub: "Your RFQ for", successSub2: "was successfully submitted.",
    successNote: "Verified suppliers will submit a quote within 24–48 hours.",
    successProduct: "Product", successQty: "Quantity", successQual: "Quality", successAnnual: "Annual quantity",
    successNew: "Create another request", successLogin: "Go to Login",
    loginTitle: "Sign In", loginEmail: "Email", loginPw: "Password", loginBtn: "Sign In", loginErr: "Invalid credentials.", loginDemo: "Demo accounts", loginBack: "← Back to homepage",
    buyerDashTitle: "Buyer Dashboard", buyerDashSub: "Manage your chemical procurement",
    newRfq: "New RFQ", totalRfqs: "Total RFQs", openRfqs: "Open RFQs", quotesRec: "Quotes received",
    myRfqs: "My RFQs", noRfqs: "No RFQs yet. Create your first request.",
    newRfqTitle: "New Request for Quotation", back: "← Back",
    sendTo: "Send RFQ to", suppliers: "supplier(s)",
    rfqProduct: "Product", rfqQty: "Quantity", rfqInco: "Incoterms", rfqDue: "Delivery date", rfqSpec: "Specifications",
    quotesReceived: "Quotes received", noQuotes: "No quotes yet.",
    colSupplier: "Supplier", colPrice: "Price (CHF)", colDelivery: "Delivery", colTerms: "Terms", colNotes: "Notes",
    best: "Best", award: "Award",
    supplierDash: "Supplier Dashboard", supplierSub: "Submit competitive quotes",
    pendingTitle: "Approval Pending", pendingText: "Your supplier account is awaiting admin approval.",
    availRfqs: "Available RFQs", quotesSubmitted: "Quotes submitted", winRate: "Win rate",
    openRfqsTitle: "Open RFQs", noOpenRfqs: "No open RFQs assigned to you.",
    quoted: "Quoted", submitQuote: "Submit Quote",
    quoteFor: "Quote for", qPrice: "Price (CHF) *", qPricePh: "1250.00", qDays: "Delivery time (days) *", qDaysPh: "14", qTerms: "Payment terms", qNotes: "Notes", qNotesPh: "Certificates, packaging, availability ...", qSubmit: "Submit Quote",
    adminDash: "Admin Dashboard", adminSub: "Manage suppliers and platform",
    totalSupp: "Total suppliers", approved: "Approved", pending: "Pending",
    suppMgmt: "Supplier Management", colCompany: "Company", colContact: "Contact", colStatus: "Status", colActions: "Actions",
    approveBtn: "Approve", revokeBtn: "Revoke",
    platformActivity: "Platform Activity", totalRfqsStat: "Total RFQs", totalQuotesStat: "Total Quotes",
    notifications: "Notifications", markRead: "Mark all read", noNotif: "No notifications",
    qaTitle: "Anonymous Q&A", qaQuestions: "Question", qaAnon: "Anonymous · Visible to all suppliers",
    qaHint: "Your question is submitted anonymously. No supplier can see your identity.",
    qaPlaceholder: "Ask the buyer a question...", qaBtn: "Ask",
    qaEmpty: "No questions yet.", qaEmptyBuyer: "No questions from suppliers yet.",
    qaAnonLabel: "Anonymous Supplier", qaBuyer: "Buyer",
    qaAnswerPh: "Enter answer (visible to all suppliers)...", qaAnswerBtn: "Answer", qaPending: "No answer from buyer yet.",
    notifNewQuote: "New quote for RFQ", notifNewQ: "New anonymous question for RFQ", notifAnswer: "Answer to question on RFQ", notifApproved: "Your supplier account has been approved!",
  },
  fr: {
    appName: "ChemRFQ", appSub: "Approvisionnement B2B en produits chimiques · DACH",
    navLogin: "Connexion", navRequest: "Faire une demande",
    heroTag: "Approvisionnement B2B en produits chimiques · DACH",
    heroTitle: "Approvisionnez en produits chimiques —", heroTitleAccent: "plus vite, plus transparent.",
    heroSub: "Créez une demande en quelques minutes. Recevez des offres comparables de fournisseurs vérifiés.",
    heroCta: "Demande gratuite →", heroLogin: "Se connecter",
    feat1t: "Demandes rapides", feat1d: "Créez un appel d'offres en moins de 3 minutes.",
    feat2t: "Fournisseurs vérifiés", feat2d: "Uniquement des fournisseurs de produits chimiques approuvés et contrôlés.",
    feat3t: "Comparer les offres", feat3d: "Prix, délais et conditions clairement dans un tableau.",
    feat4t: "Conforme", feat4d: "Téléchargement SDS, étiquetage GMP et alimentaire intégrés.",
    stat1: "Fournisseurs", stat2: "Appels d'offres traités", stat3: "Taux d'offre", stat4: "Volume d'achat",
    formTitle: "Créer votre demande", formSub: "Gratuit et sans engagement · Offres sous 24–48 heures",
    secProduct: "Produit", secQty: "Quantité & Livraison", secQuality: "Qualité", secSpec: "Spécification & Exigences", secContact: "Vos coordonnées",
    fProductName: "Nom du produit *", fProductPh: "ex. Hydroxyde de sodium",
    fCas: "Numéro CAS", fCasPh: "ex. 1310-73-2",
    fMfr: "Fabricant préféré", fMfrPh: "ex. BASF, Dow, Solvay",
    fQty: "Quantité commandée *", fQtyPh: "500",
    fAnnual: "Quantité annuelle (optionnel)", fAnnualPh: "ex. 5000 kg/an",
    fInco: "Incoterms",
    fSpec: "Spécification technique", fSpecPh: "Pureté ≥99%, humidité max. 0,5% ...",
    fReq: "Exigences particulières", fReqPh: "Certificats (CoA, CoC, Halal, Kosher), emballage ...",
    fSds: "Télécharger spécification / FDS", fSdsPh: "PDF, DOCX ou XLSX · Cliquer pour simuler",
    fFirst: "Prénom", fLast: "Nom", fEmail: "E-mail professionnel *", fEmailPh: "a.martin@entreprise.fr", fCompany: "Entreprise", fCompanyPh: "ChimCo SAS",
    qualityOpts: ["Qualité alimentaire","Pharma / BPF","Qualité technique","Qualité électronique","Qualité réactif","Qualité cosmétique","Qualité agricole"],
    qualityErr: "Veuillez sélectionner au moins une qualité",
    submit: "Envoyer la demande →", submitNote: "Gratuit & sans engagement · Aucun compte requis",
    errRequired: "Champ obligatoire",
    successTitle: "Demande reçue !", successSub: "Votre appel d'offres pour", successSub2: "a été soumis avec succès.",
    successNote: "Les fournisseurs vérifiés soumettront une offre dans les 24–48 heures.",
    successProduct: "Produit", successQty: "Quantité", successQual: "Qualité", successAnnual: "Quantité annuelle",
    successNew: "Créer une autre demande", successLogin: "Se connecter",
    loginTitle: "Connexion", loginEmail: "E-mail", loginPw: "Mot de passe", loginBtn: "Se connecter", loginErr: "Identifiants invalides.", loginDemo: "Accès démo", loginBack: "← Retour à l'accueil",
    buyerDashTitle: "Tableau de bord acheteur", buyerDashSub: "Gérez vos achats de produits chimiques",
    newRfq: "Nouvel appel d'offres", totalRfqs: "Total appels d'offres", openRfqs: "Appels d'offres ouverts", quotesRec: "Offres reçues",
    myRfqs: "Mes appels d'offres", noRfqs: "Aucun appel d'offres. Créez votre première demande.",
    newRfqTitle: "Nouvel appel d'offres", back: "← Retour",
    sendTo: "Envoyer à", suppliers: "fournisseur(s)",
    rfqProduct: "Produit", rfqQty: "Quantité", rfqInco: "Incoterms", rfqDue: "Date de livraison", rfqSpec: "Spécifications",
    quotesReceived: "Offres reçues", noQuotes: "Aucune offre reçue.",
    colSupplier: "Fournisseur", colPrice: "Prix (CHF)", colDelivery: "Livraison", colTerms: "Conditions", colNotes: "Notes",
    best: "Meilleure", award: "Attribuer",
    supplierDash: "Tableau de bord fournisseur", supplierSub: "Soumettre des offres compétitives",
    pendingTitle: "Approbation en attente", pendingText: "Votre compte fournisseur attend l'approbation de l'administrateur.",
    availRfqs: "Appels d'offres disponibles", quotesSubmitted: "Offres soumises", winRate: "Taux de succès",
    openRfqsTitle: "Appels d'offres ouverts", noOpenRfqs: "Aucun appel d'offres ouvert pour vous.",
    quoted: "Offre soumise", submitQuote: "Soumettre une offre",
    quoteFor: "Offre pour", qPrice: "Prix (CHF) *", qPricePh: "1250.00", qDays: "Délai (jours) *", qDaysPh: "14", qTerms: "Conditions de paiement", qNotes: "Notes", qNotesPh: "Certificats, emballage, disponibilité ...", qSubmit: "Soumettre l'offre",
    adminDash: "Tableau de bord admin", adminSub: "Gérer les fournisseurs et la plateforme",
    totalSupp: "Total fournisseurs", approved: "Approuvés", pending: "En attente",
    suppMgmt: "Gestion des fournisseurs", colCompany: "Entreprise", colContact: "Contact", colStatus: "Statut", colActions: "Actions",
    approveBtn: "Approuver", revokeBtn: "Révoquer",
    platformActivity: "Activité de la plateforme", totalRfqsStat: "Total appels d'offres", totalQuotesStat: "Total offres",
    notifications: "Notifications", markRead: "Tout marquer lu", noNotif: "Aucune notification",
    qaTitle: "Q&R Anonyme", qaQuestions: "Question", qaAnon: "Anonyme · Visible par tous les fournisseurs",
    qaHint: "Votre question est soumise anonymement. Aucun fournisseur ne peut voir votre identité.",
    qaPlaceholder: "Poser une question à l'acheteur...", qaBtn: "Poser",
    qaEmpty: "Aucune question.", qaEmptyBuyer: "Aucune question des fournisseurs.",
    qaAnonLabel: "Fournisseur anonyme", qaBuyer: "Acheteur",
    qaAnswerPh: "Saisir la réponse (visible par tous les fournisseurs)...", qaAnswerBtn: "Répondre", qaPending: "Pas encore de réponse.",
    notifNewQuote: "Nouvelle offre pour", notifNewQ: "Nouvelle question anonyme pour", notifAnswer: "Réponse à la question sur", notifApproved: "Votre compte fournisseur a été approuvé !",
  },
  es: {
    appName: "ChemRFQ", appSub: "Aprovisionamiento B2B de productos químicos · DACH",
    navLogin: "Iniciar sesión", navRequest: "Solicitar ahora",
    heroTag: "Aprovisionamiento B2B de productos químicos · DACH",
    heroTitle: "Adquiera productos químicos —", heroTitleAccent: "más rápido, más transparente.",
    heroSub: "Cree una solicitud en minutos. Reciba ofertas comparables de proveedores verificados.",
    heroCta: "Solicitar gratis →", heroLogin: "Iniciar sesión",
    feat1t: "Solicitudes rápidas", feat1d: "Cree una RFQ en menos de 3 minutos y envíela a proveedores verificados.",
    feat2t: "Proveedores verificados", feat2d: "Solo proveedores aprobados y controlados de la región DACH.",
    feat3t: "Comparar ofertas", feat3d: "Precios, plazos y condiciones claramente en una tabla.",
    feat4t: "Cumplimiento normativo", feat4d: "Carga de SDS, etiquetado GMP y grado alimentario en el proceso.",
    stat1: "Proveedores", stat2: "RFQs procesadas", stat3: "Tasa de oferta", stat4: "Volumen de compras",
    formTitle: "Crear su solicitud", formSub: "Gratis y sin compromiso · Ofertas en 24–48 horas",
    secProduct: "Producto", secQty: "Cantidad y Entrega", secQuality: "Calidad", secSpec: "Especificación y Requisitos", secContact: "Sus datos de contacto",
    fProductName: "Nombre del producto *", fProductPh: "ej. Hidróxido de sodio",
    fCas: "Número CAS", fCasPh: "ej. 1310-73-2",
    fMfr: "Fabricante preferido", fMfrPh: "ej. BASF, Dow, Solvay",
    fQty: "Cantidad pedida *", fQtyPh: "500",
    fAnnual: "Cantidad anual (opcional)", fAnnualPh: "ej. 5000 kg/año",
    fInco: "Incoterms",
    fSpec: "Especificación técnica", fSpecPh: "Pureza ≥99%, humedad máx. 0,5% ...",
    fReq: "Requisitos especiales", fReqPh: "Certificados (CoA, CoC, Halal, Kosher), embalaje ...",
    fSds: "Cargar especificación / SDS", fSdsPh: "PDF, DOCX o XLSX · Clic para simular",
    fFirst: "Nombre", fLast: "Apellido", fEmail: "E-mail empresarial *", fEmailPh: "a.garcia@empresa.es", fCompany: "Empresa", fCompanyPh: "ChemCo SA",
    qualityOpts: ["Grado alimentario","Pharma / BPF","Grado técnico","Grado electrónico","Grado reactivo","Grado cosmético","Grado agrícola"],
    qualityErr: "Seleccione al menos una calidad",
    submit: "Enviar solicitud →", submitNote: "Gratis y sin compromiso · Sin cuenta requerida",
    errRequired: "Campo obligatorio",
    successTitle: "¡Solicitud recibida!", successSub: "Su RFQ para", successSub2: "se envió correctamente.",
    successNote: "Los proveedores verificados enviarán una oferta en 24–48 horas.",
    successProduct: "Producto", successQty: "Cantidad", successQual: "Calidad", successAnnual: "Cantidad anual",
    successNew: "Crear otra solicitud", successLogin: "Iniciar sesión",
    loginTitle: "Iniciar sesión", loginEmail: "E-mail", loginPw: "Contraseña", loginBtn: "Iniciar sesión", loginErr: "Credenciales inválidas.", loginDemo: "Accesos demo", loginBack: "← Volver al inicio",
    buyerDashTitle: "Panel de comprador", buyerDashSub: "Gestione su aprovisionamiento de productos químicos",
    newRfq: "Nueva RFQ", totalRfqs: "Total RFQs", openRfqs: "RFQs abiertas", quotesRec: "Ofertas recibidas",
    myRfqs: "Mis RFQs", noRfqs: "Sin RFQs. Cree su primera solicitud.",
    newRfqTitle: "Nueva solicitud de cotización", back: "← Volver",
    sendTo: "Enviar RFQ a", suppliers: "proveedor(es)",
    rfqProduct: "Producto", rfqQty: "Cantidad", rfqInco: "Incoterms", rfqDue: "Fecha de entrega", rfqSpec: "Especificaciones",
    quotesReceived: "Ofertas recibidas", noQuotes: "Sin ofertas aún.",
    colSupplier: "Proveedor", colPrice: "Precio (CHF)", colDelivery: "Entrega", colTerms: "Condiciones", colNotes: "Notas",
    best: "Mejor", award: "Adjudicar",
    supplierDash: "Panel de proveedor", supplierSub: "Enviar cotizaciones competitivas",
    pendingTitle: "Aprobación pendiente", pendingText: "Su cuenta de proveedor está pendiente de aprobación.",
    availRfqs: "RFQs disponibles", quotesSubmitted: "Ofertas enviadas", winRate: "Tasa de éxito",
    openRfqsTitle: "RFQs abiertas", noOpenRfqs: "No hay RFQs abiertas para usted.",
    quoted: "Cotizado", submitQuote: "Enviar cotización",
    quoteFor: "Cotización para", qPrice: "Precio (CHF) *", qPricePh: "1250.00", qDays: "Plazo (días) *", qDaysPh: "14", qTerms: "Condiciones de pago", qNotes: "Notas", qNotesPh: "Certificados, embalaje, disponibilidad ...", qSubmit: "Enviar cotización",
    adminDash: "Panel de administrador", adminSub: "Gestionar proveedores y plataforma",
    totalSupp: "Total proveedores", approved: "Aprobados", pending: "Pendientes",
    suppMgmt: "Gestión de proveedores", colCompany: "Empresa", colContact: "Contacto", colStatus: "Estado", colActions: "Acciones",
    approveBtn: "Aprobar", revokeBtn: "Revocar",
    platformActivity: "Actividad de la plataforma", totalRfqsStat: "Total RFQs", totalQuotesStat: "Total ofertas",
    notifications: "Notificaciones", markRead: "Marcar todo leído", noNotif: "Sin notificaciones",
    qaTitle: "Preguntas anónimas", qaQuestions: "Pregunta", qaAnon: "Anónimo · Visible para todos los proveedores",
    qaHint: "Su pregunta se envía de forma anónima. Ningún proveedor puede ver su identidad.",
    qaPlaceholder: "Hacer una pregunta al comprador...", qaBtn: "Preguntar",
    qaEmpty: "Sin preguntas aún.", qaEmptyBuyer: "Sin preguntas de proveedores.",
    qaAnonLabel: "Proveedor anónimo", qaBuyer: "Comprador",
    qaAnswerPh: "Escribir respuesta (visible para todos los proveedores)...", qaAnswerBtn: "Responder", qaPending: "Sin respuesta del comprador aún.",
    notifNewQuote: "Nueva oferta para", notifNewQ: "Nueva pregunta anónima para", notifAnswer: "Respuesta a pregunta sobre", notifApproved: "¡Su cuenta de proveedor ha sido aprobada!",
  },
};

const LangCtx = createContext({ lang: "de", t: T.de, setLang: () => {} });
const useLang = () => useContext(LangCtx);

const LANGS = [{ code: "de", label: "DE", flag: "🇩🇪" }, { code: "en", label: "EN", flag: "🇬🇧" }, { code: "fr", label: "FR", flag: "🇫🇷" }, { code: "es", label: "ES", flag: "🇪🇸" }];

function LangSwitcher({ dark }) {
  const { lang, setLang } = useLang();
  return (
    <div className="flex gap-1">
      {LANGS.map(l => (
        <button key={l.code} onClick={() => setLang(l.code)}
          className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${lang === l.code
            ? dark ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
            : dark ? "text-blue-300 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"}`}>
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}

// ─── DB helpers ───────────────────────────────────────────────────────────────
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
  qa: [],
};
function loadDB() { try { const r = localStorage.getItem("chemrfq_db"); return r ? JSON.parse(r) : SEED; } catch { return SEED; } }
function saveDB(db) { localStorage.setItem("chemrfq_db", JSON.stringify(db)); }

// ─── UI primitives ────────────────────────────────────────────────────────────
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
    globe: <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  };
  return icons[name] || null;
};
const Badge = ({ label, color }) => {
  const c = { green:"bg-green-100 text-green-800", yellow:"bg-yellow-100 text-yellow-800", red:"bg-red-100 text-red-800", blue:"bg-blue-100 text-blue-800", gray:"bg-gray-100 text-gray-600" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c[color]||c.gray}`}>{label}</span>;
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

const INCOTERMS_OPTS = ["EXW","FCA","CPT","CIP","DAP","DPU","DDP","FAS","FOB","CFR","CIF"];
const UNIT_OPTS = ["kg","t","L","m³","IBC (1000L)","Drum (200L)","Bag (25kg)","Bag (50kg)"];

// ─── Q&A Board ────────────────────────────────────────────────────────────────
function QABoard({ rfqId, user }) {
  const { t } = useLang();
  const [db, setDB] = useState(loadDB);
  const [draft, setDraft] = useState("");
  const [answerDraft, setAnswerDraft] = useState({});
  const refresh = () => setDB(loadDB());
  const qa = (db.qa || []).filter(q => q.rfqId === rfqId);
  const rfq = db.rfqs.find(r => r.id === rfqId);
  const isBuyer = user.role === "buyer";
  const isSupplier = user.role === "supplier";

  const submitQ = () => {
    const txt = draft.trim(); if (!txt) return;
    const db2 = loadDB(); if (!db2.qa) db2.qa = [];
    db2.qa.push({ id: "qa" + Date.now(), rfqId, text: txt, answer: null, createdAt: new Date().toISOString().slice(0,10) });
    db2.notifications.push({ id: "n" + Date.now(), userId: rfq.buyerId, message: `${t.notifNewQ}: ${rfq.product}`, read: false, createdAt: new Date().toISOString().slice(0,10) });
    saveDB(db2); setDraft(""); refresh();
  };
  const submitAnswer = (qaId) => {
    const txt = (answerDraft[qaId]||"").trim(); if (!txt) return;
    const db2 = loadDB();
    db2.qa = db2.qa.map(q => q.id === qaId ? { ...q, answer: txt, answeredAt: new Date().toISOString().slice(0,10) } : q);
    rfq.assignedSuppliers?.forEach(sid => {
      db2.notifications.push({ id: "n" + Date.now() + sid, userId: sid, message: `${t.notifAnswer}: ${rfq.product}`, read: false, createdAt: new Date().toISOString().slice(0,10) });
    });
    saveDB(db2); setAnswerDraft(a => ({ ...a, [qaId]: "" })); refresh();
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{t.qaTitle}</h2>
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{qa.length} {t.qaQuestions}</span>
        <span className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">{t.qaAnon}</span>
      </div>
      {isSupplier && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
          <p className="text-xs text-gray-400 mb-2">{t.qaHint}</p>
          <div className="flex gap-2">
            <input className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t.qaPlaceholder} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key==="Enter" && submitQ()} />
            <button onClick={submitQ} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1">
              <Icon name="plus" cls="w-4 h-4" /> {t.qaBtn}
            </button>
          </div>
        </div>
      )}
      {qa.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
          {isSupplier ? t.qaEmpty : t.qaEmptyBuyer}
        </div>
      ) : (
        <div className="space-y-4">
          {qa.map(q => (
            <div key={q.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-start gap-3 p-4">
                <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">A</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500">{t.qaAnonLabel}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{q.createdAt}</span>
                  </div>
                  <p className="text-sm text-gray-800">{q.text}</p>
                </div>
              </div>
              {q.answer ? (
                <div className="flex items-start gap-3 p-4 bg-green-50 border-t border-green-100">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="check" cls="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-green-700">{t.qaBuyer}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{q.answeredAt}</span>
                    </div>
                    <p className="text-sm text-gray-700">{q.answer}</p>
                  </div>
                </div>
              ) : isBuyer ? (
                <div className="p-4 bg-amber-50 border-t border-amber-100">
                  <div className="flex gap-2">
                    <input className="flex-1 border border-amber-200 bg-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder={t.qaAnswerPh} value={answerDraft[q.id]||""}
                      onChange={e => setAnswerDraft(a => ({ ...a, [q.id]: e.target.value }))}
                      onKeyDown={e => e.key==="Enter" && submitAnswer(q.id)} />
                    <button onClick={() => submitAnswer(q.id)} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">{t.qaAnswerBtn}</button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <span className="text-xs text-gray-400 italic">{t.qaPending}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage({ onLogin }) {
  const { t } = useLang();
  const [step, setStep] = useState("hero");
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
    const user = db.users.find(u => u.email===(e||email) && u.password===(pw||password));
    if (!user) { setAuthErr(t.loginErr); return; }
    onLogin(user);
  };
  const toggleQuality = (q) => setRfq(r => ({ ...r, quality: r.quality.includes(q) ? r.quality.filter(x=>x!==q) : [...r.quality, q] }));
  const validate = () => {
    const e = {};
    if (!rfq.product.trim()) e.product = t.errRequired;
    if (!rfq.quantity.trim()) e.quantity = t.errRequired;
    if (rfq.quality.length === 0) e.quality = t.qualityErr;
    setErrors(e); return Object.keys(e).length === 0;
  };
  const submitRFQ = () => { if (!validate()) return; setStep("success"); };

  const features = [
    { icon:"flask", title:t.feat1t, desc:t.feat1d },
    { icon:"users", title:t.feat2t, desc:t.feat2d },
    { icon:"chart", title:t.feat3t, desc:t.feat3d },
    { icon:"check", title:t.feat4t, desc:t.feat4d },
  ];

  if (step === "hero") return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"><Icon name="flask" cls="w-4 h-4 text-white"/></div>
          <span className="text-white font-bold text-lg">{t.appName}</span>
        </div>
        <div className="flex items-center gap-3">
          <LangSwitcher dark />
          <button onClick={()=>setStep("login")} className="text-blue-300 hover:text-white text-sm font-medium transition-colors">{t.navLogin}</button>
          <button onClick={()=>setStep("form")} className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">{t.navRequest}</button>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/>
          <span className="text-blue-300 text-sm font-medium">{t.heroTag}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">{t.heroTitle}<br/><span className="text-blue-400">{t.heroTitleAccent}</span></h1>
        <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">{t.heroSub}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={()=>setStep("form")} className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3.5 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-all">{t.heroCta}</button>
          <button onClick={()=>setStep("login")} className="border border-white/20 text-white hover:bg-white/10 font-medium px-8 py-3.5 rounded-xl text-lg transition-all">{t.heroLogin}</button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(f => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3"><Icon name={f.icon} cls="w-5 h-5 text-blue-400"/></div>
            <div className="text-white font-semibold mb-1">{f.title}</div>
            <div className="text-blue-300 text-sm leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-8 text-center">
          {[["120+",t.stat1],["5'000+",t.stat2],["98%",t.stat3],["CHF 2M+",t.stat4]].map(([v,l])=>(
            <div key={l}><div className="text-2xl font-bold text-white">{v}</div><div className="text-blue-400 text-sm">{l}</div></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (step === "form") return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={()=>setStep("hero")}>
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"><Icon name="flask" cls="w-4 h-4 text-white"/></div>
          <span className="text-white font-bold text-lg">{t.appName}</span>
        </div>
        <div className="flex items-center gap-3">
          <LangSwitcher dark />
          <button onClick={()=>setStep("login")} className="text-blue-300 hover:text-white text-sm font-medium">{t.navLogin}</button>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">{t.formTitle}</h2>
          <p className="text-blue-300 mt-1 text-sm">{t.formSub}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-7">
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t.secProduct}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input label={t.fProductName} value={rfq.product} onChange={e=>setRfq({...rfq,product:e.target.value})} placeholder={t.fProductPh} />
                {errors.product && <p className="text-red-500 text-xs -mt-3 mb-3">{errors.product}</p>}
              </div>
              <div className="col-span-2 sm:col-span-1"><Input label={t.fCas} value={rfq.cas} onChange={e=>setRfq({...rfq,cas:e.target.value})} placeholder={t.fCasPh} /></div>
              <div className="col-span-2 sm:col-span-1"><Input label={t.fMfr} value={rfq.preferredMfr} onChange={e=>setRfq({...rfq,preferredMfr:e.target.value})} placeholder={t.fMfrPh} /></div>
            </div>
          </div>
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t.secQty}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.fQty}</label>
                <div className="flex gap-2">
                  <input className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t.fQtyPh} value={rfq.quantity} onChange={e=>setRfq({...rfq,quantity:e.target.value})}/>
                  <select className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={rfq.unit} onChange={e=>setRfq({...rfq,unit:e.target.value})}>
                    {UNIT_OPTS.map(u=><option key={u}>{u}</option>)}
                  </select>
                </div>
                {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
              </div>
              <div><Input label={t.fAnnual} value={rfq.annualQty} onChange={e=>setRfq({...rfq,annualQty:e.target.value})} placeholder={t.fAnnualPh} /></div>
              <div className="col-span-2">
                <Select label={t.fInco} value={rfq.incoterms} onChange={e=>setRfq({...rfq,incoterms:e.target.value})} options={INCOTERMS_OPTS.map(i=>({value:i,label:i}))}/>
              </div>
            </div>
          </div>
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t.secQuality} *</h3>
            <div className="flex flex-wrap gap-2">
              {t.qualityOpts.map(q=>(
                <button key={q} type="button" onClick={()=>toggleQuality(q)}
                  className={`px-3 py-1.5 rounded-full text-sm border font-medium transition-colors ${rfq.quality.includes(q)?"bg-blue-600 border-blue-600 text-white":"border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"}`}>{q}</button>
              ))}
            </div>
            {errors.quality && <p className="text-red-500 text-xs mt-2">{errors.quality}</p>}
          </div>
          <div className="mb-5 pb-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t.secSpec}</h3>
            <Textarea label={t.fSpec} value={rfq.spec} onChange={e=>setRfq({...rfq,spec:e.target.value})} placeholder={t.fSpecPh} />
            <Textarea label={t.fReq} value={rfq.requirements} onChange={e=>setRfq({...rfq,requirements:e.target.value})} placeholder={t.fReqPh} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.fSds}</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={()=>setRfq({...rfq,sdsFile:"SDS_"+(rfq.product.replace(/\s/g,"_")||"doc")+".pdf"})}>
                {rfq.sdsFile ? <><Icon name="file" cls="w-5 h-5 text-green-500 mx-auto mb-1"/><p className="text-sm text-green-600">{rfq.sdsFile}</p></> :
                  <><Icon name="file" cls="w-5 h-5 text-gray-400 mx-auto mb-1"/><p className="text-sm text-gray-500">{t.fSdsPh}</p></>}
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t.secContact}</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label={t.fFirst} placeholder="Anna" />
              <Input label={t.fLast} placeholder="Müller" />
              <div className="col-span-2"><Input label={t.fEmail} type="email" placeholder={t.fEmailPh} /></div>
              <div className="col-span-2"><Input label={t.fCompany} placeholder={t.fCompanyPh} /></div>
            </div>
          </div>
          <button onClick={submitRFQ} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-base transition-colors shadow-lg shadow-blue-600/20">{t.submit}</button>
          <p className="text-center text-xs text-gray-400 mt-3">{t.submitNote}</p>
        </div>
      </div>
    </div>
  );

  if (step === "success") return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Icon name="check" cls="w-8 h-8 text-green-600"/></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.successTitle}</h2>
        <p className="text-gray-500 mb-2">{t.successSub} <strong>{rfq.product}</strong> {t.successSub2}</p>
        <p className="text-gray-500 text-sm mb-6">{t.successNote}</p>
        <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-600 mb-6 space-y-1">
          <div><span className="font-medium">{t.successProduct}:</span> {rfq.product} {rfq.cas && `(CAS ${rfq.cas})`}</div>
          <div><span className="font-medium">{t.successQty}:</span> {rfq.quantity} {rfq.unit}</div>
          {rfq.quality.length>0 && <div><span className="font-medium">{t.successQual}:</span> {rfq.quality.join(", ")}</div>}
          {rfq.annualQty && <div><span className="font-medium">{t.successAnnual}:</span> {rfq.annualQty}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={()=>setStep("form")} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg">{t.successNew}</button>
          <button onClick={()=>setStep("login")} className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 rounded-lg">{t.successLogin}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500 rounded-2xl mb-3 cursor-pointer" onClick={()=>setStep("hero")}>
            <Icon name="flask" cls="w-7 h-7 text-white"/>
          </div>
          <h1 className="text-2xl font-bold text-white">{t.appName}</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-800">{t.loginTitle}</h2>
            <LangSwitcher />
          </div>
          {authErr && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{authErr}</div>}
          <Input label={t.loginEmail} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.fEmailPh} />
          <Input label={t.loginPw} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          <button onClick={()=>attempt()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">{t.loginBtn}</button>
          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">{t.loginDemo}</p>
            <div className="grid grid-cols-3 gap-2">
              {demos.map(d=>(
                <button key={d.label} onClick={()=>{setEmail(d.email);setPassword(d.password);attempt(d.email,d.password);}}
                  className="text-xs bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 py-2 px-2 rounded-lg transition-colors">{d.label}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>setStep("hero")} className="mt-4 w-full text-sm text-gray-400 hover:text-blue-600 transition-colors">{t.loginBack}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────
function Shell({ user, onLogout, children, notifCount }) {
  const { t } = useLang();
  const [showNotif, setShowNotif] = useState(false);
  const db = loadDB();
  const notifs = db.notifications.filter(n => n.userId === user.id);
  const markRead = () => {
    const db2 = loadDB(); db2.notifications = db2.notifications.map(n => n.userId===user.id ? {...n,read:true} : n); saveDB(db2); setShowNotif(false);
  };
  const roleColors = { buyer:"bg-blue-600", supplier:"bg-emerald-600", admin:"bg-purple-600" };
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Icon name="flask" cls="w-4 h-4 text-white"/></div>
            <span className="font-bold text-gray-900 text-lg">{t.appName}</span>
          </div>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <div className="relative">
              <button onClick={()=>setShowNotif(!showNotif)} className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Icon name="bell" />
                {notifCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{notifCount}</span>}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="flex items-center justify-between p-4 border-b"><span className="font-semibold text-gray-800">{t.notifications}</span><button onClick={markRead} className="text-xs text-blue-600 hover:underline">{t.markRead}</button></div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifs.length===0 ? <p className="p-4 text-sm text-gray-500">{t.noNotif}</p> :
                      notifs.map(n=><div key={n.id} className={`p-4 border-b border-gray-100 text-sm ${n.read?"text-gray-500":"text-gray-800 bg-blue-50"}`}>{n.message}<div className="text-xs text-gray-400 mt-1">{n.createdAt}</div></div>)}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 ${roleColors[user.role]} rounded-full flex items-center justify-center text-white text-sm font-bold`}>{user.name[0]}</div>
              <div className="hidden sm:block"><div className="text-sm font-medium text-gray-800">{user.name}</div><div className="text-xs text-gray-500">{user.company}</div></div>
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
  const { t } = useLang();
  const [db, setDB] = useState(loadDB);
  const [view, setView] = useState("list");
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [form, setForm] = useState({ product:"", quantity:"", specs:"", delivery:"", incoterms:"DDP", sdsFile:"" });
  const refresh = () => setDB(loadDB());
  const myRFQs = db.rfqs.filter(r => r.buyerId===user.id);
  const approvedSuppliers = db.users.filter(u => u.role==="supplier" && u.approved);
  const submitRFQ = () => {
    if (!form.product||!form.quantity||!form.delivery) return;
    const db2 = loadDB();
    const n = { id:"r"+Date.now(), buyerId:user.id, ...form, status:"open", createdAt:new Date().toISOString().slice(0,10), assignedSuppliers:approvedSuppliers.map(s=>s.id) };
    db2.rfqs.push(n);
    approvedSuppliers.forEach(s => db2.notifications.push({ id:"n"+Date.now()+s.id, userId:s.id, message:`${t.notifNewQ}: ${form.product}`, read:false, createdAt:n.createdAt }));
    saveDB(db2); refresh(); setForm({ product:"",quantity:"",specs:"",delivery:"",incoterms:"DDP",sdsFile:"" }); setView("list");
  };
  const quotesForRFQ = (id) => db.quotes.filter(q => q.rfqId===id);
  const supplierName = (id) => db.users.find(u=>u.id===id)?.company||id;
  const statusColor = { open:"blue", closed:"gray", awarded:"green" };

  if (view==="new") return (
    <div>
      <div className="flex items-center gap-3 mb-6"><button onClick={()=>setView("list")} className="text-gray-500 hover:text-blue-600 text-sm">{t.back}</button><h1 className="text-2xl font-bold text-gray-900">{t.newRfqTitle}</h1></div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
        <Input label={t.fProductName} value={form.product} onChange={e=>setForm({...form,product:e.target.value})} placeholder={t.fProductPh} />
        <Input label={t.fQty} value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} placeholder="500 kg" />
        <Textarea label={t.fSpec} value={form.specs} onChange={e=>setForm({...form,specs:e.target.value})} placeholder={t.fSpecPh} />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.fSds}</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors" onClick={()=>setForm({...form,sdsFile:"SDS_"+form.product.replace(/\s/g,"_")+".pdf"})}>
            {form.sdsFile?<><Icon name="file" cls="w-5 h-5 text-green-500 mx-auto mb-1"/><p className="text-sm text-green-600">{form.sdsFile}</p></>:<><Icon name="file" cls="w-5 h-5 text-gray-400 mx-auto mb-1"/><p className="text-sm text-gray-500">{t.fSdsPh}</p></>}
          </div>
        </div>
        <Input label={t.rfqDue} type="date" value={form.delivery} onChange={e=>setForm({...form,delivery:e.target.value})} />
        <Select label={t.fInco} value={form.incoterms} onChange={e=>setForm({...form,incoterms:e.target.value})} options={INCOTERMS_OPTS.map(i=>({value:i,label:i}))}/>
        <div className="flex gap-3 mt-2">
          <button onClick={submitRFQ} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">{t.sendTo} {approvedSuppliers.length} {t.suppliers}</button>
          <button onClick={()=>setView("list")} className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">{t.back.replace("← ","")}</button>
        </div>
      </div>
    </div>
  );

  if (view==="detail" && selectedRFQ) {
    const rfq = db.rfqs.find(r=>r.id===selectedRFQ);
    const quotes = quotesForRFQ(selectedRFQ);
    const best = quotes.length ? quotes.reduce((a,b)=>parseFloat(a.price)<parseFloat(b.price)?a:b) : null;
    return (
      <div>
        <div className="flex items-center gap-3 mb-6"><button onClick={()=>setView("list")} className="text-gray-500 hover:text-blue-600 text-sm">{t.back}</button><h1 className="text-2xl font-bold text-gray-900">{t.rfqProduct}: {rfq.product}</h1><Badge label={rfq.status} color={statusColor[rfq.status]}/></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[[t.rfqQty,rfq.quantity],[t.rfqDue,rfq.delivery],[t.rfqInco,rfq.incoterms]].map(([k,v])=>(
            <div key={k} className="bg-white rounded-xl border border-gray-200 p-4"><div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{k}</div><div className="font-semibold text-gray-900">{v}</div></div>
          ))}
        </div>
        {rfq.specs&&<div className="bg-white rounded-xl border border-gray-200 p-4 mb-6"><div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.rfqSpec}</div><div className="text-sm text-gray-700">{rfq.specs}</div></div>}
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.quotesReceived} ({quotes.length})</h2>
        {quotes.length===0?<div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">{t.noQuotes}</div>:(
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200"><tr>{[t.colSupplier,t.colPrice,t.colDelivery,t.colTerms,t.colNotes,""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>)}</tr></thead>
              <tbody>{quotes.map(q=>(
                <tr key={q.id} className={`border-b border-gray-100 ${best?.id===q.id?"bg-green-50":""}`}>
                  <td className="px-4 py-3 font-medium text-gray-900">{supplierName(q.supplierId)}</td>
                  <td className="px-4 py-3 font-bold text-gray-900">{q.price} {q.currency}{best?.id===q.id&&<span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">{t.best}</span>}</td>
                  <td className="px-4 py-3 text-gray-600">{q.deliveryDays}d</td>
                  <td className="px-4 py-3 text-gray-600">{q.terms}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{q.notes}</td>
                  <td className="px-4 py-3"><button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">{t.award}</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        <QABoard rfqId={selectedRFQ} user={user} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">{t.buyerDashTitle}</h1><p className="text-gray-500 mt-1">{t.buyerDashSub}</p></div>
        <button onClick={()=>setView("new")} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors"><Icon name="plus" cls="w-4 h-4"/> {t.newRfq}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[[t.totalRfqs,myRFQs.length,"chart"],[t.openRfqs,myRFQs.filter(r=>r.status==="open").length,"flask"],[t.quotesRec,db.quotes.filter(q=>myRFQs.find(r=>r.id===q.rfqId)).length,"file"]].map(([l,v,icon])=>(
          <div key={l} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center"><Icon name={icon} cls="w-6 h-6 text-blue-600"/></div>
            <div><div className="text-2xl font-bold text-gray-900">{v}</div><div className="text-sm text-gray-500">{l}</div></div>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{t.myRfqs}</h2>
      {myRFQs.length===0?(
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center"><Icon name="flask" cls="w-12 h-12 text-gray-300 mx-auto mb-3"/><p className="text-gray-500">{t.noRfqs}</p></div>
      ):(
        <div className="space-y-3">{myRFQs.map(rfq=>{
          const quotes=quotesForRFQ(rfq.id);
          return(<div key={rfq.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:border-blue-300 transition-colors cursor-pointer" onClick={()=>{setSelectedRFQ(rfq.id);setView("detail");}}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><Icon name="flask" cls="w-5 h-5 text-blue-600"/></div>
              <div><div className="font-semibold text-gray-900">{rfq.product}</div><div className="text-sm text-gray-500">{rfq.quantity} · {rfq.incoterms} · {rfq.delivery}</div></div>
            </div>
            <div className="flex items-center gap-3"><span className="text-sm text-gray-500">{quotes.length} {t.quotesRec.toLowerCase()}</span><Badge label={rfq.status} color={statusColor[rfq.status]}/></div>
          </div>);
        })}</div>
      )}
    </div>
  );
}

// ─── Supplier Dashboard ───────────────────────────────────────────────────────
function SupplierDash({ user }) {
  const { t } = useLang();
  const [db, setDB] = useState(loadDB);
  const [quoteModal, setQuoteModal] = useState(null);
  const [qForm, setQForm] = useState({ price:"", deliveryDays:"", terms:"Net 30", notes:"" });
  const refresh = () => setDB(loadDB());

  if (!user.approved) return (
    <div className="flex items-center justify-center min-h-64">
      <div className="text-center bg-white rounded-2xl border border-yellow-200 shadow-sm p-10 max-w-md">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"><Icon name="bell" cls="w-8 h-8 text-yellow-600"/></div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t.pendingTitle}</h2>
        <p className="text-gray-500">{t.pendingText}</p>
      </div>
    </div>
  );

  const myRFQs = db.rfqs.filter(r => r.assignedSuppliers?.includes(user.id) && r.status==="open");
  const myQuotes = db.quotes.filter(q => q.supplierId===user.id);
  const hasQuoted = (id) => myQuotes.find(q => q.rfqId===id);

  const submitQuote = () => {
    if (!qForm.price||!qForm.deliveryDays) return;
    const db2 = loadDB();
    const rfq = db2.rfqs.find(r=>r.id===quoteModal.id);
    db2.quotes.push({ id:"q"+Date.now(), rfqId:quoteModal.id, supplierId:user.id, ...qForm, currency:"CHF", createdAt:new Date().toISOString().slice(0,10) });
    db2.notifications.push({ id:"n"+Date.now(), userId:rfq.buyerId, message:`${t.notifNewQuote}: ${rfq.product}`, read:false, createdAt:new Date().toISOString().slice(0,10) });
    saveDB(db2); refresh(); setQuoteModal(null); setQForm({ price:"",deliveryDays:"",terms:"Net 30",notes:"" });
  };

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">{t.supplierDash}</h1><p className="text-gray-500 mt-1">{user.company} · {t.supplierSub}</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[[t.availRfqs,myRFQs.length,"file"],[t.quotesSubmitted,myQuotes.length,"chart"],[t.winRate,"—","check"]].map(([l,v,icon])=>(
          <div key={l} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center"><Icon name={icon} cls="w-6 h-6 text-emerald-600"/></div>
            <div><div className="text-2xl font-bold text-gray-900">{v}</div><div className="text-sm text-gray-500">{l}</div></div>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{t.openRfqsTitle}</h2>
      {myRFQs.length===0?(
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center"><Icon name="flask" cls="w-12 h-12 text-gray-300 mx-auto mb-3"/><p className="text-gray-500">{t.noOpenRfqs}</p></div>
      ):(
        <div className="space-y-4">{myRFQs.map(rfq=>{
          const quoted=hasQuoted(rfq.id);
          return(
            <div key={rfq.id}>
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center"><Icon name="flask" cls="w-5 h-5 text-emerald-600"/></div>
                  <div><div className="font-semibold text-gray-900">{rfq.product}</div><div className="text-sm text-gray-500">{rfq.quantity} · {rfq.incoterms} · {rfq.delivery}</div>{rfq.specs&&<div className="text-xs text-gray-400 mt-0.5">{rfq.specs}</div>}</div>
                </div>
                <div>{quoted?(<div className="text-right"><Badge label={t.quoted} color="green"/><div className="text-sm font-bold text-gray-900 mt-1">{quoted.price} CHF</div></div>):(<button onClick={()=>setQuoteModal(rfq)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">{t.submitQuote}</button>)}</div>
              </div>
              <QABoard rfqId={rfq.id} user={user} />
            </div>
          );
        })}</div>
      )}
      {quoteModal&&(
        <Modal title={`${t.quoteFor}: ${quoteModal.product}`} onClose={()=>setQuoteModal(null)}>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800"><strong>{t.rfqQty}:</strong> {quoteModal.quantity} · <strong>{t.rfqInco}:</strong> {quoteModal.incoterms} · <strong>{t.rfqDue}:</strong> {quoteModal.delivery}</div>
          <Input label={t.qPrice} type="number" value={qForm.price} onChange={e=>setQForm({...qForm,price:e.target.value})} placeholder={t.qPricePh}/>
          <Input label={t.qDays} type="number" value={qForm.deliveryDays} onChange={e=>setQForm({...qForm,deliveryDays:e.target.value})} placeholder={t.qDaysPh}/>
          <Select label={t.qTerms} value={qForm.terms} onChange={e=>setQForm({...qForm,terms:e.target.value})} options={["Net 15","Net 30","Net 45","Net 60","Prepayment","LC"].map(i=>({value:i,label:i}))}/>
          <Textarea label={t.qNotes} value={qForm.notes} onChange={e=>setQForm({...qForm,notes:e.target.value})} placeholder={t.qNotesPh}/>
          <button onClick={submitQuote} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors">{t.qSubmit}</button>
        </Modal>
      )}
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDash({ user }) {
  const { t } = useLang();
  const [db, setDB] = useState(loadDB);
  const refresh = () => setDB(loadDB());
  const suppliers = db.users.filter(u => u.role==="supplier");
  const approve = (id, val) => {
    const db2=loadDB(); db2.users=db2.users.map(u=>u.id===id?{...u,approved:val}:u);
    if(val) db2.notifications.push({ id:"n"+Date.now(), userId:id, message:t.notifApproved, read:false, createdAt:new Date().toISOString().slice(0,10) });
    saveDB(db2); refresh();
  };
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">{t.adminDash}</h1><p className="text-gray-500 mt-1">{t.adminSub}</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          [t.totalSupp, suppliers.length, "users", "bg-purple-50", "text-purple-600"],
          [t.approved, suppliers.filter(s => s.approved).length, "check", "bg-green-50", "text-green-600"],
          [t.pending, suppliers.filter(s => !s.approved).length, "bell", "bg-yellow-50", "text-yellow-600"],
        ].map(([l, v, icon, bgCls, iconCls]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`${bgCls} w-12 h-12 rounded-xl flex items-center justify-center`}>
              <Icon name={icon} cls={`w-6 h-6 ${iconCls}`} />
            </div>
            <div><div className="text-2xl font-bold text-gray-900">{v}</div><div className="text-sm text-gray-500">{l}</div></div>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{t.suppMgmt}</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200"><tr>{[t.colCompany,t.colContact,t.loginEmail,t.colStatus,t.colActions].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>)}</tr></thead>
          <tbody>{suppliers.map(s=>(
            <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-4 font-medium text-gray-900">{s.company}</td>
              <td className="px-4 py-4 text-gray-600">{s.name}</td>
              <td className="px-4 py-4 text-gray-500">{s.email}</td>
              <td className="px-4 py-4"><Badge label={s.approved?t.approved:t.pending} color={s.approved?"green":"yellow"}/></td>
              <td className="px-4 py-4">
                {!s.approved&&<button onClick={()=>approve(s.id,true)} className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 mr-2"><Icon name="check" cls="w-3 h-3"/>{t.approveBtn}</button>}
                {s.approved&&<button onClick={()=>approve(s.id,false)} className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200"><Icon name="x" cls="w-3 h-3"/>{t.revokeBtn}</button>}
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">{t.platformActivity}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[[t.totalRfqsStat,db.rfqs.length],[t.totalQuotesStat,db.quotes.length]].map(([l,v])=>(
          <div key={l} className="bg-white rounded-xl border border-gray-200 p-5"><div className="text-sm text-gray-500 mb-1">{l}</div><div className="text-3xl font-bold text-gray-900">{v}</div></div>
        ))}
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [notifCount, setNotifCount] = useState(0);
  const [lang, setLang] = useState("de");
  const t = T[lang];

  useEffect(() => {
    if (user) {
      const poll = () => setNotifCount(loadDB().notifications.filter(n=>n.userId===user.id&&!n.read).length);
      poll(); const id = setInterval(poll, 3000); return () => clearInterval(id);
    }
  }, [user]);

  const dashboards = { buyer: BuyerDash, supplier: SupplierDash, admin: AdminDash };

  return (
    <LangCtx.Provider value={{ lang, t, setLang }}>
      {!user ? <LandingPage onLogin={setUser} /> : (
        <Shell user={user} onLogout={()=>setUser(null)} notifCount={notifCount}>
          {(() => { const Dash = dashboards[user.role]; return <Dash user={user} />; })()}
        </Shell>
      )}
    </LangCtx.Provider>
  );
}
