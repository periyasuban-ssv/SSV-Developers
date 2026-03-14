import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import StatsChart from "./components/StatsChart";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ArrowUp, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [autoPopup, setAutoPopup] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const revealCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const handleScroll = () => setShowBackToTop(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => setAutoPopup(true), 5000);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Navbar />

      <main>
        <div id="home" className="reveal active">
          <Hero />
        </div>

        <div id="about" className="reveal scroll-mt-20">
          <About />
        </div>

        <div id="services" className="reveal scroll-mt-20">
          <Services />
        </div>

        <div id="growth" className="reveal scroll-mt-20">
          <StatsChart />
        </div>

        <div id="projects" className="reveal scroll-mt-20">
          <Projects />
        </div>

        <div id="contact" className="reveal scroll-mt-20">
          <Contact />
        </div>
      </main>

      <Footer />

      {/* WhatsApp Floating Messenger Bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Chat Popup */}
        {(openChat || autoPopup) && (
          <div
            className={`bg-white w-80 rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-500 ease-out ${
              openChat
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            {/* Header */}
            <div className="bg-[#25D366] text-white p-4 font-bold flex justify-between items-center rounded-t-3xl shadow-lg">
              WhatsApp Support
              <button
                onClick={() => {
                  setOpenChat(false);
                  setAutoPopup(false);
                }}
                className="hover:bg-green-600 rounded-full p-1 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 text-gray-600 text-sm leading-relaxed flex flex-col gap-2">
              <div className="bg-gray-100 p-3 rounded-xl inline-block max-w-[90%] animate-slide-in-left">
                👋 Hello! <br />
                Need help with construction services?
              </div>

              <div className="flex items-center gap-1 mt-2 text-gray-400 text-xs">
                <span>SSV Developer is typing</span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>

            {/* Chat Button */}
            <a
              href="https://wa.me/919150134954?text=Hello%20SSV%20Developers"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#25D366] text-white text-center py-3 font-semibold hover:bg-[#1ebe5d] transition"
            >
              Start WhatsApp Chat
            </a>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => {
            setOpenChat(!openChat);
            setAutoPopup(false);
          }}
          className="relative bg-[#25D366] hover:bg-[#1ebe5d] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 animate-bounce-slow"
        >
          {openChat ? (
            <X size={28} />
          ) : (
            <>
              <FaWhatsapp size={28} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-ping"></span>
            </>
          )}
        </button>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed left-6 bottom-6 z-40 p-4 bg-white border border-slate-200 text-slate-900 rounded-full shadow-2xl transition-all duration-500 transform hover:bg-amber-500 hover:text-white hover:-translate-y-2 active:scale-90 ${
          showBackToTop
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-20 opacity-0 scale-50 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Extra Animations */}
      <style>{`
        @keyframes slide-in-left {
          0% { transform: translateX(-50%) scale(0.9); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        .animate-slide-in-left { animation: slide-in-left 0.4s ease-out; }

        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow { animation: bounce-slow 1.5s infinite; }
      `}</style>
    </div>
  );
}

export default App;
