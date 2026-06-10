"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>),
    label: "LeetCode Learners",
    desc: "You've solved 200+ problems but can barely remember 50. Our spaced revision engine brings back the ones slipping through the cracks — right when your brain needs them.",
    tag: "Most Popular",
    tagColor: "from-amber-500 to-orange-500",
    accent: "from-amber-500/15 to-orange-500/10",
    borderAccent: "group-hover:border-amber-500/30",
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>),
    label: "Codeforces Competitors",
    desc: "Contest days demand instant recall. Reinforce techniques between rounds so your rating climbs — and stays there.",
    tag: "Advanced",
    tagColor: "from-blue-500 to-cyan-500",
    accent: "from-blue-500/15 to-cyan-500/10",
    borderAccent: "group-hover:border-blue-500/30",
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>),
    label: "Interview Aspirants",
    desc: "MAANG-level interviews test deep understanding, not surface-level familiarity. Our platform ensures every pattern you've practiced is locked in your long-term memory. Walk into any coding round with unshakeable confidence.",
    tag: "Career",
    tagColor: "from-emerald-500 to-green-500",
    accent: "from-emerald-500/15 to-green-500/10",
    borderAccent: "group-hover:border-emerald-500/30",
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>),
    label: "College Students",
    desc: "Placement season sneaks up fast. Start building DSA muscle now — 20 minutes of daily revision beats 20 hours of last-minute panic.",
    tag: "Students",
    tagColor: "from-violet-500 to-purple-500",
    accent: "from-violet-500/15 to-purple-500/10",
    borderAccent: "group-hover:border-violet-500/30",
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>),
    label: "Placement Aspirants",
    desc: "Your dream company visits campus once. Be the candidate who remembers every DP state transition, every graph traversal trick, every sliding window pattern. We'll make sure you're ready when it counts.",
    tag: "High Stakes",
    tagColor: "from-rose-500 to-pink-500",
    accent: "from-rose-500/15 to-pink-500/10",
    borderAccent: "group-hover:border-rose-500/30",
  },
  {
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>),
    label: "Working Developers",
    desc: "Stay interview-ready while working full-time. Quick, focused revision sessions that fit into a busy schedule.",
    tag: "Professional",
    tagColor: "from-teal-500 to-cyan-500",
    accent: "from-teal-500/15 to-cyan-500/10",
    borderAccent: "group-hover:border-teal-500/30",
  },
];

function AudienceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.23, 0.86, 0.39, 0.96] }}
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex flex-col gap-4 p-7 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] transition-all duration-500 ${item.borderAccent} overflow-hidden cursor-pointer break-inside-avoid mb-6`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04), transparent, rgba(255,255,255,0.02))" }} />
      <div className="relative z-10">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white bg-gradient-to-r ${item.tagColor}`}>
          {item.tag}
        </span>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <motion.div whileHover={{ scale: 1.15, rotate: 5 }} transition={{ duration: 0.2 }} className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary flex-shrink-0 group-hover:from-primary/35 group-hover:to-primary/10 transition-all duration-300 shadow-md shadow-primary/5">
          {item.icon}
        </motion.div>
        <h3 className="font-bold text-lg text-foreground tracking-tight">{item.label}</h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground relative z-10">{item.desc}</p>
      <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left" />
    </motion.div>
  );
}

export default function TargetAudience() {
  const col1 = [audiences[0], audiences[3]];
  const col2 = [audiences[1], audiences[4]];
  const col3 = [audiences[2], audiences[5]];

  return (
    <section id="target-audience" className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.60 0.18 50) 0%, transparent 70%)", filter: "blur(110px)" }} />
        <motion.div animate={{ y: [0, -25, 0], opacity: [0.04, 0.07, 0.04] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute -bottom-20 -left-32 w-[550px] h-[550px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.55 0.15 270) 0%, transparent 70%)", filter: "blur(110px)" }} />
      </div>

      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute top-40 right-20 w-3 h-3 rounded-full border border-primary/20" />
      <motion.div animate={{ y: [0, 15, 0], rotate: [0, -90, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute bottom-40 left-16 w-4 h-4 rounded-sm border border-primary/15 rotate-45" />
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="pointer-events-none absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/10" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-primary" />
              Built For You
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Whether you&apos;re grinding{" "}
            <motion.span initial={{ backgroundPosition: "100% center" }} animate={{ backgroundPosition: "0% center" }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} className="bg-gradient-to-r from-cyan-400 via-primary to-violet-400 bg-clip-text text-transparent bg-[length:200%_auto]">
              or growing
            </motion.span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From first-year students to seasoned developers, TRYAGAINLATER adapts to your pace. Find where you fit in.
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-6 items-start">
          <div className="flex flex-col">{col1.map((item) => (<AudienceCard key={item.label} item={item} index={audiences.indexOf(item)} />))}</div>
          <div className="flex flex-col pt-12">{col2.map((item) => (<AudienceCard key={item.label} item={item} index={audiences.indexOf(item)} />))}</div>
          <div className="flex flex-col pt-4">{col3.map((item) => (<AudienceCard key={item.label} item={item} index={audiences.indexOf(item)} />))}</div>
        </div>

        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6 items-start">
          <div className="flex flex-col">{[audiences[0], audiences[2], audiences[4]].map((item) => (<AudienceCard key={item.label} item={item} index={audiences.indexOf(item)} />))}</div>
          <div className="flex flex-col pt-8">{[audiences[1], audiences[3], audiences[5]].map((item) => (<AudienceCard key={item.label} item={item} index={audiences.indexOf(item)} />))}</div>
        </div>

        <div className="flex flex-col sm:hidden">
          {audiences.map((item, i) => (<AudienceCard key={item.label} item={item} index={i} />))}
        </div>
      </div>
    </section>
  );
}
