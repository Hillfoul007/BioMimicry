import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur-xl border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center text-black font-black text-lg group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all">
            B
          </div>
          <span className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all">
            BioMimicry
          </span>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link 
            to="/architect" 
            className="text-sm font-semibold text-gray-300 hover:text-emerald-400 transition-colors"
          >
            Architect
          </Link>
          <Link 
            to="/" 
            className="text-sm font-semibold text-gray-300 hover:text-emerald-400 transition-colors"
          >
            Home
          </Link>
          <a 
            href="#about" 
            className="text-sm font-semibold text-gray-300 hover:text-emerald-400 transition-colors"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
