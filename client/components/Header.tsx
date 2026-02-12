import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
          <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            BioMimicry Architect
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/architect" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Architect
          </Link>
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <a 
            href="#about" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
