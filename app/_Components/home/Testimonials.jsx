"use client";

import { motion } from "framer-motion";

const testimonials = [
  { name: "Arjun Sharma", role: "Competitive Programmer • Codeforces Expert", initials: "AS", rating: 5, feedback: "TRYAGAINLATER transformed how I approach contests. Instead of blanking on techniques I've used before, I now walk in with every pattern fresh. My rating jumped 300+ points in two months." },
  { name: "Priya Patel", role: "LeetCode Enthusiast • 500+ Problems", initials: "PP", rating: 5, feedback: "I used to solve problems and forget them within a week. Now the spaced repetition brings them back at the perfect time. The platform adapts to my pace — I've never felt more in control of my learning." },
  { name: "Rahul Verma", role: "Placed at Google • IIT Delhi", initials: "RV", rating: 5, feedback: "I cracked my dream company interview because nothing caught me off guard. Every DP pattern, every graph trick — I'd revised them all systematically. TRYAGAINLATER was the single biggest factor in my placement success. I genuinely can't recommend it enough to anyone preparing for top-tier interviews." },
  { name: "Neha Singh", role: "Software Engineer • Amazon", initials: "NS", rating: 5, feedback: "As a working developer, I don't have hours to re-learn DSA. The quick 15-minute revision sessions keep me sharp without eating into my day. Lifesaver for staying interview-ready." },
  { name: "Akshay Kumar", role: "3rd Year CSE • NIT Trichy", initials: "AK", rating: 5, feedback: "Went from struggling with medium-level problems to consistently cracking hard ones in 3 months. The pattern recognition insights showed me connections between problems I never saw before. Every session builds on the last — no more repeating the same mistakes. My confidence in coding rounds is completely different now." },
  { name: "Divya Nair", role: "CodeChef 5-Star • IIIT Hyderabad", initials: "DN", rating: 5, feedback: "The interface is gorgeous and the analytics are incredibly useful. I can see exactly which topics need work. 10/10 would recommend to anyone serious about DSA mastery." },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 0.86, 0.39, 0.96] }}
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex flex-col gap-5 p-7 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] transition-all duration-500 hover:border-primary/25 overflow-hidden cursor-pointer break-inside-avoid mb-6"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(120,200,255,0.04), transparent 60%, rgba(120,200,255,0.02))", boxShadow: "inset 0 0 0 1px rgba(120,200,255,0.08)", borderRadius: "inherit" }} />
      <motion.div animate={{ y: [0, -6, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-4 right-4 w-8 h-8 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(120,200,255,0.15), transparent 70%)" }} />
      <div className="absolute top-5 right-6 text-6xl leading-none font-serif text-primary/[0.06] select-none pointer-events-none">&ldquo;</div>
      <div className="flex items-center gap-4 relative z-10">
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }} className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-cyan-500/80 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-primary/20">
          {testimonial.initials}
        </motion.div>
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-snug">{testimonial.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{testimonial.role}</p>
        </div>
      </div>
      <div className="relative z-10"><StarRating rating={testimonial.rating} /></div>
      <p className="text-[14px] leading-relaxed text-foreground/75 flex-1 relative z-10">&ldquo;{testimonial.feedback}&rdquo;</p>
      <motion.div initial={{ scaleX: 0, opacity: 0 }} whileHover={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left" />
    </motion.div>
  );
}

export default function Testimonials() {
  const col1 = [testimonials[0], testimonials[3]];
  const col2 = [testimonials[1], testimonials[4]];
  const col3 = [testimonials[2], testimonials[5]];

  return (
    <section id="testimonials" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <motion.div animate={{ y: [0, -20, 0], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.65 0.15 195) 0%, transparent 70%)", filter: "blur(120px)" }} />
        <motion.div animate={{ y: [0, 15, 0], opacity: [0.02, 0.05, 0.02] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.60 0.18 330) 0%, transparent 70%)", filter: "blur(110px)" }} />
      </div>
      <motion.div animate={{ y: [0, -15, 0], rotate: [0, 360] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute top-32 right-16 w-3 h-3 rounded-full border border-amber-400/20" />
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="pointer-events-none absolute bottom-48 left-20 w-2 h-2 rounded-full bg-primary/15" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold tracking-[0.2em] uppercase text-amber-400">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Thousands of problems solved.{" "}<br className="hidden sm:block" />
            <motion.span initial={{ backgroundPosition: "100% center" }} animate={{ backgroundPosition: "0% center" }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent bg-[length:200%_auto]">
              None forgotten.
            </motion.span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hear from students and developers who turned their DSA journey around with systematic revision.
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-6 items-start">
          <div className="flex flex-col">{col1.map((t) => (<TestimonialCard key={t.name} testimonial={t} index={testimonials.indexOf(t)} />))}</div>
          <div className="flex flex-col pt-10">{col2.map((t) => (<TestimonialCard key={t.name} testimonial={t} index={testimonials.indexOf(t)} />))}</div>
          <div className="flex flex-col pt-4">{col3.map((t) => (<TestimonialCard key={t.name} testimonial={t} index={testimonials.indexOf(t)} />))}</div>
        </div>
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6 items-start">
          <div className="flex flex-col">{[testimonials[0], testimonials[2], testimonials[4]].map((t) => (<TestimonialCard key={t.name} testimonial={t} index={testimonials.indexOf(t)} />))}</div>
          <div className="flex flex-col pt-8">{[testimonials[1], testimonials[3], testimonials[5]].map((t) => (<TestimonialCard key={t.name} testimonial={t} index={testimonials.indexOf(t)} />))}</div>
        </div>
        <div className="flex flex-col sm:hidden">
          {testimonials.map((t, i) => (<TestimonialCard key={t.name} testimonial={t} index={i} />))}
        </div>
      </div>
    </section>
  );
}
