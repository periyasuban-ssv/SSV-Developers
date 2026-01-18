import React, { useState } from "react";
import {
  Facebook,
  X,
  Instagram,
  Linkedin,
  HardHat,
  Check,
  LucideTwitter,
  XIcon,
} from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 5000);
  };
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-amber-500 p-0 rounded-full h-20 w-20">
                <img
                  src="ssvround.png"
                  alt="Logo"
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">
                <span className="text-amber-500 uppercase">Developers</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Building the future with precision, integrity, and innovation.
              Your trusted partner in construction excellence since 2010.
            </p>
            <div className="flex gap-4">
              {[
                {
                  Icon: Facebook,
                  url: " https://www.facebook.com/profile.php?id=61586671684516",
                },
                { Icon: X, url: "https://x.com/SSV_Developers" },
                {
                  Icon: Instagram,
                  url: "https://www.instagram.com/ssv_developers/",
                },
                {
                  Icon: Linkedin,
                  url: "https://www.linkedin.com/company/ssv-developers/about/",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <item.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">
              Explore
            </h4>
            <ul className="space-y-3 font-bold text-sm">
              {[
                "home",
                "about",
                "services",
                "growth",
                "projects",
                "contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(link)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-amber-500 transition-all hover:translate-x-1 inline-block capitalize"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Services */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">
              Our Solutions
            </h4>
            <ul className="space-y-3 font-bold text-sm">
              <li>
                <a
                  href="#services"
                  className="hover:text-amber-500 transition-colors"
                >
                  Residential Projects
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-amber-500 transition-colors"
                >
                  Commercial Complexes
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-amber-500 transition-colors"
                >
                  Renovations
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-amber-500 transition-colors"
                >
                  Interior Planning
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-amber-500 transition-colors"
                >
                  Civil Engineering
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">
              Insights
            </h4>
            <p className="text-sm text-slate-400 mb-6 font-medium">
              Stay updated with our latest architectural breakthroughs.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-500 font-black animate-in zoom-in-95 duration-300">
                <Check className="w-5 h-5" />
                <span>SUCCESSFULLY JOINED</span>
              </div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="bg-slate-900 border-2 border-slate-800 rounded-xl px-5 py-3 text-sm w-full focus:outline-none focus:border-amber-500 transition-all font-bold"
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-white px-4 py-3 rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-xl hover:shadow-amber-500/20 active:scale-95 font-black text-xs tracking-widest"
                >
                  JOIN NETWORK
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <p>
            &copy; {new Date().getFullYear()} SSV Developers Engineering. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-500">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
