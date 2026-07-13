import React, { useState, useRef } from "react";
import {
  Droplets,
  Sun,
  Home,
  CheckCircle2,
  ArrowRight,
  Sprout,
  Loader2,
} from "lucide-react";

// NOTE: Remove unused ShieldCheck and Leaf imports (already done)
const MAKE_WEBHOOK_URL =
  "https://hook.eu1.make.com/9v1pwmdj1isn7ee43lv4aac5a5k2n1s7";

// --- Fixes for Carousel: Use refs to avoid getElementById bugs, prevent overscroll, accessible navigation ---

export default function App() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(""); // For error feedback

  // Fix: Use ref for carousel
  const carouselRef = useRef(null);

  // Helper for precise carousel scroll, avoids overshooting boundaries
  function scrollCarousel(offset) {
    const el = carouselRef.current;
    if (!el) return;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;
    let nextLeft = el.scrollLeft + offset;
    if (nextLeft < 0) nextLeft = 0;
    if (nextLeft > scrollWidth - clientWidth)
      nextLeft = scrollWidth - clientWidth;
    el.scrollTo({ left: nextLeft, behavior: "smooth" });
  }

  //--- Form logic: enhanced validation, proper event handling, bug fixes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset the success/error state only if needed
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError("");
  };

  function validateEmail(email) {
    // Accepts most well-formed emails (not strict RFC, but prevents most typos)
    // Must not have whitespace, must have @, and at least a dot after @
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Enhanced form handler fixes: Async, multi-submit guard, race cond. avoidance, validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submit

    // Re-trim all fields just in case
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedData.name || !trimmedData.email || !trimmedData.message) {
      // Only update error if not already there (prevents flicker)
      if (!submitError)
        setSubmitError("Please fill in all fields.");
      setSubmitSuccess(false);
      return;
    }

    if (!validateEmail(trimmedData.email)) {
      setSubmitError("Please enter a valid email address.");
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedData),
      });

      // Make returns ok:true even on many errors: require status check!
      if (!response.ok) {
        let reason = "";
        try {
          const resp = await response.json();
          reason = resp && (resp.error || resp.message);
        } catch {
          // fallback: empty
        }
        throw new Error(
          reason || "Submission failed. (Invalid server response.)"
        );
      }

      setFormData({ name: "", email: "", message: "" });
      setSubmitSuccess(true);
      setSubmitError("");
    } catch (err) {
      setSubmitError(
        "There was an error sending your message. Please try again or contact us directly."
      );
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center block group"
            aria-label="San Juanillo Properties Home"
          >
            <img
              src="/assets/LOGO.svg"
              alt="San Juanillo Properties Logo"
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-600">
            <a
              href="#expertise"
              className="hover:text-emerald-700 transition"
            >
              Our Expertise
            </a>
            <a
              href="#philosophy"
              className="hover:text-emerald-700 transition"
            >
              Philosophy
            </a>
            <a
              href="#projects"
              className="hover:text-emerald-700 transition"
            >
              Case Studies
            </a>
            <a
              href="#invest"
              className="hover:text-emerald-700 transition"
            >
              Investment
            </a>
          </div>
          <a
            href="#contact"
            className="bg-stone-900 text-white px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition whitespace-nowrap"
          >
            Start Your Vision
          </a>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Text Area */}
          <div className="max-w-3xl mb-12 lg:mb-16">
            <h1 className="text-[2.4rem] sm:text-5xl lg:text-7xl font-serif text-stone-900 leading-[1.15] mb-6 tracking-tight">
              Where wild Land <br />
              <span className="bg-gradient-to-r from-stone-900 to-amber-500 bg-clip-text text-transparent inline-block">
                becomes
              </span>{" "}
              <span className="text-amber-500 italic">Sustainable Luxury.</span>
            </h1>
            <p className="text-lg lg:text-xl text-stone-600 mb-10 leading-relaxed max-w-2xl">
              Holistic property development and conscious living. We guide buyers and investors from finding the perfect terrain to the final piece of furniture, all in harmony with nature.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-emerald-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 ease-in-out hover:bg-amber-500 hover:text-stone-950 hover:shadow-lg hover:shadow-amber-500/20 flex items-center gap-2">
                Explore Projects <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Complete 21-Image Luxury Gallery (3 Featured + 18 Dynamic) */}
          <div className="relative h-[500px] lg:h-[650px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group/carousel">

            {/* Scroll Track Container */}
            <div
              id="hero-carousel"
              ref={carouselRef}
              className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              tabIndex={0}
              aria-label="Project image gallery carousel"
            >
              {/* --- 1. FIRST IMAGE: THE SANCTUARY --- */}
              <div className="w-full h-full shrink-0 snap-start relative group">
                <img
                  src="/assets/WhatsApp Image 2026-06-24 at 21.46.05 (2).jpeg"
                  alt="The Sanctuary - Off-grid luxury pool overlooking the jungle"
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-4 md:bottom-8 md:left-8 bg-white/10 backdrop-blur-md text-white text-xs md:text-sm tracking-widest uppercase px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/20">
                  The Sanctuary
                </div>
              </div>

              {/* --- 2. SECOND IMAGE: TURN-KEY FINISH --- */}
              <div className="w-full h-full shrink-0 snap-start relative group">
                <img
                  src="/assets/בית2.jpeg"
                  alt="Custom wooden interior finish"
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-4 md:bottom-8 md:left-8 bg-white/10 backdrop-blur-md text-white text-xs md:text-sm tracking-widest uppercase px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/20">
                  Turn-Key Finish
                </div>
              </div>

              {/* --- 3. THIRD IMAGE: MASTER PLANNING --- */}
              <div className="w-full h-full shrink-0 snap-start relative group">
                <img
                  src="/assets/WhatsApp Image 2026-06-24 at 21.46.02 (2).jpeg"
                  alt="Aerial view of the eco-estate"
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-4 md:bottom-8 md:left-8 bg-white/10 backdrop-blur-md text-white text-xs md:text-sm tracking-widest uppercase px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/20">
                  Master Planning
                </div>
              </div>

              {/* --- 4 TO 21. DYNAMIC IMAGES (The 18 new ones) --- */}
              {[...Array(18)].map((_, index) => {
                const imageNumber = index + 1;
                return (
                  <div key={`gallery-${imageNumber}`} className="w-full h-full shrink-0 snap-start relative group">
                    <img
                      src={`/assets/HERO/jpeg.${imageNumber}.jpeg`}
                      alt={`San Juanillo Property Estate View ${imageNumber}`}
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent"></div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Swipe Indicator (remains unchanged) */}
            <div className="md:hidden absolute top-6 right-6 bg-stone-900/40 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase px-3 py-2 rounded-full border border-white/20 z-20 flex items-center gap-1.5 shadow-lg pointer-events-none">
              <span>Swipe to explore</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Desktop arrow nav: FIX use scrollCarousel helper to not overshoot; fix a11y: add aria-controls */}
            <button
              onClick={() => {
                const el = carouselRef.current;
                if (el) scrollCarousel(-el.offsetWidth);
              }}
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-stone-900/20 backdrop-blur-md border border-white/10 text-white items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-white hover:text-stone-900 transition-all duration-300 z-20 shadow-lg"
              aria-label="Previous slide"
              aria-controls="hero-carousel"
              tabIndex={0}
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => {
                const el = carouselRef.current;
                if (el) scrollCarousel(el.offsetWidth);
              }}
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-stone-900/20 backdrop-blur-md border border-white/10 text-white items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-white hover:text-stone-900 transition-all duration-300 z-20 shadow-lg"
              aria-label="Next slide"
              aria-controls="hero-carousel"
              tabIndex={0}
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      {/* Philosophy & Experience Section */}
      <section
        id="philosophy"
        className="py-24 bg-stone-900 text-stone-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="z-10">
              <h2 className="text-sm font-bold tracking-widest uppercase text-amber-400 mb-4">
                22 Years of Mastery
              </h2>
              <h3 className="text-4xl lg:text-5xl font-serif leading-tight mb-6">
                A turn-key approach to holistic development.
              </h3>
              <p className="text-stone-400 text-lg leading-relaxed mb-6">
                With a full-process escort for buyers and investors, we provide
                ultimate peace of mind. Our 22 years of experience means we
                handle everything: finding and tailoring the right property,
                designing and accommodating the terrain for construction, and
                managing all permits.
              </p>
              <p className="text-stone-400 text-lg leading-relaxed">
                From the foundation and landscape architecture to the purchase
                of custom furniture and electrodomestics—we deliver a fresh,
                flowing space ready for you to step into, utilizing holistic
                methods like Feng Shui.
              </p>
            </div>
            {/* Right Column: The Interactive Process Wheel */}
            <div className="relative flex justify-center items-center min-h-[500px] lg:min-h-[600px]">
              {/* Mobile View: Simple Grid (Hidden on Desktop) */}
              <div className="lg:hidden flex flex-col gap-4 w-full">
                {[
                  {
                    id: 1,
                    title: "Land & Water",
                    desc: "Offering development services as finding water, locating water sources, managing well perforations, and handling complex land registration.",
                  },
                  {
                    id: 2,
                    title: "Legal & Permits",
                    desc: "Navigating local regulations seamlessly. We manage all zoning, environmental approvals, and building permits for full legal compliance.",
                  },
                  {
                    id: 3,
                    title: "Eco-Construction",
                    desc: "General contractor. Designing and constructing sustainable, off-grid homes, pools, solar grids, and modern infrastructure.",
                  },
                  {
                    id: 4,
                    title: "Interior & Feng Shui",
                    desc: "Crafting custom wood/metal furniture and applying Feng Shui flow to deliver a fully finished, turn-key space ready to live in.",
                  },
                ].map((step) => (
                  <div
                    key={step.id}
                    className="bg-stone-800/40 border border-stone-700/50 p-6 rounded-2xl"
                  >
                    <div className="text-emerald-400 font-mono text-sm mb-2">{`Step 0${step.id}`}</div>
                    <h4 className="text-xl font-serif text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
              {/* Desktop View: Interactive Wheel (Hidden on Mobile) */}
              <div className="hidden lg:flex relative w-[500px] h-[500px] items-center justify-center">
                {/* The Outer Dashed Ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-stone-700 animate-[spin_60s_linear_infinite] pointer-events-none"></div>
                {/* The Static Inner Ring for visual depth */}
                <div className="absolute inset-10 rounded-full border border-stone-800/50 pointer-events-none"></div>
                {/* The Dynamic Center Content */}
                <div className="absolute inset-16 bg-stone-900 rounded-full border border-stone-800 shadow-[0_0_50px_rgba(16,185,129,0.05)] flex flex-col items-center justify-center p-12 text-center transition-all duration-500 z-0">
                  <span className="text-amber-500/15 text-8xl font-serif absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                    {activeStep}
                  </span>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-serif text-white mb-4 transition-all duration-300">
                      {activeStep === 1 && "Land & Water"}
                      {activeStep === 2 && "Legal & Permits"}
                      {activeStep === 3 && "Eco-Construction"}
                      {activeStep === 4 && "Interior & Feng Shui"}
                    </h4>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      {activeStep === 1 &&
                        "Offering development services as finding water, locating water sources, managing well perforations, and handling complex land registration."}
                      {activeStep === 2 &&
                        "Navigating local regulations seamlessly. We manage all zoning, environmental approvals, and building permits for full legal compliance."}
                      {activeStep === 3 &&
                        "General contractor. Designing and constructing sustainable, off-grid homes, pools, solar grids, and modern infrastructure."}
                      {activeStep === 4 &&
                        "Crafting custom wood/metal furniture and applying Feng Shui flow to deliver a fully finished, turn-key space ready to live in."}
                    </p>
                  </div>
                </div>
                {/* Nodes: Make all click and keyboard accessible */}
                {/* Node 1: Top */}
                <div
                  onMouseEnter={() => setActiveStep(1)}
                  onFocus={() => setActiveStep(1)}
                  onClick={() => setActiveStep(1)}
                  tabIndex={0}
                  role="button"
                  aria-label="Step 1: Land & Water"
                  className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 outline-none focus:ring-2 focus:ring-amber-500 ${
                    activeStep === 1
                      ? "bg-amber-500 border-4 border-stone-900 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                      : "bg-stone-800 border-2 border-stone-600 hover:border-emerald-500"
                  }`}
                >
                  <span
                    className={`font-mono text-lg ${
                      activeStep === 1 ? "text-white" : "text-stone-400"
                    }`}
                  >
                    1
                  </span>
                </div>
                {/* Node 2: Right */}
                <div
                  onMouseEnter={() => setActiveStep(2)}
                  onFocus={() => setActiveStep(2)}
                  onClick={() => setActiveStep(2)}
                  tabIndex={0}
                  role="button"
                  aria-label="Step 2: Legal & Permits"
                  className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 outline-none focus:ring-2 focus:ring-amber-500 ${
                    activeStep === 2
                      ? "bg-amber-500 border-4 border-stone-900 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                      : "bg-stone-800 border-2 border-stone-600 hover:border-emerald-500"
                  }`}
                >
                  <span
                    className={`font-mono text-lg ${
                      activeStep === 2 ? "text-white" : "text-stone-400"
                    }`}
                  >
                    2
                  </span>
                </div>
                {/* Node 3: Bottom */}
                <div
                  onMouseEnter={() => setActiveStep(3)}
                  onFocus={() => setActiveStep(3)}
                  onClick={() => setActiveStep(3)}
                  tabIndex={0}
                  role="button"
                  aria-label="Step 3: Eco-Construction"
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 outline-none focus:ring-2 focus:ring-amber-500 ${
                    activeStep === 3
                      ? "bg-amber-500 border-4 border-stone-900 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                      : "bg-stone-800 border-2 border-stone-600 hover:border-emerald-500"
                  }`}
                >
                  <span
                    className={`font-mono text-lg ${
                      activeStep === 3 ? "text-white" : "text-stone-400"
                    }`}
                  >
                    3
                  </span>
                </div>
                {/* Node 4: Left */}
                <div
                  onMouseEnter={() => setActiveStep(4)}
                  onFocus={() => setActiveStep(4)}
                  onClick={() => setActiveStep(4)}
                  tabIndex={0}
                  role="button"
                  aria-label="Step 4: Interior & Feng Shui"
                  className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 outline-none focus:ring-2 focus:ring-amber-500 ${
                    activeStep === 4
                      ? "bg-amber-500 border-4 border-stone-900 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                      : "bg-stone-800 border-2 border-stone-600 hover:border-emerald-500"
                  }`}
                >
                  <span
                    className={`font-mono text-lg ${
                      activeStep === 4 ? "text-white" : "text-stone-400"
                    }`}
                  >
                    4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- Rest of content unchanged (defensive copy from original) --- */}
      {/* Expertise Section */}
      <section id="expertise" className="py-32 bg-stone-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-900/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-700 mb-4">Our Expertise</h2>
            <h3 className="text-4xl lg:text-5xl font-serif text-stone-900 mb-6">End-to-End Solutions</h3>
            <div className="w-16 h-px bg-emerald-700/30 mx-auto mb-6"></div>
            <p className="text-stone-600 text-lg leading-relaxed">
              Managing the full spectrum of conscious residential development, both on-grid and off-grid.
            </p>
          </div>
          <div className="relative grid md:grid-cols-3 gap-8 items-start">
            <div className="absolute top-0 left-0 w-full h-40 hidden md:block pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 16.66 72 L 50 28 L 83.33 72"
                  fill="none"
                  stroke="#d6d3d1"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                  className="stroke-stone-300"
                />
              </svg>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-stone-200/80 hover:bg-white hover:border-stone-300 transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/40 hover:-translate-y-1.5 md:mt-16 text-center z-10">
              <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-8 mx-auto transition-all duration-500 border border-sky-100/70 group-hover:bg-sky-100 group-hover:text-sky-700 relative z-10 shadow-sm bg-white">
                <Droplets size={26} className="group-hover:scale-110 transition-transform duration-500 stroke-[1.5]" />
              </div>
              <h4 className="text-2xl font-serif text-stone-900 mb-4">Land & Water Infrastructure</h4>
              <p className="text-stone-500 leading-relaxed text-sm lg:text-base group-hover:text-stone-600 transition-colors duration-500">
                Acting as your property broker. Finding water, managing well perforations, and navigating complex permits and registration processes seamlessly.
              </p>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-stone-200/80 hover:bg-white hover:border-stone-300 transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/40 hover:-translate-y-1.5 md:mt-0 text-center z-10">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-8 mx-auto transition-all duration-500 border border-amber-100/70 group-hover:bg-amber-100 group-hover:text-amber-600 relative z-10 shadow-sm bg-white">
                <Sun size={26} className="group-hover:scale-110 transition-transform duration-500 stroke-[1.5]" />
              </div>
              <h4 className="text-2xl font-serif text-stone-900 mb-4">Off-Grid & Solar Systems</h4>
              <p className="text-stone-500 leading-relaxed text-sm lg:text-base group-hover:text-stone-600 transition-colors duration-500">
                Design and installment of solar pumps for water systems and underground electricity, creating fully independent, sustainable properties.
              </p>
            </div>
            <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-stone-200/80 hover:bg-white hover:border-stone-300 transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/40 hover:-translate-y-1.5 md:mt-16 text-center z-10">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 mx-auto transition-all duration-500 border border-emerald-100/70 group-hover:bg-emerald-100 group-hover:text-emerald-700 relative z-10 shadow-sm bg-white">
                <Home size={26} className="group-hover:scale-110 transition-transform duration-500 stroke-[1.5]" />
              </div>
              <h4 className="text-2xl font-serif text-stone-900 mb-4">Design, Build & Furnish</h4>
              <p className="text-stone-500 leading-relaxed text-sm lg:text-base group-hover:text-stone-600 transition-colors duration-500">
                Acting as the general contractor. Designing homes, restaurants, pools, and studios. Crafting custom wood and metal furniture for a Turn-Key finish.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Case Studies Section */}
      <section id="projects" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-stone-900 mb-16 text-center">Featured Projects</h2>
          {/* Project 1 */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row mb-12 shadow-sm border border-stone-200/50">
            <div className="lg:w-1/2">
              <img src="/assets/HOUSE.jpeg" alt="Terrace view with wooden pillars overlooking the lush jungle and ocean" className="w-full h-full object-cover min-h-[400px]" />
            </div>
            <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
              <div className="text-emerald-700 font-bold tracking-wider text-sm mb-2">PRIVATE ECO-ESTATE</div>
              <h3 className="text-3xl font-serif text-stone-900 mb-4">The 5 Hectare Coastal Retreat</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                We designed a 5-hectare off-grid project featuring 4 ocean-view plots. Within just 3 months, we delivered underground electricity and water infrastructure to each plot, ready to build.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> Shared solar water system + individual systems</li>
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> Shared greenhouse for vegetable growing</li>
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> 700 fruit & hardwood trees planted</li>
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> Majority of property kept as private nature reserve</li>
              </ul>
            </div>
          </div>
          {/* Project 2 */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row-reverse shadow-sm border border-stone-200/50">
            <div className="lg:w-1/2">
              <img src="/assets/איגלסנסט.jpeg" alt="Eagle's Nest" className="w-full h-full object-cover min-h-[400px]" />
            </div>
            <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
              <div className="text-emerald-700 font-bold tracking-wider text-sm mb-2">REWILDING & CONSERVATION</div>
              <h3 className="text-3xl font-serif text-stone-900 mb-4">Eagle's Nest & Nature Reserve</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Founder of the Eagle's Nest venue retreat and the "Connecting the Roots" non-profit, dedicating efforts to community improvement and massive ecological restoration.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> 67 hectares of active rewilding project</li>
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> Over 1000 fruit & hardwood trees planted for biodiversity</li>
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> 52 hectares currently held as a strictly private nature reserve</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Investment Packages Section */}
      <section id="invest" className="py-24 bg-[#0E110F] text-stone-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-stone-800/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center mb-4"><Sprout size={32} className="text-amber-400/80" /></div>
            <div className="text-amber-400/80 font-bold tracking-widest text-sm mb-3 uppercase">Connecting The Roots</div>
            <h2 className="text-4xl lg:text-5xl font-serif text-stone-200 mb-6">Invest in a Vision. Restore the Earth.</h2>
            <p className="text-stone-400 text-lg">
              Located in Costa Rica's Guanacaste region—one of the world's five Blue Zones. Secure your piece of paradise while actively contributing to biodiversity, nature restoration, and community empowerment.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            <div className="group relative bg-stone-900/40 backdrop-blur-sm p-10 lg:p-12 rounded-[2.5rem] border border-stone-800/50 hover:border-stone-700/60 transition-all duration-500 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-serif text-stone-200 mb-2">The Private Hectare</h3>
                <div className="text-3xl font-mono text-amber-400/90 font-light mb-6">
                  $275,000 <span className="text-xs text-stone-400 tracking-wider uppercase font-sans ml-1">/ plot</span>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed mb-8">
                  Secure your own hectare of land on the CTR polygon project. Your investment directly funds sustainable infrastructure and immediate nature restoration.
                </p>
              </div>
              <div className="border-t border-stone-800/60 pt-6 space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400/60 block mb-1.5">Capital Allocation</span>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Includes a <span className="text-white font-medium">$50K direct contribution</span> to rewild your specific plot, alongside <span className="text-white font-medium">$25K</span> dedicated to independent off-grid water and solar infrastructure.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-500/60 block mb-1.5">Ecosystem Guardrails</span>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    To guarantee absolute preservation of biodiversity, construction is strictly limited to one main residential estate and one private guest villa.
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative bg-stone-900/40 backdrop-blur-sm p-10 lg:p-12 rounded-[2.5rem] border border-stone-800/50 hover:border-stone-700/60 transition-all duration-500 flex flex-col justify-between">
              <div className="absolute top-5 right-6 bg-amber-400/5 text-amber-400/80 text-[9px] font-bold tracking-widest px-3 py-1 rounded-full border border-amber-400/10 uppercase">
                Most Popular
              </div>
              <div>
                <h3 className="text-3xl font-serif text-stone-200 mb-2">Collective Ownership</h3>
                <div className="text-3xl font-mono text-amber-400/90 font-light mb-6">
                  10 Hectares <span className="text-xs text-stone-400 tracking-wider uppercase font-sans ml-1">/ shared estate</span>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed mb-8">
                  A multi-owner master plot tailored for a private syndicate of 1 to 4 partners ($275k per share). The perfect alignment of high-end estate living and deep environmental impact.
                </p>
              </div>
              <div className="border-t border-stone-800/60 pt-6 space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400/60 block mb-1.5">Estate Distribution</span>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    The land is intelligently divided: <span className="text-white font-medium">4 Hectares</span> are designated for low-impact luxury residential development, while <span className="text-white font-medium">6 Hectares</span> are legally locked as a private nature reserve.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-500/60 block mb-1.5">Bespoke Privileges</span>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Fully managed residency program including a shared organic greenhouse, dedicated master gardener, asset management, and full legal assistance for permanent residency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-b from-amber-50/40 via-stone-50 to-amber-50/30 relative overflow-hidden border-t border-amber-200/50">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-sm font-bold tracking-widest uppercase text-amber-600 block mb-4">Begin Your Journey</span>
                <h2 className="text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
                  Ready to realize your vision?
                </h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-lg">
                From discovering the perfect terrain to stepping into your fully furnished sanctuary. Let's create something sustainable and extraordinary.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=San+Juanillo+Properties+Guanacaste+Costa+Rica"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-amber-200/60 rounded-2xl p-4 shadow-sm shadow-amber-900/5 hover:border-amber-400 hover:shadow-md hover:bg-white transition-all duration-300 group/maps cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center border border-stone-100 shrink-0 group-hover/maps:bg-amber-50 group-hover/maps:border-amber-100 transition-colors duration-300">
                  <svg className="w-5 h-5 text-amber-500 group-hover/maps:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-900 font-mono font-bold text-sm leading-none">5.0</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium tracking-wide block mt-1 group-hover/maps:text-amber-600 transition-colors duration-300">Verified on Google Maps (8 Reviews) →</span>
                </div>
              </a>
              <div className="border-t border-amber-200/40 pt-8 space-y-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-1">Direct Inquiry</span>
                  <a href="mailto:sanjuanilloproperties@gmail.com" className="text-stone-900 font-serif text-lg hover:text-amber-600 transition duration-300">
                    sanjuanilloproperties@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-1">Project Location</span>
                  <span className="text-stone-800 text-sm font-medium">Guanacaste, Costa Rica (GMT-6)</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 bg-white p-10 lg:p-12 rounded-[2.5rem] border border-amber-200/30 shadow-xl shadow-stone-200/40">
              <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off" noValidate>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      placeholder="Your Name"
                      autoComplete="off"
                      aria-label="Your Name"
                      className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:outline-none focus:border-amber-500 transition-colors placeholder-stone-400 text-sm disabled:opacity-60"
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      placeholder="Email Address"
                      autoComplete="off"
                      aria-label="Email Address"
                      className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:outline-none focus:border-amber-500 transition-colors placeholder-stone-400 text-sm disabled:opacity-60"
                    />
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                    placeholder="Tell us about your project or vision..."
                    rows={4}
                    autoComplete="off"
                    aria-label="Message"
                    className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:outline-none focus:border-amber-500 transition-colors placeholder-stone-400 text-sm resize-none disabled:opacity-60"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-stone-900 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-stone-900 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit Vision Portfolio"
                  )}
                </button>
              </form>
              {submitError && (
                <div className="mt-6 p-4 rounded-xl bg-red-100 border border-red-300 text-red-800 shadow">
                  <div className="flex items-center gap-2 text-sm">
                    <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#DC2626" strokeWidth="2"/><path stroke="#DC2626" strokeWidth="2" d="M10 5v5"/><circle cx="10" cy="14.25" r="1" fill="#DC2626"/></svg>
                    <span>{submitError}</span>
                  </div>
                </div>
              )}
              {submitSuccess && (
                <div className="mt-6 p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60 shadow-inner">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
                      <CheckCircle2 size={24} className="text-amber-600" />
                    </div>
                    <h3 className="text-lg font-serif text-stone-900">Message Sent Successfully</h3>
                    <p className="text-stone-600 text-xs leading-relaxed max-w-sm">
                      Thank you for reaching out. We've received your inquiry and will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-stone-950 text-stone-500 py-8 text-center text-sm border-t border-stone-900">
        <p>
          &copy; {new Date().getFullYear()} San Juanillo Properties by Hen
          Azenkot. All rights reserved.
        </p>
      </footer>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/50688889525"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/20 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}