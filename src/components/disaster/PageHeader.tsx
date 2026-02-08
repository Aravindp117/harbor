import harborLogo from '@/assets/harbor-logo.png';

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <img src={harborLogo} alt="Harbor" className="h-10 w-10 object-contain mb-3" />
      <h1 className="font-heading text-3xl md:text-4xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-2 max-w-lg">{description}</p>
    </div>
  );
}
