import React from 'react';
import { Leaf, Droplets, Sun, Home, CheckCircle2, ArrowRight, Sprout, ShieldCheck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Conscious<span className="text-emerald-700">Dev</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-600">
            <a href="#expertise" className="hover:text-emerald-700 transition">Our Expertise</a>
            <a href="#philosophy" className="hover:text-emerald-700 transition">Philosophy</a>
            <a href="#projects" className="hover:text-emerald-700 transition">Case Studies</a>
            <a href="#invest" className="hover:text-emerald-700 transition">Investment</a>
          </div>
          <a href="#contact" className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition">
            Start Your Vision
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-serif text-stone-900 leading-[1.1] mb-6">
              From Raw Land to <br className="hidden md:block" />
              <span className="text-emerald-700 italic">Off-Grid Luxury.</span>
            </h1>
            <p className="text-lg lg:text-xl text-stone-600 mb-10 leading-relaxed max-w-2xl">
              Holistic property development and conscious living. We guide buyers and investors from finding the perfect terrain to the final piece of furniture, all in harmony with nature.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-emerald-800 text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-700 transition flex items-center gap-2">
                Explore Projects <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Placeholder for the circular pool ocean view image */}
        <div className="mt-16 lg:mt-24 w-full h-[50vh] lg:h-[70vh] relative px-4 lg:px-8">
          {/* TO DO in Cursor: Replace src with "/assets/WhatsApp Image 2026-06-24 at 22.17.06.jpeg" or similar */}
          <img 
            src="https://placehold.co/1920x1080/292524/e7e5e4?text=Circular+Pool+%26+Ocean+View+Image" 
            alt="Circular pool overlooking the jungle and ocean" 
            className="w-full h-full object-cover rounded-3xl lg:rounded-[4rem] shadow-2xl"
          />
        </div>
      </section>

      {/* Philosophy & Experience Section */}
      <section id="philosophy" className="py-24 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-400 mb-4">20 Years of Mastery</h2>
              <h3 className="text-4xl lg:text-5xl font-serif leading-tight mb-6">
                A turn-key approach to holistic development.
              </h3>
              <p className="text-stone-400 text-lg leading-relaxed mb-6">
                With a full-process escort for buyers and investors, we provide ultimate peace of mind. Our 20 years of experience means we handle everything: finding and tailoring the right property, designing and accommodating the terrain for construction, and managing all permits.
              </p>
              <p className="text-stone-400 text-lg leading-relaxed">
                From the foundation and landscape architecture to the purchase of custom furniture and electrodomestics—we deliver a fresh, flowing space ready for you to step into, utilizing holistic methods like Feng Shui.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* TO DO in Cursor: Replace with beautiful interior and stone pathway images from your assets */}
              <img src="https://placehold.co/600x800/1c1917/a8a29e?text=Holistic+Interior" alt="Interior design" className="rounded-2xl h-full object-cover" />
              <img src="https://placehold.co/600x800/1c1917/a8a29e?text=Stone+Pathway" alt="Stone pathway" className="rounded-2xl h-full object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif text-stone-900 mb-6">End-to-End Solutions</h2>
            <p className="text-stone-600 text-lg">Managing the full spectrum of conscious residential development, both on-grid and off-grid.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-stone-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                <Droplets size={28} />
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-3">Land & Water Infrastructure</h4>
              <p className="text-stone-600 leading-relaxed">Acting as your property broker. Finding water, managing well perforations, and navigating complex permits and registration processes seamlessly.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-stone-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                <Sun size={28} />
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-3">Off-Grid & Solar Systems</h4>
              <p className="text-stone-600 leading-relaxed">Design and installment of solar pumps for water systems and underground electricity, creating fully independent, sustainable properties.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-stone-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
                <Home size={28} />
              </div>
              <h4 className="text-xl font-bold text-stone-900 mb-3">Design, Build & Furnish</h4>
              <p className="text-stone-600 leading-relaxed">Acting as the general contractor. Designing homes, restaurants, pools, and studios. Crafting custom wood and metal furniture for a Turn-Key finish.</p>
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
               {/* TO DO in Cursor: Replace with Australia project image */}
              <img src="https://placehold.co/1000x800/d6d3d1/57534e?text=Australian+Family+Project" alt="Australian Family Project" className="w-full h-full object-cover min-h-[400px]" />
            </div>
            <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
              <div className="text-emerald-700 font-bold tracking-wider text-sm mb-2">PRIVATE ECO-ESTATE</div>
              <h3 className="text-3xl font-serif text-stone-900 mb-4">The 11 Hectare Coastal Retreat</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                An Australian family acquired 11 hectares. We designed a 5-hectare off-grid project featuring 4 ocean-view plots. Within just 3 months, we delivered underground electricity and water infrastructure to each plot, ready to build.
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
              {/* TO DO in Cursor: Replace with Eagle's Nest nature/metal tree image */}
              <img src="https://placehold.co/1000x800/d6d3d1/57534e?text=Eagle%27s+Nest+Venue" alt="Eagle's Nest" className="w-full h-full object-cover min-h-[400px]" />
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
      <section id="invest" className="py-24 bg-stone-900 text-stone-50 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-stone-800/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center mb-4"><Sprout size={32} className="text-emerald-400" /></div>
            <div className="text-emerald-400 font-bold tracking-widest text-sm mb-3 uppercase">Connecting The Roots</div>
            <h2 className="text-4xl lg:text-5xl font-serif text-white mb-6">Invest in a Vision. Restore the Earth.</h2>
            <p className="text-stone-400 text-lg">
              Located in Costa Rica's Guanacaste region—one of the world's five Blue Zones. Secure your piece of paradise while actively contributing to biodiversity, nature restoration, and community empowerment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* The 1 Hectare Package */}
            <div className="bg-stone-800/40 border border-stone-700 p-10 rounded-[2.5rem] hover:bg-stone-800/60 transition duration-300 flex flex-col">
              <h3 className="text-3xl font-serif mb-2">The Private Hectare</h3>
              <div className="text-emerald-400 text-4xl font-bold mb-6">$275,000 <span className="text-lg font-normal text-stone-400">/ plot</span></div>
              <p className="text-stone-300 mb-8 leading-relaxed">
                Secure your own hectare of land on the CTR polygon project. Your investment directly funds sustainable infrastructure and immediate nature restoration.
              </p>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3"><ShieldCheck size={24} className="text-emerald-500 shrink-0" /> <span className="text-stone-300"><strong>$50K contribution</strong> to rewild your plot and surrounding land.</span></li>
                <li className="flex items-start gap-3"><ShieldCheck size={24} className="text-emerald-500 shrink-0" /> <span className="text-stone-300"><strong>$25K covers essential services</strong> (sustainable water & solar energy supply).</span></li>
                <li className="flex items-start gap-3"><ShieldCheck size={24} className="text-emerald-500 shrink-0" /> <span className="text-stone-300">Development strictly limited to 1 main house and 1 guest house to protect the ecosystem.</span></li>
              </ul>
            </div>

            {/* Collective Ownership */}
            <div className="bg-emerald-900/30 border border-emerald-800 p-10 rounded-[2.5rem] relative overflow-hidden flex flex-col shadow-2xl shadow-emerald-900/20">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-5 py-2 rounded-bl-2xl uppercase tracking-wider">Most Popular</div>
              <h3 className="text-3xl font-serif mb-2">Collective Ownership</h3>
              <div className="text-emerald-400 text-4xl font-bold mb-6">10 Hectares <span className="text-lg font-normal text-stone-400">shared estate</span></div>
              <p className="text-stone-300 mb-8 leading-relaxed">
                A 10-hectare plot sold to a collective of 1-4 owners ($275k per owner). The ultimate balance of private luxury living and massive ecological impact.
              </p>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3"><ShieldCheck size={24} className="text-emerald-500 shrink-0" /> <span className="text-stone-300"><strong>4 Hectares</strong> designated for sustainable residential development.</span></li>
                <li className="flex items-start gap-3"><ShieldCheck size={24} className="text-emerald-500 shrink-0" /> <span className="text-stone-300"><strong>6 Hectares</strong> jointly owned and maintained as a strictly protected private nature reserve.</span></li>
                <li className="flex items-start gap-3"><ShieldCheck size={24} className="text-emerald-500 shrink-0" /> <span className="text-stone-300">Includes shared greenhouse, dedicated gardener, and ongoing property management.</span></li>
                <li className="flex items-start gap-3"><ShieldCheck size={24} className="text-emerald-500 shrink-0" /> <span className="text-stone-300">Full assistance with permanent residency in Costa Rica.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-emerald-950 text-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf size={48} className="mx-auto text-emerald-400 mb-8" />
          <h2 className="text-4xl lg:text-5xl font-serif mb-6">Ready to realize your vision?</h2>
          <p className="text-xl text-emerald-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            From discovering the perfect terrain to stepping into your fully furnished sanctuary. Let's create something sustainable and extraordinary.<br/><br/>
            <span className="text-emerald-300 font-medium text-xl bg-emerald-900/50 px-6 py-3 rounded-full border border-emerald-800/50 inline-block mt-4">
              hello@connectingtheroots.org
            </span>
          </p>
          <form className="max-w-md mx-auto space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-5 py-4 rounded-xl bg-emerald-900/30 border border-emerald-800 text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400 transition" />
            <input type="email" placeholder="Email Address" className="w-full px-5 py-4 rounded-xl bg-emerald-900/30 border border-emerald-800 text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400 transition" />
            <textarea placeholder="Tell us about your project or vision..." rows="4" className="w-full px-5 py-4 rounded-xl bg-emerald-900/30 border border-emerald-800 text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400 transition"></textarea>
            <button type="button" className="w-full bg-emerald-500 text-emerald-950 font-bold px-5 py-4 rounded-xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20">
              Send Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-500 py-8 text-center text-sm border-t border-stone-900">
        <p>&copy; {new Date().getFullYear()} Conscious Development & Connecting the Roots. All rights reserved.</p>
      </footer>
    </div>
  );
}