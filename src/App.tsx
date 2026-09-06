/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowDown, ShieldAlert, Heart, Activity, CheckCircle, Smartphone, HelpCircle } from "lucide-react";
import Header from "./components/Header";
import CrisisModal from "./components/CrisisModal";
import Flowchart from "./components/Flowchart";
import ServicesSection from "./components/ServicesSection";
import FaqSection from "./components/FaqSection";
import AboutSection from "./components/AboutSection";
import VolunteerSection from "./components/VolunteerSection";
import BookingForm from "./components/BookingForm";
import TestimonialsSection from "./components/TestimonialsSection";
import NewsSection from "./components/NewsSection";
import { CEPAPSY_INFO } from "./data";
import { EpaPsyLogo } from "./components/Logos";
import { useData } from "./lib/DataContext";
import AdminPanel from "./components/AdminPanel";
import PatientPortal from "./components/PatientPortal";
import photoConsultation from "../assets/photo-consultation.jpg";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPatientOpen, setIsPatientOpen] = useState(false);
  const { cepapsyInfo } = useData();

  const phoneApp = cepapsyInfo?.phoneAppointments || CEPAPSY_INFO.phoneAppointments;
  const phoneAlt1 = cepapsyInfo?.phoneAlt1 || CEPAPSY_INFO.phoneAlt1;
  const phoneAlt2 = cepapsyInfo?.phoneAlt2 || CEPAPSY_INFO.phoneAlt2;
  const phoneAlt3 = cepapsyInfo?.phoneAlt3 || CEPAPSY_INFO.phoneAlt3;
  const emailApp = cepapsyInfo?.email || CEPAPSY_INFO.email;
  const emailSecondaryApp = cepapsyInfo?.emailSecondary || CEPAPSY_INFO.emailSecondary;

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    let targetId = `${sectionId}-section`;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectBookingFromResult = (serviceName: string) => {
    setPrefilledService(serviceName);
    handleNavigate("booking");
  };

  const handleSelectBookingFromService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    handleNavigate("booking");
  };

  const handleSelectVolunteer = () => {
    handleNavigate("volunteer");
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "flowchart", "services", "faq", "about", "temoignages", "volunteer", "booking"];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(`${section}-section`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdminOpen) {
    return (
      <div className="min-h-screen bg-[#111111] text-white overflow-y-auto">
        <AdminPanel onClose={() => setIsAdminOpen(false)} />
      </div>
    );
  }

  if (isPatientOpen) {
    return (
      <div className="min-h-screen bg-stone-custom-50 overflow-y-auto">
        <PatientPortal onClose={() => setIsPatientOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-custom-50 select-none">

      <Header
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenCrisis={() => setIsCrisisOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenPatient={() => setIsPatientOpen(true)}
      />

      <main className="flex-1 space-y-20 pb-20">

        <section
          id="hero-section"
          className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden py-12 md:py-20"
        >
          <div className="absolute inset-0 bg-radial from-emerald-custom-50/70 via-stone-custom-50 to-stone-custom-50 -z-10"></div>
          <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-clay-100/40 blur-3xl -z-10"></div>

          <div className="max-w-5xl mx-auto text-center space-y-8 relative">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-emerald-custom-700 uppercase bg-emerald-custom-100 px-3.5 py-1.5 rounded-full shadow-inner animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-clay-605" />
              Soutien Psychologique Professionnel • Goma & RDC
            </span>

            <h1 className="serif-title text-4xl sm:text-5xl md:text-6.5xl font-extrabold text-stone-custom-900 tracking-tight leading-none max-w-4xl mx-auto">
              Retrouver l'écoute. <br />
              <span className="text-emerald-custom-700 italic font-normal">Reconstruire la paix intérieure.</span>
            </h1>

            <button onClick={() => handleNavigate("booking")} className="cursor-pointer block mx-auto">
              <img src={photoConsultation} alt="Consultation psychologique" className="rounded-2xl shadow-lg max-w-md mx-auto mt-8 hover:opacity-90 transition-opacity" />
            </button>

            <p className="text-sm sm:text-base md:text-lg text-stone-custom-850 leading-relaxed max-w-2xl mx-auto">
              Le <strong>Centre d'Écoute et d'Accompagnement Psychologique (CEPAPSY - ACO RDC)</strong> offre des thérapies novatrices, des interventions post-traumatiques d'urgence et un soutien d'écoute actif structuré. Basé à Goma, ouvert à tous.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
              <button
                onClick={() => handleNavigate("flowchart")}
                className="w-full sm:w-auto bg-emerald-custom-600 hover:bg-emerald-custom-700 text-stone-custom-50 font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 uppercase text-xs tracking-wider cursor-pointer"
                id="hero-find-path-btn"
              >
                Trouver mon parcours
              </button>
              <button
                onClick={() => handleNavigate("booking")}
                className="w-full sm:w-auto bg-white border border-stone-custom-300 text-stone-custom-850 hover:bg-stone-custom-100 font-bold py-4 px-8 rounded-xl transition-all uppercase text-xs tracking-wider cursor-pointer"
                id="hero-quick-book-btn"
              >
                Prendre Rendez-vous
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-6 max-w-4xl mx-auto pt-10 md:pt-16 border-t border-stone-custom-200">
              <div className="text-center px-2">
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-custom-700 serif-title">100%</span>
                <span className="text-[10px] uppercase font-bold text-stone-custom-800 tracking-wider mt-1 block">Confidentialité</span>
              </div>
              <div className="text-center border-l border-stone-custom-200 px-2">
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-custom-700 serif-title">TCC & EMDR</span>
                <span className="text-[10px] uppercase font-bold text-stone-custom-800 tracking-wider mt-1 block">Thérapies Scientifiques</span>
              </div>
              <div className="text-center md:border-l border-stone-custom-200 px-2">
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-custom-700 serif-title">HQ Goma</span>
                <span className="text-[10px] uppercase font-bold text-stone-custom-800 tracking-wider mt-1 block">Cabinet & Domicile</span>
              </div>
              <div className="text-center border-l border-stone-custom-200 px-2">
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-custom-700 serif-title">24/7+</span>
                <span className="text-[10px] uppercase font-bold text-stone-custom-800 tracking-wider mt-1 block">Soutien Mobile/Ligne</span>
              </div>
            </div>

            <button
              onClick={() => handleNavigate("flowchart")}
              className="animate-bounce inline-flex items-center justify-center p-2 rounded-full border border-stone-custom-200 text-stone-custom-800 hover:text-emerald-custom-600 hover:border-emerald-custom-200 transition-all mt-6 cursor-pointer"
              aria-label="Faire défiler"
              id="scroll-down-btn"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        <hr className="max-w-7xl mx-auto border-stone-custom-200/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Flowchart
            onSelectBooking={handleSelectBookingFromResult}
            onSelectVolunteer={handleSelectVolunteer}
          />
        </div>

        <hr className="max-w-7xl mx-auto border-stone-custom-200/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ServicesSection
            onSelectService={handleSelectBookingFromService}
          />
        </div>

        <hr className="max-w-7xl mx-auto border-stone-custom-200/50" />

        <div>
          <FaqSection />
        </div>

        <hr className="max-w-7xl mx-auto border-stone-custom-200/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AboutSection />
        </div>

        <hr className="max-w-7xl mx-auto border-stone-custom-200/50" />

        <div>
          <TestimonialsSection />
        </div>

        <hr className="max-w-7xl mx-auto border-stone-custom-200/50" />
                <NewsSection />

        <hr className="max-w-7xl mx-auto border-stone-custom-200/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <VolunteerSection />
        </div>

        <hr className="max-w-7xl mx-auto border-stone-custom-200/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <BookingForm
            prefilledCategory={prefilledService}
            clearPrefill={() => setPrefilledService("")}
          />
        </div>

      </main>
            <footer className="bg-stone-custom-900 text-stone-300 py-16 px-4 border-t border-emerald-custom-800 relative select-none">

        <div className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full bg-emerald-custom-600/10 blur-3xl -ml-48"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 relative">

          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 shrink-0 bg-white p-1 rounded-xl shadow-inner border border-stone-custom-800">
                <EpaPsyLogo size={34} className="h-8 w-auto" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg font-sans">CEPAPSY</h4>
                <span className="text-[10px] text-stone-400 font-mono tracking-wider">RECHERCHE • FORMATION • INTERVENTION</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Le Centre d'Écoute et d'Accompagnement Psychologique est conventionné sous le statut légal RDC de l'A.S.B.L. Action Commune (ACO-RDC) laïque et apolitique.
            </p>

            <span className="text-xs text-stone-400 font-medium block">
              🛡 Secret professionnel absolute & Agrémentation nationale en santé mentale en RDC.
            </span>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Bureaux d'Attribution</h4>
            <div className="space-y-3.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-custom-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Bureau Central (HQ) :</strong><br />
                  Goma, Commune de Karisimbi, Q. Mabanga Nord, Avenue Osso2, Numéro 222 (Cabinet Thérapeutique principal).
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-custom-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Bureau Kasika :</strong><br />
                  Goma, Commune de Karisimbi, Q. Kasika, Avenue Lwama, RDC.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Prise de contact Directe</h4>
            <div className="space-y-3 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-clay-600" />
                Hotline Standard : {phoneApp}
              </p>
              <p className="flex items-center gap-2">
                📧 Collège Clinique : {emailApp}
              </p>
              <p className="flex items-center gap-2 text-[11px] text-stone-500">
                📥 Représentation ACO : {emailSecondaryApp}
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} CEPAPSY RDC. Tous droits réservés. Association sans but lucratif ACO-RDC.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setIsAdminOpen(true)} className="hover:underline text-[#b57a55] font-semibold">🔑 Administration</button>
            <span>•</span>
            <button onClick={() => handleNavigate("about")} className="hover:underline">Mentions Légales</button>
            <span>•</span>
            <button onClick={() => setIsCrisisOpen(true)} className="hover:underline text-emerald-custom-300 font-semibold">Conseils en cas de crise</button>
          </div>
        </div>

      </footer>

      <CrisisModal
        isOpen={isCrisisOpen}
        onClose={() => setIsCrisisOpen(false)}
        onSelectBooking={handleSelectBookingFromResult}
      />

    </div>
  );
}