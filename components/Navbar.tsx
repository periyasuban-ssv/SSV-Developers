import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logoimg from "../src/assets/ssvround.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  /* Scroll behaviour */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    const el = document.getElementById(id);

    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const projectCategories = [
    "All",
    "Residential",
    "Commercial",
    "Industrial",
    "Infrastructure",
  ];

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    setIsOpen(false);

    const event = new CustomEvent("project-category-change", {
      detail: category,
    });

    window.dispatchEvent(event);

    const el = document.getElementById("projects");

    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-500
      ${hidden ? "-translate-y-full" : "translate-y-0"}
      ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* LOGO */}
          <button
            onClick={(e) => handleLinkClick(e, "home")}
            className="flex items-center gap-2"
          >
            <div
              className={`rounded-full flex items-center justify-center shadow-md transition
              ${scrolled ? "bg-amber-500" : "bg-slate-900"}
              h-10 w-10 sm:h-12 sm:w-12`}
            >
              <img
                src={logoimg}
                className="h-full w-full object-contain rounded-full"
              />
            </div>

            <span className="font-black text-lg sm:text-xl tracking-tight">
              DEVELOPERS
            </span>
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-1">
            {["home", "about", "services", "growth", "projects", "contact"].map(
              (item) => (
                <div key={item} className="relative group">
                  <button
                    onClick={(e) => handleLinkClick(e, item)}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-amber-500 transition"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>

                  {item === "projects" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
                      <div className="bg-white shadow-xl rounded-xl border py-2 w-44">
                        {projectCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={(e) => handleCategoryClick(e, cat)}
                            className="block w-full text-left px-5 py-2 text-sm font-medium hover:bg-amber-50 hover:text-amber-600"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ),
            )}

            <button
              onClick={(e) => handleLinkClick(e, "contact")}
              className="ml-3 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-amber-500 transition"
            >
              REQUEST QUOTE
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-500
        ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="flex flex-col px-6 py-6">
          {["home", "about", "services", "growth", "projects", "contact"].map(
            (item) => (
              <button
                key={item}
                onClick={(e) => handleLinkClick(e, item)}
                className="text-left py-4 border-b font-semibold text-slate-800"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ),
          )}

          <button
            onClick={(e) => handleLinkClick(e, "contact")}
            className="mt-6 bg-amber-500 text-white py-3 rounded-lg font-bold"
          >
            GET FREE QUOTE
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
