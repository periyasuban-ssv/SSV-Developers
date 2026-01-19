import React from 'react';
import { ArrowRight, Star, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 lg:pt-56 pb-24 lg:pb-48 overflow-hidden bg-slate-50">
      {/* Subtle Architectural Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.03] grayscale"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=1920&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-10">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white shadow-xl shadow-amber-500/5 border border-amber-100 text-amber-700 font-black text-xs uppercase tracking-[0.2em] animate-fade-in mx-auto">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            Precision Engineered Construction
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85]">
            Building The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
              Future Today
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            SSV Developers: Transforming complex architectural visions into structural reality with sustainable engineering and elite craftsmanship.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center px-12 py-5 text-lg font-black text-white bg-slate-900 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-amber-500/20 transform hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                START PROJECT
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-12 py-5 text-lg font-black text-slate-900 bg-white border-2 border-slate-200 rounded-2xl hover:border-amber-500/40 hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-sm"
            >
              VIEW PORTFOLIO
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-12 opacity-70">
             {[ 'On-Time Delivery', 'Certified Quality', 'Safety First'].map(feature => (
               <div key={feature} className="flex items-center gap-2.5">
                  <CheckCircle2 className="text-amber-500 w-5 h-5" />
                  <span className="text-slate-600 font-black text-xs uppercase tracking-widest">{feature}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
      
      {/* Minimal Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    </section>
  );
};

export default Hero;