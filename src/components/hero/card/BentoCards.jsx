// src/components/image-gallery.jsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Copy, Trash2, FileImage, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteImage } from "@/actions/deleteImage";
import { useAuth } from "@/components/authProvider/auth-provider";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"; 

const fetchImages = async () => {
  const res = await fetch("/api/images");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const BentoCards = () => {
  const { user } = useAuth();
  
  const { data: images, isLoading, error, refetch } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  const handleCopy = (shortCode) => {
    if (typeof window === "undefined") return;
    const fullUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copied!");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    const result = await deleteImage(id);
    if (result.success) {
      toast.success("Image deleted");
      refetch();
    } else {
      toast.error("Failed to delete");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-100">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">Loading Bento Grid...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500 font-medium">Failed to load gallery.</p>
        <Button variant="outline" onClick={() => refetch()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No images uploaded yet. Be the first!
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-border/40 pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recent Uploads</h2>
          <p className="text-muted-foreground mt-1">
            Browse your collection of shared moments.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
            <span className="text-sm font-medium text-muted-foreground">
                {images.length} {images.length === 1 ? 'Item' : 'Items'}
            </span>
        </div>
      </div>
      <BentoGrid className="grid-cols-1 md:grid-cols-3">
        {images.map((image, index) => {
            const isFeatured = index === 0 || index % 7 === 0;
            return (
              <BentoCard
                key={image._id}
                name={`/${image.shortCode}`}
                className={isFeatured ? "md:col-span-2" : "md:col-span-1"}
                Icon={FileImage}
                description="Click to view original"
                href={image.originalUrl}
                cta="Open Image"
                background={
                  <div className="absolute inset-0 h-full w-full bg-muted/20">
                     <img
                        src={image.originalUrl}
                        alt="Gallery Item"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 hover:opacity-100"
                      />
                      {/* Gradient for text readability */}
                      <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent" />
                  </div>
                }
                actions={
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full bg-background/50 hover:bg-background border border-border/10"
                      onClick={() => handleCopy(image.shortCode)}
                      title="Copy Link">
                      <Copy className="h-4 w-4" />
                    </Button>
                    {user && (
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8 rounded-full shadow-sm"
                        onClick={() => handleDelete(image._id)}
                        title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                }
              />
            );
        })}
      </BentoGrid>
    </div>
  );
};

export default BentoCards;