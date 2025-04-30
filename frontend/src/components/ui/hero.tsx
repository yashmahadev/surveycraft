import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryAction: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  image?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  image,
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted/40 py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container relative z-10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div>
              <h2 className="inline-block rounded-full bg-survey-purple/10 px-4 py-1.5 text-sm font-medium text-survey-purple">
                {subtitle}
              </h2>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {title.includes('SurveyCraft') ? (
                <span>
                  {title.split('SurveyCraft')[0]}
                  <span className="gradient-text">SurveyCraft</span>
                  {title.split('SurveyCraft')[1]}
                </span>
              ) : (
                title
              )}
            </h1>
            <p className="text-muted-foreground text-lg max-w-[600px] md:mx-0 mx-auto">
              {description}
            </p>
            <div className="flex gap-4 md:justify-start justify-center">
              <Link to={primaryAction.href}>
                <Button size="lg" className="font-medium">
                  {primaryAction.text}
                </Button>
              </Link>
              {secondaryAction && (
                <Link to={secondaryAction.href}>
                  <Button size="lg" variant="outline" className="font-medium">
                    {secondaryAction.text}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block relative">
            {image ? (
              <img
                loading="lazy"
                src={image}
                alt="Hero visualization"
                className="rounded-lg shadow-lg glass max-w-full h-auto"
              />
            ) : (
              <div className="aspect-video rounded-lg overflow-hidden glass p-6">
                <div className="h-full w-full bg-gradient-to-br from-survey-purple/30 to-survey-blue/30 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-bold gradient-text">SurveyCraft</span>
                    <p className="mt-2 text-muted-foreground">Create amazing surveys with ease</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
