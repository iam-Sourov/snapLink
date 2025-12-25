import React from 'react';
import UploadButton from '../buttons/upload-button';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className=''>
      <section className="relative flex flex-col items-center justify-center border-b border-border/40 bg-background/95 py-20 md:py-28 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[100%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium backdrop-blur-sm mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
          <span className="text-muted-foreground">The Fastest Way to Share Images</span>
        </div>
        <h1 className="relative max-w-4xl px-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Share your photos with <br />
          <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            One Click.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl px-4 text-base md:text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Upload images, generate instant short links, and track your views.
          <br className="hidden sm:block" /> No complicated sign-ups required.
        </p>
        <div className="mt-8 md:mt-10 flex w-full max-w-sm flex-col items-center gap-4 px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="w-full">
            <UploadButton />
          </div>
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG & GIF up to 10MB
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;