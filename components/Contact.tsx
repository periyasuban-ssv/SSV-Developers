import React, { useState, useRef } from "react";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">(
    "idle",
  );

  const [phone, setPhone] = useState("");

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setFormState("sending");

    emailjs
      .sendForm(
        "service_lqr8fts", // replace with your service id
        "template_fpqrcah", // replace with your template id
        form.current,
        "JpM5DYkOHd_YVRcD4", // replace with your public key
      )
      .then(() => {
        setFormState("success");

        setTimeout(() => {
          setFormState("idle");
        }, 5000);

        form.current?.reset();
      })
      .catch((error) => {
        console.log(error);
        alert("Message failed to send");
        setFormState("idle");
      });
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
                We're ready to discuss your next big venture.
              </p>
            </div>

            <div className="grid gap-8">
              <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10">
                <Phone className="w-6 h-6 text-amber-500" />

                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">
                    Call
                  </p>

                  <a
                    href="tel:+919150134954"
                    className="text-xl font-bold hover:text-amber-500"
                  >
                    +91 9150134954
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10">
                <Mail className="w-6 h-6 text-amber-500" />

                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">
                    Email
                  </p>

                  <a
                    href="mailto:ssvbuildersinfra@gmail.com"
                    className="text-xl font-bold hover:text-amber-500"
                  >
                    ssvbuildersinfra@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MODERN CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
              {formState === "success" ? (
                <div className="text-center py-16">
                  <CheckCircle className="mx-auto text-green-600 w-16 h-16 mb-4 animate-bounce" />
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">
                    Message Sent Successfully
                  </h4>
                  <p className="text-slate-500">We will contact you soon.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">
                    SEND A Message
                  </h3>

                  <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* NAME */}
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="Full Name"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-slate-900 shadow-sm placeholder-gray-400"
                    />

                    {/* EMAIL */}
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="Email Address"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-slate-900 shadow-sm placeholder-gray-400"
                    />

                    {/* PHONE */}
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      enableSearch={true}
                      countryCodeEditable={false}
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "50px",
                        fontSize: "16px",
                        color: "#000",
                        backgroundColor: "#f8fafc",
                        borderRadius: "12px",
                        border: "2px solid #e2e8f0",
                        paddingLeft: "50px",
                      }}
                      dropdownStyle={{
                        color: "#000",
                        backgroundColor: "#fff",
                      }}
                      searchStyle={{
                        color: "#000",
                      }}
                    />

                    {/* HIDDEN PHONE FIELD */}
                    <input type="hidden" name="phone" value={phone} />

                    {/* PROJECT TYPE */}
                    <select
                      name="project_type"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-slate-900 shadow-sm"
                    >
                      <option>Residential Construction</option>
                      <option>Commercial Development</option>
                      <option>Industrial Infrastructure</option>
                      <option>Renovation</option>
                    </select>

                    {/* MESSAGE */}
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Project Details"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-slate-900 shadow-sm placeholder-gray-400"
                    />

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-600 shadow-lg transition-all transform hover:scale-105 active:scale-95"
                    >
                      {formState === "sending" ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
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
