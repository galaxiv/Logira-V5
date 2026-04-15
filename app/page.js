"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LOGO_SRC = "/logo.png";

export default function LogiraLandingPage() {
  const [open, setOpen] = useState(false);
  const [mag, setMag] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const roadmap = [
    {
      title: "Mathematics",
      subtitle: "Open now",
      description:
        "Enter the first country — a world of patterns, logic, and elegant challenges where thinking becomes a natural skill.",
    },
    {
      title: "Physics",
      subtitle: "Coming later",
      description:
        "A future world of motion, forces, and discovery — experienced through interactive challenges and gameplay.",
    },
    {
      title: "Chemistry",
      subtitle: "Coming later",
      description:
        "Explore reactions, structures, and transformations through intuitive, visual problem-solving.",
    },
  ];

  const features = [
    {
      title: "A world, not just exercises",
      text: "Players don’t just solve problems — they move through a living world where each solution unlocks new paths.",
    },
    {
      title: "Tournaments that matter",
      text: "Compete in fast, elegant mathematical tournaments designed around speed, logic, and strategy.",
    },
    {
      title: "Built to expand",
      text: "Logira begins with mathematics — and is designed to grow into a universe of subject-based worlds.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08071f] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(164,150,255,0.38),transparent_22%),radial-gradient(circle_at_50%_35%,rgba(92,72,220,0.22),transparent_40%),linear-gradient(180deg,#100b35_0%,#090722_55%,#070617_100%)]" />

      <header className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-3xl p-[2px] bg-gradient-to-br from-violet-400/40 via-indigo-400/30 to-purple-500/40 shadow-xl shadow-violet-500/30">
            <div className="h-full w-full rounded-3xl bg-[#0c0a2a] flex items-center justify-center">
              <motion.img
                src={LOGO_SRC}
                alt="Logira logo"
                className="h-11 w-11 object-contain"
                animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[0.04em] leading-none">logira</div>
            <div className="text-base md:text-xl lg:text-2xl text-white/72 mt-2">Where thinking feels natural</div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <nav className="hidden md:flex items-center gap-3">
            <a href="#about" className="px-4 py-2 text-sm text-white/75 hover:text-white transition">About Us</a>
            <button className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">
              EN ▾
            </button>
            <button className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm hover:bg-white/10 transition">
              Sign In
            </button>
            <button className="rounded-full border border-violet-300/30 bg-violet-400/10 px-5 py-2.5 text-sm hover:bg-violet-400/20 transition">
              Sign Up
            </button>
          </nav>

          <button className="rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-2 text-sm text-white/78 hover:bg-white/15 transition">
            Interactive Board
          </button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-20 grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-semibold leading-tight">
                A new way to open your mind
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl">
                Logira transforms thinking into a journey. Explore a world where logic becomes intuitive, problems become discoveries, and learning feels like play.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div
                className="relative group"
                ref={dropdownRef}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - (rect.left + rect.width / 2);
                  const y = e.clientY - (rect.top + rect.height / 2);
                  const strength = 0.12;
                  setMag({ x: x * strength, y: y * strength });
                }}
                onMouseLeave={() => setMag({ x: 0, y: 0 })}
              >
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-white/30 blur-xl"
                  animate={{ opacity: [0.14, 0.28, 0.14], scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.button
                  animate={{ x: mag.x, y: mag.y }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpen((prev) => !prev)}
                  className="relative rounded-full bg-white text-[#18113e] px-8 py-4 font-semibold inline-flex items-center gap-3 shadow-xl shadow-white/10"
                >
                  <span>Start your journey</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="text-sm opacity-70 inline-block"
                  >
                    ▾
                  </motion.span>
                </motion.button>

                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition duration-200">
                  <div className="px-3 py-1.5 text-xs rounded-full bg-white/10 border border-white/15 backdrop-blur text-white/70">
                    Choose world
                  </div>
                </div>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-3 w-72 rounded-[1.5rem] border border-white/10 bg-[#0f0c2f]/95 backdrop-blur-xl shadow-2xl shadow-violet-950/40 overflow-hidden z-20"
                    >
                      <div className="p-2">
                        <button
                          onClick={() => setOpen(false)}
                          className="w-full rounded-[1rem] text-left px-4 py-4 hover:bg-white/10 transition flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium text-white">Mathematics</div>
                            <div className="text-sm text-white/55 mt-1">Available now</div>
                          </div>
                          <span className="text-xs text-green-300">active</span>
                        </button>

                        <div className="w-full rounded-[1rem] px-4 py-4 flex justify-between items-center text-white/50 bg-white/[0.02] mt-1">
                          <div>
                            <div className="font-medium">Physics</div>
                            <div className="text-sm text-white/40 mt-1">Coming soon</div>
                          </div>
                          <span className="text-lg">🔒</span>
                        </div>

                        <div className="w-full rounded-[1rem] px-4 py-4 flex justify-between items-center text-white/50 bg-white/[0.02] mt-1">
                          <div>
                            <div className="font-medium">Chemistry</div>
                            <div className="text-sm text-white/40 mt-1">Coming soon</div>
                          </div>
                          <span className="text-lg">🔒</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-semibold">Game World</div>
                <div className="text-sm text-white/60">Country of Mathematics</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-semibold">Tournaments</div>
                <div className="text-sm text-white/60">Compete and progress</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-semibold">Expandable</div>
                <div className="text-sm text-white/60">Future learning worlds</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-white/60">What’s New</div>
              <div className="mt-4 rounded-2xl bg-black/20 border border-white/10 p-5 space-y-4">
                <div>
                  <div className="text-xs text-white/45 uppercase tracking-[0.16em]">Announcement</div>
                  <div className="mt-2 text-xl font-semibold">The Country of Mathematics is now open</div>
                </div>
                <p className="text-white/72 leading-relaxed">
                  Start your first journey with logic-based challenges, discover the world step by step, and prepare for upcoming mathematical tournaments.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-sm text-white/55">Next release</div>
                  <div className="mt-1 text-white/82">Weekly tournament format and new challenge paths</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-sm text-white/60 uppercase">About</div>
              <h2 className="text-3xl md:text-4xl font-semibold mt-3">
                Learning that feels like discovery
              </h2>
            </div>
            <div className="text-white/70 space-y-4 text-lg">
              <p>
                Logira is designed to make thinking intuitive. Instead of memorization, players explore, experiment, and uncover patterns through play.
              </p>
              <p>
                Mathematics is just the beginning — a foundation for a growing universe of knowledge built around curiosity and exploration.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-lg font-semibold">{feature.title}</div>
                <p className="mt-3 text-white/65">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex justify-between items-end flex-wrap gap-6">
              <div>
                <div className="text-sm text-white/60 uppercase">Universe</div>
                <h2 className="text-3xl font-semibold mt-3">
                  One platform. Many worlds.
                </h2>
              </div>
              <div className="text-white/60 max-w-xl">
                Start with mathematics — and expand into new domains without changing how users learn and explore.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {roadmap.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex justify-between">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-white/60">{item.subtitle}</div>
                  </div>
                  <p className="mt-3 text-white/65">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
