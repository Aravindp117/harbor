import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  'What disasters are common in my region?',
  'What should I do during a flood?',
  'How do I prepare for a hurricane?',
  'Where can I find shelters near a wildfire?',
];

const mockResponses: Record<string, string> = {
  'What disasters are common in my region?':
    "Based on global data, the most common disasters vary by region:\n\n• **Coastal areas**: Hurricanes, tsunamis, and flooding\n• **Tectonic zones**: Earthquakes (Ring of Fire, Mediterranean)\n• **Dry regions**: Wildfires and extreme heat\n• **River basins**: Seasonal flooding\n\nTo get specific data for your area, try the **Disaster Map** and click on your region to see historical frequency data.",
  'What should I do during a flood?':
    "During a flood, follow these critical steps:\n\n1. **Move to higher ground** immediately if water is rising\n2. **Avoid walking or driving** through flood waters — 6 inches can knock you down\n3. **Turn off utilities** at the main switches if safe to do so\n4. **Stay informed** via emergency broadcasts\n5. **Call emergency services** if you're trapped\n\n⚠️ After a flood, avoid contact with floodwater as it may be contaminated.",
  'How do I prepare for a hurricane?':
    "Hurricane preparedness checklist:\n\n• **Emergency kit**: Water (1 gallon/person/day), non-perishable food, medications, flashlight, batteries\n• **Secure your home**: Board windows, bring outdoor items inside, trim trees\n• **Plan evacuation**: Know your zone and routes, keep gas tank full\n• **Documents**: Copy important documents, store in waterproof container\n• **Communication plan**: Designate an out-of-area contact\n\nMonitor the **National Hurricane Center** for updates.",
  'Where can I find shelters near a wildfire?':
    "To find emergency shelters during a wildfire:\n\n1. Check our **Aid & Resources** page for mapped shelter locations\n2. Contact your local **Red Cross** chapter: 1-800-RED-CROSS\n3. Listen to local emergency broadcasts for evacuation center locations\n4. Visit **ready.gov/wildfires** for federal resources\n\n🏠 Our platform shows real-time shelter availability, food distribution centers, and medical aid stations on the interactive map.",
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Mock response with typing delay
    await new Promise((r) => setTimeout(r, 1200));
    const response =
      mockResponses[text.trim()] ||
      "I can help with disaster preparedness and finding aid resources. Try asking about specific disaster types, safety procedures, or nearby shelters. For real-time data, check the **Disaster Map** or **Aid & Resources** pages.";
    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-disaster-purple/10 mb-3">
          <Bot className="h-6 w-6 text-disaster-purple" />
        </div>
        <h1 className="font-heading text-2xl font-bold">Emergency AI Assistant</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ask questions about disaster risks, safety steps, or how to find help near affected regions.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-6">
            <p className="text-muted-foreground text-sm">Try one of these questions to get started:</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={cn('flex gap-3', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-disaster-purple/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-4 w-4 text-disaster-purple" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-muted rounded-bl-md'
              )}
            >
              <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-disaster-purple/10 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-disaster-purple" />
            </div>
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggested prompts when chat has messages */}
      {messages.length > 0 && (
        <div className="px-6 pb-2 flex flex-wrap gap-2">
          {suggestedPrompts.filter(p => !messages.some(m => m.content === p)).slice(0, 2).map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 sm:px-6 pb-6 pt-2">
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-2 border border-border focus-within:ring-2 focus-within:ring-primary/30"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about disasters, safety, or find help..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="rounded-full h-8 w-8 shrink-0" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
