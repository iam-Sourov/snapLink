"use client";

import Link from "next/link";
import { Camera, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-10 md:py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Camera className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">SnapLink</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The fastest way to upload images and share short links.
              Open source and built for developers.
            </p>
            <div className="mt-6 flex max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-muted/50"/>
              <Button type="submit" size="sm">Subscribe</Button>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground">Product</h3>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Upload
            </Link>
            <Link href="#gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link href="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Login / Sign Up
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground">Resources</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              API Reference
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Community
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-foreground">Socials</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SnapLink. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}