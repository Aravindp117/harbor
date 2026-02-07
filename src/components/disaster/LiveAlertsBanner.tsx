import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';

const alerts = [
  "Active Hurricane near Philippines — Category 3",
  "Major Earthquake detected in Chile — Magnitude 6.2",
  "Severe Flooding in Bangladesh — Emergency Aid Deployed",
];

export function LiveAlertsBanner() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  if (!visible) return null;

  return (
    <div className="bg-disaster-amber/10 border-b border-disaster-amber/20 px-4 py-2 text-sm flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <AlertTriangle className="h-4 w-4 text-disaster-amber shrink-0" />
        <span className="font-medium text-disaster-amber truncate">{alerts[index]}</span>
        <button
          onClick={() => setIndex((i) => (i + 1) % alerts.length)}
          className="text-muted-foreground hover:text-foreground text-xs underline shrink-0"
        >
          Next
        </button>
      </div>
      <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
