"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Camera } from "lucide-react"; 
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm ">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Camera className="h-5 w-5" />
            </div>
            <span className="hidden font-bold sm:inline-block">
              SnapLink
            </span>
          </Link>
          <div className="hidden md:flex gap-6 items-center text-sm font-medium text-muted-foreground">
            <Link href="/gallery" className="transition-colors hover:text-foreground">
              Gallery
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-2">
            <AnimatedThemeToggler />
          </div>
          <div className="hidden md:flex gap-2">
            <Link href="/auth">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/auth">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="flex flex-col gap-4 px-6 mt-6">
                <Link href="/" className="font-bold text-lg">SnapLink</Link>
                <Link href="/gallery" className="text-muted-foreground hover:text-foreground">
                  Gallery
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <div className="h-px bg-border my-2" />
                <Link href="/auth">
                  <Button className="w-full">Sign In</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}