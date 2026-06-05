export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-black italic tracking-widest text-white">
        NEO<span className="text-neon-green">CLOTH</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider text-gray-400">
        <a href="#" className="hover:text-neon-blue transition-colors">Hoodies</a>
        <a href="#" className="hover:text-neon-blue transition-colors">Collections</a>
        <a href="#" className="hover:text-neon-blue transition-colors">Limited</a>
      </div>

      <button className="px-6 py-2 border border-neon-green text-neon-green rounded-md font-bold uppercase text-xs hover:bg-neon-green hover:text-black transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)]">
        Sign In
      </button>
    </nav>
  );
}