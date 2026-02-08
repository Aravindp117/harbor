import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import harborLogo from '@/assets/harbor-logo.png';

const navItems = [
  { to: '/', label: 'HOME' },
  {
    label: 'EXPLORE',
    children: [
      { to: '/map', label: 'Disaster Map' },
      { to: '/trends', label: 'Trends' },
    ],
  },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-lg border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg text-white">
            <img src={harborLogo} alt="Harbor" className="h-7 w-7 object-contain" />
            <span>Harbor</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button
                    className="px-3 py-2 text-xs font-semibold tracking-wider text-white/60 hover:text-white transition-colors flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <div className="absolute top-full left-0 mt-0 w-48 bg-card border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className={cn(
                          'block px-4 py-3 text-xs font-semibold tracking-wider transition-colors hover:bg-accent',
                          pathname === child.to
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to!}
                  className={cn(
                    'px-3 py-2 text-xs font-semibold tracking-wider transition-colors',
                    pathname === item.to
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-4 space-y-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <div className="px-3 py-2 text-xs font-semibold tracking-wider text-muted-foreground">
                  {item.label}
                </div>
                {item.children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block px-6 py-2 text-sm font-semibold tracking-wider transition-colors',
                      pathname === child.to
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to!}
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-3 py-2 text-sm font-semibold tracking-wider transition-colors',
                  pathname === item.to
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
