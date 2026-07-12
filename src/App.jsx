import React, { useState } from 'react';
import { Leaf, Droplets, Sun, Home, CheckCircle2, ArrowRight, Sprout, ShieldCheck, Loader2 } from 'lucide-react';

const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/9v1pwmdj1isn7ee43lv4aac5a5k2n1s7';

export default function App() {
  // State definitions (all present and correctly typed)
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(""); // Add error feedback

  // Handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError("");
  };

  // Handler for form submission with error notifications
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple frontend validation safeguard
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setSubmitSuccess(false);
      setSubmitError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setFormData({ name: '', email: '', message: '' });
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

  // --- Main return ---
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center block group" aria-label="San Juanillo Properties Home">
            <img 
              src="/assets/LOGO.svg" 
              alt="San Juanillo Properties Logo" 
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-600">
            <a href="#expertise" className="hover:text-emerald-700 transition">Our Expertise</a>
            <a href="#philosophy" className="hover:text-emerald-700 transition">Philosophy</a>
            <a href="#projects" className="hover:text-emerald-700 transition">Case Studies</a>
            <a href="#invest" className="hover:text-emerald-700 transition">Investment</a>
          </div>
          <a
            href="#contact"
            className="bg-stone-900 text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
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
            <h1 className="text-5xl lg:text-7xl font-serif text-stone-900 leading-[1.1] mb-6">
              Build from the earth<br className="hidden md:block" />
              <span className="text-amber-500 italic">Design for comfort.</span>
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
          {/* Premium Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 h-[500px] lg:h-[650px] w-full">
            {/* Main Feature Image */}
            <div className="md:col-span-8 h-full rounded-[2rem] overflow-hidden shadow-2xl relative group">
              <img 
                src="/assets/WhatsApp Image 2026-06-24 at 21.46.05 (2).jpeg" 
                alt="Off-grid luxury pool overlooking the jungle" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full border border-white/20">
                The Sanctuary
              </div>
            </div>
            {/* Side Stacked Images */}
            <div className="md:col-span-4 flex flex-col gap-4 lg:gap-6 h-full hidden md:flex">
              {/* Top Side Image */}
              <div className="flex-1 rounded-[2rem] overflow-hidden shadow-lg relative group">
                <img 
                  src="/assets/בית2.jpeg" 
                  alt="Custom wooden interior finish" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md text-white text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20">
                  Turn-Key Finish
                </div>
              </div>
              {/* Bottom Side Image */}
              <div className="flex-1 rounded-[2rem] overflow-hidden shadow-lg relative group">
                <img 
                  src="/assets/WhatsApp Image 2026-06-24 at 21.46.02 (2).jpeg" 
                  alt="Aerial view of the eco-estate" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md text-white text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20">
                  Master Planning
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Philosophy & Experience Section */}
      <section id="philosophy" className="py-24 bg-stone-900 text-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="z-10">
              <h2 className="text-sm font-bold tracking-widest uppercase text-amber-400 mb-4">22 Years of Mastery</h2>
              <h3 className="text-4xl lg:text-5xl font-serif leading-tight mb-6">
                A turn-key approach to holistic development.
              </h3>
              <p className="text-stone-400 text-lg leading-relaxed mb-6">
                With a full-process escort for buyers and investors, we provide ultimate peace of mind. Our 22 years of experience means we handle everything: finding and tailoring the right property, designing and accommodating the terrain for construction, and managing all permits.
              </p>
              <p className="text-stone-400 text-lg leading-relaxed">
                From the foundation and landscape architecture to the purchase of custom furniture and electrodomestics—we deliver a fresh, flowing space ready for you to step into, utilizing holistic methods like Feng Shui.
              </p>
            </div>
            {/* Right Column: The Interactive Process Wheel */}
            <div className="relative flex justify-center items-center min-h-[500px] lg:min-h-[600px]">
              {/* Mobile View: Simple Grid (Hidden on Desktop) */}
              <div className="lg:hidden flex flex-col gap-4 w-full">
                {[
                  { id: 1, title: "Land & Water", desc: "Offering development services as finding water, locating water sources, managing well perforations, and handling complex land registration." },
                  { id: 2, title: "Legal & Permits", desc: "Navigating local regulations seamlessly. We manage all zoning, environmental approvals, and building permits for full legal compliance." },
                  { id: 3, title: "Eco-Construction", desc: "General contractor. Designing and constructing sustainable, off-grid homes, pools, solar grids, and modern infrastructure." },
                  { id: 4, title: "Interior & Feng Shui", desc: "Crafting custom wood/metal furniture and applying Feng Shui flow to deliver a fully finished, turn-key space ready to live in." }
                ].map((step) => (
                  <div key={step.id} className="bg-stone-800/40 border border-stone-700/50 p-6 rounded-2xl">
                    <div className="text-emerald-400 font-mono text-sm mb-2">{`Step 0${step.id}`}</div>
                    <h4 className="text-xl font-serif text-white mb-2">{step.title}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{step.desc}</p>
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
                      {activeStep === 1 && "Offering development services as finding water, locating water sources, managing well perforations, and handling complex land registration."}
                      {activeStep === 2 && "Navigating local regulations seamlessly. We manage all zoning, environmental approvals, and building permits for full legal compliance."}
                      {activeStep === 3 && "General contractor. Designing and constructing sustainable, off-grid homes, pools, solar grids, and modern infrastructure."}
                      {activeStep === 4 && "Crafting custom wood/metal furniture and applying Feng Shui flow to deliver a fully finished, turn-key space ready to live in."}
                    </p>
                  </div>
                </div>
                {/* Node 1: Top */}
                <div 
                  onMouseEnter={() => setActiveStep(1)}
                  onFocus={() => setActiveStep(1)}
                  tabIndex={0}
                  role="button"
                  aria-label="Step 1: Land & Water"
                  className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 outline-none focus:ring-2 focus:ring-amber-500 ${activeStep === 1 ? 'bg-amber-500 border-4 border-stone-900 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'bg-stone-800 border-2 border-stone-600 hover:border-emerald-500'}`}
                >
                  <span className={`font-mono text-lg ${activeStep === 1 ? 'text-white' : 'text-stone-400'}`}>1</span>
                </div>
                {/* Node 2: Right */}
                <div 
                  onMouseEnter={() => setActiveStep(2)}
                  onFocus={() => setActiveStep(2)}
                  tabIndex={0}
                  role="button"
                  aria-label="Step 2: Legal & Permits"
                  className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 outline-none focus:ring-2 focus:ring-amber-500 ${activeStep === 2 ? 'bg-amber-500 border-4 border-stone-900 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'bg-stone-800 border-2 border-stone-600 hover:border-emerald-500'}`}
                >
                  <span className={`font-mono text-lg ${activeStep === 2 ? 'text-white' : 'text-stone-400'}`}>2</span>
                </div>
                {/* Node 3: Bottom */}
                <div 
                  onMouseEnter={() => setActiveStep(3)}
                  onFocus={() => setActiveStep(3)}
                  tabIndex={0}
                  role="button"
                  aria-label="Step 3: Eco-Construction"
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 outline-none focus:ring-2 focus:ring-amber-500 ${activeStep === 3 ? 'bg-amber-500 border-4 border-stone-900 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'bg-stone-800 border-2 border-stone-600 hover:border-emerald-500'}`}
                >
                  <span className={`font-mono text-lg ${activeStep === 3 ? 'text-white' : 'text-stone-400'}`}>3</span>
                </div>
                {/* Node 4: Left */}
                <div 
                  onMouseEnter={() => setActiveStep(4)}
                  onFocus={() => setActiveStep(4)}
                  tabIndex={0}
                  role="button"
                  aria-label="Step 4: Interior & Feng Shui"
                  className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 outline-none focus:ring-2 focus:ring-amber-500 ${activeStep === 4 ? 'bg-amber-500 border-4 border-stone-900 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'bg-stone-800 border-2 border-stone-600 hover:border-emerald-500'}`}
                >
                  <span className={`font-mono text-lg ${activeStep === 4 ? 'text-white' : 'text-stone-400'}`}>4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Expertise Section */}
      <section id="expertise" className="py-32 bg-stone-50 relative overflow-hidden">
        {/* Subtle background decoration for depth */}
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
          
          {/* Pyramid Grid Container with Fixed Absolute Connector Path */}
          <div className="relative grid md:grid-cols-3 gap-8 items-start">
            
            {/* Elegant Geometric Dashed Triangle - Fixed Height Container to Prevent Warping */}
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
            
            {/* Card 1 - Land & Water */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-stone-200/80 hover:bg-white hover:border-stone-300 transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/40 hover:-translate-y-1.5 md:mt-16 text-center z-10">
              {/* Icon Wrapper - Solid bg ensures it neatly masks the line behind it */}
              <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-8 mx-auto transition-all duration-500 border border-sky-100/70 group-hover:bg-sky-100 group-hover:text-sky-700 relative z-10 shadow-sm bg-white">
                <Droplets size={26} className="group-hover:scale-110 transition-transform duration-500 stroke-[1.5]" />
              </div>
              <h4 className="text-2xl font-serif text-stone-900 mb-4">Land & Water Infrastructure</h4>
              <p className="text-stone-500 leading-relaxed text-sm lg:text-base group-hover:text-stone-600 transition-colors duration-500">
                Acting as your property broker. Finding water, managing well perforations, and navigating complex permits and registration processes seamlessly.
              </p>
            </div>
            
            {/* Card 2 - Solar (The Elevated Peak) */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-stone-200/80 hover:bg-white hover:border-stone-300 transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/40 hover:-translate-y-1.5 md:mt-0 text-center z-10">
              {/* Icon Wrapper */}
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-8 mx-auto transition-all duration-500 border border-amber-100/70 group-hover:bg-amber-100 group-hover:text-amber-600 relative z-10 shadow-sm bg-white">
                <Sun size={26} className="group-hover:scale-110 transition-transform duration-500 stroke-[1.5]" />
              </div>
              <h4 className="text-2xl font-serif text-stone-900 mb-4">Off-Grid & Solar Systems</h4>
              <p className="text-stone-500 leading-relaxed text-sm lg:text-base group-hover:text-stone-600 transition-colors duration-500">
                Design and installment of solar pumps for water systems and underground electricity, creating fully independent, sustainable properties.
              </p>
            </div>
            
            {/* Card 3 - Build & Furnish */}
            <div className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-stone-200/80 hover:bg-white hover:border-stone-300 transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/40 hover:-translate-y-1.5 md:mt-16 text-center z-10">
              {/* Icon Wrapper */}
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
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> Over 1,000 fruit & hardwood trees planted</li>
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
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> Over 700 fruit & hardwood trees planted for biodiversity</li>
                <li className="flex items-center gap-3 text-stone-700"><CheckCircle2 size={20} className="text-emerald-600 shrink-0" /> 52 hectares currently held as a strictly private nature reserve</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Investment Packages Section */}
      <section id="invest" className="py-24 bg-[#111513] text-stone-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-stone-800/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center mb-4"><Sprout size={32} className="text-amber-400" /></div>
            <div className="text-amber-400 font-bold tracking-widest text-sm mb-3 uppercase">Connecting The Roots</div>
            <h2 className="text-4xl lg:text-5xl font-serif text-white mb-6">Invest in a Vision. Restore the Earth.</h2>
            <p className="text-stone-400 text-lg">
              Located in Costa Rica's Guanacaste region—one of the world's five Blue Zones. Secure your piece of paradise while actively contributing to biodiversity, nature restoration, and community empowerment.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* The 1 Hectare Package */}
            <div className="bg-stone-900/40 backdrop-blur-sm border border-stone-800/80 p-10 rounded-[2.5rem] hover:bg-stone-900/60 transition duration-300 flex flex-col">
              <h3 className="text-3xl font-serif text-stone-100 mb-2">The Private Hectare</h3>
              <div className="text-amber-400/90 text-4xl font-bold mb-6">$275,000 <span className="text-lg font-normal text-stone-400">/ plot</span></div>
              <p className="text-stone-400 mb-8 leading-relaxed">
                Secure your own hectare of land on the CTR polygon project. Your investment directly funds sustainable infrastructure and immediate nature restoration.
              </p>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <ShieldCheck size={24} className="text-emerald-500/80 shrink-0" />
                  <span className="text-stone-400"><strong>$50K contribution</strong> to rewild your plot and surrounding land.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={24} className="text-emerald-500/80 shrink-0" />
                  <span className="text-stone-400"><strong>$25K covers essential services</strong> (sustainable water & solar energy supply).</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={24} className="text-emerald-500/80 shrink-0" />
                  <span className="text-stone-400">Development strictly limited to 1 main house and 1 guest house to protect the ecosystem.</span>
                </li>
              </ul>
            </div>
            {/* Collective Ownership */}
            <div className="bg-stone-900/40 backdrop-blur-sm border border-stone-800/80 p-10 rounded-[2.5rem] relative overflow-hidden flex flex-col hover:bg-stone-900/60 transition duration-300">
              <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-wider px-3 py-1 rounded-full border border-amber-500/20 uppercase">
                Most Popular
              </div>
              <h3 className="text-3xl font-serif text-stone-100 mb-2">Collective Ownership</h3>
              <div className="text-amber-400/90 text-4xl font-bold mb-6">10 Hectares <span className="text-lg font-normal text-stone-400">shared estate</span></div>
              <p className="text-stone-400 mb-8 leading-relaxed">
                A 10-hectare plot sold to a collective of 1-4 owners ($275k per owner). The ultimate balance of private luxury living and massive ecological impact.
              </p>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <ShieldCheck size={24} className="text-emerald-500/80 shrink-0" />
                  <span className="text-stone-400"><strong>4 Hectares</strong> designated for sustainable residential development.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={24} className="text-emerald-500/80 shrink-0" />
                  <span className="text-stone-400"><strong>6 Hectares</strong> jointly owned and maintained as a strictly protected private nature reserve.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={24} className="text-emerald-500/80 shrink-0" />
                  <span className="text-stone-400">Includes shared greenhouse, dedicated gardener, and ongoing property management.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck size={24} className="text-emerald-500/80 shrink-0" />
                  <span className="text-stone-400">Full assistance with permanent residency in Costa Rica.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-amber-50 via-amber-100/60 to-amber-50 text-stone-900 border-t border-amber-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf size={48} className="mx-auto text-amber-500 mb-8" />
          <h2 className="text-4xl lg:text-5xl font-serif mb-6 text-stone-900">Ready to realize your vision?</h2>
          <p className="text-xl text-stone-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            From discovering the perfect terrain to stepping into your fully furnished sanctuary. Let's create something sustainable and extraordinary.<br/><br/>
            <span className="text-amber-900 font-medium text-xl bg-amber-200/70 px-6 py-3 rounded-full border border-amber-300 inline-block mt-4">
              sanjuanilloproperties@gmail.com
            </span>
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4" autoComplete="off" noValidate>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              disabled={isSubmitting}
              autoComplete="off"
              className="w-full px-5 py-4 rounded-xl bg-white/90 border border-amber-300/70 text-stone-900 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition disabled:opacity-60"
              aria-label="Your Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              disabled={isSubmitting}
              autoComplete="off"
              className="w-full px-5 py-4 rounded-xl bg-white/90 border border-amber-300/70 text-stone-900 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition disabled:opacity-60"
              aria-label="Email Address"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project or vision..."
              rows={4}
              required
              disabled={isSubmitting}
              autoComplete="off"
              className="w-full px-5 py-4 rounded-xl bg-white/90 border border-amber-300/70 text-stone-900 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition disabled:opacity-60"
              aria-label="Message"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 text-stone-900 font-bold px-5 py-4 rounded-xl hover:bg-amber-400 transition shadow-lg shadow-amber-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Inquiry'
              )}
            </button>
          </form>
          {submitError && (
            <div className="max-w-md mx-auto mt-6 p-4 rounded-xl bg-red-100 border border-red-300 text-red-800 shadow">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#DC2626" strokeWidth="2"/><path stroke="#DC2626" strokeWidth="2" d="M10 5v5"/><circle cx="10" cy="14.25" r="1" fill="#DC2626"/></svg>
                <span>{submitError}</span>
              </div>
            </div>
          )}
          {submitSuccess && (
            <div className="max-w-md mx-auto mt-6 p-6 rounded-2xl bg-white/80 border border-amber-400/50 shadow-lg shadow-amber-500/15 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center ring-4 ring-amber-400/25">
                  <CheckCircle2 size={32} className="text-amber-600" />
                </div>
                <h3 className="text-xl font-serif text-stone-900">Message Sent Successfully</h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  Thank you for reaching out. We've received your inquiry and will get back to you shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-stone-950 text-stone-500 py-8 text-center text-sm border-t border-stone-900">
        <p>&copy; {new Date().getFullYear()} San Juanillo Properties by Hen Azenkot. All rights reserved.</p>
      </footer>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/50688889525"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/20 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}