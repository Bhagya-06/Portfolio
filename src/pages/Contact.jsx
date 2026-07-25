import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, ArrowRight, CheckCircle2, Share2 } from "lucide-react";
import Github from "../components/GithubIcon";
import { fadeUp } from "../styles/motionVariants";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

import profileData from "../data/profile.json";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // To send emails silently in the background directly to bhagya6balaji@gmail.com,
    // paste your free Web3Forms access key below (get it free in seconds from https://web3forms.com).
    const accessKey = "b82b9991-400f-4e07-a183-6af3d1ed2d2f";

    const triggerMailto = () => {
      const subject = encodeURIComponent(`Portfolio Message from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.location.href = `mailto:bhagya6balaji@gmail.com?subject=${subject}&body=${body}`;
      setSent(true);
    };

    if (accessKey && accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: form.name,
            email: form.email,
            message: form.message,
            subject: `Portfolio Message from ${form.name}`
          })
        });
        const result = await response.json();
        if (result.success) {
          setSent(true);
        } else {
          triggerMailto();
        }
      } catch (err) {
        triggerMailto();
      }
    } else {
      triggerMailto();
    }
  };

  return (
    <div className="min-h-[80vh] pt-24 pb-16 px-6 max-w-6xl mx-auto">
      <Reveal>
        <SectionLabel number="05" label="Contact" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

          <div className="md:col-span-5">
            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-foreground leading-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Let's build<br /><span className="text-primary">something</span><br />great.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-muted-foreground font-light leading-relaxed mb-10">
              Open to GenAI &amp; UI/UX Product Design roles, rapid prototyping collaborations, and consulting.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-6 font-mono text-xs">
              <a href={profileData.profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Share2 size={16} className="text-primary" /> linkedin.com/in/bhagya-b-designer
              </a>
              <a href={profileData.profile.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Github size={16} className="text-primary" /> github.com/Bhagya-06
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={16} className="text-primary" /> {profileData.profile.location}
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-7">
            {!sent ? (
              <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-mono text-[9px] text-muted-foreground/50 tracking-[0.25em] uppercase block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    required
                    placeholder="Your name"
                    className="w-full bg-card border border-border px-4 py-3.5 text-xs text-foreground font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] text-muted-foreground/50 tracking-[0.25em] uppercase block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-card border border-border px-4 py-3.5 text-xs text-foreground font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] text-muted-foreground/50 tracking-[0.25em] uppercase block mb-2">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    required
                    rows={6}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-card border border-border px-4 py-3.5 text-xs text-foreground font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-4 hover:bg-primary/90 transition-colors font-bold flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight size={12} />
                </button>
              </motion.form>
            ) : (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center border border-primary/30 bg-card p-8 font-mono">
                <CheckCircle2 size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Message Received!</h3>
                <p className="text-xs text-muted-foreground">Thank you for reaching out. I'll get back to you shortly.</p>
              </motion.div>
            )}
          </div>

        </div>
      </Reveal>
    </div>
  );
}
