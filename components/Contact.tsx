import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">(
    "idle",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-slate-950 text-white relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-amber-500 font-black tracking-widest uppercase text-xs mb-4">
                Contact Us
              </h2>
              <h3 className="text-5xl font-black mb-8 leading-tight">
                Secure Your <br />
                Consultation Today
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                We're ready to discuss your next big venture. Our expert
                engineers provide comprehensive assessments and transparent
                project roadmaps.
              </p>
            </div>

            <div className="grid gap-8">
              <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group">
                <div className="bg-amber-500/20 p-4 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">
                    Call
                  </p>
                  <a
                    href="tel:+91 9150134954"
                    className="text-xl font-bold hover:text-amber-500 transition-colors"
                  >
                    +91 9150134954
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group">
                <div className="bg-amber-500/20 p-4 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:ssvbuildersinfra@gmail.com"
                    className="text-xl font-bold hover:text-amber-500 transition-colors"
                  >
                    ssvbuildersinfra@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
              {formState === "success" ? (
                <div className="py-20 text-center animate-in zoom-in-95 duration-500">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-6">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 mb-2">
                    Message Received!
                  </h4>
                  <p className="text-slate-500">
                    Our engineering team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-slate-900 mb-8">
                    Send A Message
                  </h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 outline-none text-slate-900 transition-all font-bold"
                          placeholder="E.g. Alexander Pierce"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 outline-none text-slate-900 transition-all font-bold"
                          placeholder="E.g. alex@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                        Project Category
                      </label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 outline-none text-slate-900 transition-all font-bold appearance-none">
                        <option>Residential Construction</option>
                        <option>Commercial Development</option>
                        <option>Industrial Infrastructure</option>
                        <option>Remodeling & Renovation</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                        Project Details
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 outline-none text-slate-900 transition-all font-bold"
                        placeholder="Tell us briefly about your vision..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-amber-500 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-amber-500/30 transform hover:-translate-y-1 active:scale-95 disabled:opacity-70"
                    >
                      {formState === "sending" ? (
                        <>
                          <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                          PROCESSING...
                        </>
                      ) : (
                        <>
                          TRANSMIT MESSAGE
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
