import { Link } from "wouter";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <Compass className="w-12 h-12 text-muted-foreground opacity-50" />
        </div>
        <h1 className="text-8xl font-display text-primary mb-4 opacity-20">404</h1>
        <h2 className="text-2xl font-bold text-primary mb-2">Off The Trail</h2>
        <p className="text-muted-foreground mb-8">
          It looks like you've wandered into uncharted territory. This path doesn't exist on our maps.
        </p>
        <Link href="/">
          <a className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary text-white font-bold uppercase tracking-widest hover:bg-accent transition-colors">
            Return to Base
          </a>
        </Link>
      </div>
    </div>
  );
}
