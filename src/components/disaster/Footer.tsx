import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-heading font-bold text-lg mb-3">
              <Globe className="h-5 w-5 text-primary" />
              Global Disaster Insight
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Helping people understand global disaster trends and locate emergency resources. This is not an official emergency response service.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-3">Navigate</h4>
            <div className="space-y-2">
              {[{ to: '/map', label: 'Disaster Map' }, { to: '/trends', label: 'Trends' }].map(l => (
                <Link key={l.to} to={l.to} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">© 2026 Global Disaster Insight. Not an official emergency service.</p>
        </div>
      </div>
    </footer>
  );
}
