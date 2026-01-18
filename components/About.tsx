import React from "react";
import {
  Target,
  ShieldCheck,
  Award,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">
              Our Legacy
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
              Constructing with <br />
              Purpose & Precision
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
              Established in 2010, SSV Developers has evolved from a boutique
              contractor into a regional powerhouse. Our 14-year journey is
              defined by structural integrity, aesthetic innovation, and an
              unwavering commitment to our clients' visions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: Award, label: "20+ Years Guaranted" },
                { icon: Users, label: "Expert Engineers" },
                { icon: ShieldCheck, label: "Zero-Harm Policy" },
                { icon: TrendingUp, label: "Sustainable Growth" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-amber-50 hover:border-amber-200 group"
                >
                  <div className="bg-white p-2.5 rounded-xl text-amber-600 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-black text-slate-900 text-xs uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="mt-1 bg-amber-500/10 p-2 rounded-lg">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-2">
                    Our Mission
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    To engineer landmarks that define skylines while maintaining
                    the highest safety and sustainability standards in the
                    industry.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="mt-1 bg-blue-500/10 p-2 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-2">
                    Our Core Values
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Integrity in every beam, transparency in every contract, and
                    innovation in every design phase.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Excellence Column */}
          <div className="lg:w-1/2 order-1 lg:order-2 relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] bg-slate-100 aspect-[4/5] lg:aspect-auto lg:h-[700px]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                alt="SSV Developers Architectural Excellence"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />

              {/* Years of Experience Badge */}
              <div className="absolute top-12 left-12 bg-white/95 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                <div className="text-center">
                  <p className="text-slate-900 font-black text-7xl tracking-tighter">
                    14+
                  </p>
                  <p className="text-amber-600 text-xs font-black uppercase tracking-[0.3em] mt-2 whitespace-nowrap">
                    Years of <br /> Excellence
                  </p>
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10">
                <div className="flex items-center gap-4 text-white">
                  <div className="h-px w-12 bg-amber-500"></div>
                  <span className="text-xs font-black uppercase tracking-[0.4em]">
                    Est. 2010
                  </span>
                </div>
                <h4 className="text-white text-3xl font-black mt-4">
                  Delivering Quality <br />
                  Without Compromise
                </h4>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
