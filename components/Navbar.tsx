import React, { useState, useEffect } from "react";
import { Menu, X, HardHat, ChevronDown } from "lucide-react";
import logoimg from "../src/assets/ssvround.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const sections = [
      "home",
      "about",
      "services",
      "growth",
      "projects",
      "contact",
    ];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const projectCategories = [
    { name: "All Projects", value: "All" },
    { name: "Residential", value: "Residential" },
    { name: "Commercial", value: "Commercial" },
    { name: "Industrial", value: "Industrial" },
    { name: "Infrastructure", value: "Infrastructure" },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    const event = new CustomEvent("project-category-change", {
      detail: category,
    });
    window.dispatchEvent(event);
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Services", href: "services" },
    { name: "Growth", href: "growth" },
    { name: "Projects", href: "projects", isDropdown: true },
    { name: "Contact", href: "contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? "glass-nav shadow-lg py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Brand */}
          <button
            onClick={(e) => handleLinkClick(e, "home")}
            className="flex items-center gap-3 group relative z-[110] outline-none"
          >
            <div
              className={`relative flex items-center justify-center h-20 w-20 rounded-full transition-all duration-500 shadow-lg ${scrolled ? "bg-amber-500 rotate-0" : "bg-slate-900 -rotate-6 group-hover:rotate-0"}`}
            >
              <img
                src={logoimg}
                alt="Logo"
                className="h-full w-full object-contain rounded-full"
              />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900">
              DEVELOPERS
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group px-1">
                <button
                  onClick={(e) =>
                    link.isDropdown
                      ? handleCategoryClick(e, "All")
                      : handleLinkClick(e, link.href)
                  }
                  className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 outline-none ${
                    activeSection === link.href
                      ? "text-amber-600 bg-amber-50"
                      : "text-slate-600 hover:text-amber-500 hover:bg-slate-100/50"
                  }`}
                >
                  {link.name}
                  {link.isDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </button>

                {/* Dropdown */}
                {link.isDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2">
                      {projectCategories.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={(e) => handleCategoryClick(e, cat.value)}
                          className="w-full text-left block px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors outline-none"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="pl-4">
              <button
                onClick={(e) => handleLinkClick(e, "contact")}
                className="bg-slate-900 text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-amber-500 transition-all duration-300 shadow-xl hover:shadow-amber-500/20 transform hover:-translate-y-1 active:scale-95 outline-none"
              >
                REQUEST QUOTE
              </button>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[110] p-2.5 rounded-xl bg-slate-100 text-slate-900 hover:bg-amber-500 hover:text-white transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[105] bg-white/95 backdrop-blur-xl transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-12 overflow-y-auto">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                <div
                  className={`flex items-center justify-between rounded-2xl transition-all ${activeSection === link.href ? "bg-amber-50" : ""}`}
                >
                  <button
                    className={`flex-1 text-left px-6 py-4 text-xl font-black outline-none ${activeSection === link.href ? "text-amber-600" : "text-slate-900"}`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.name}
                  </button>
                  {link.isDropdown && (
                    <button
                      onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                      className="p-4 outline-none"
                    >
                      <ChevronDown
                        className={`w-6 h-6 transition-transform ${mobileProjectsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {link.isDropdown && mobileProjectsOpen && (
                  <div className="pl-8 mt-2 space-y-1">
                    {projectCategories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={(e) => handleCategoryClick(e, cat.value)}
                        className="w-full text-left block py-3 text-lg font-bold text-slate-500 active:text-amber-500 outline-none"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <button
              onClick={(e) => handleLinkClick(e, "contact")}
              className="block w-full text-center bg-amber-500 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-amber-500/30 active:scale-95 transition-transform outline-none"
            >
              GET A FREE QUOTE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
