"use client";

import { useQuery } from "@tanstack/react-query";
import GalleryCard from "@/components/cards/GalleryCard";
import GallerySkeleton from "@/components/skeleton/GallerySkeleton";

const fetchImages = async () => {
  const res = await fetch("/api/images");
  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }
  return res.json();
};

export default function GalleryPage() {
  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  if (isLoading) {
    return <GallerySkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load images.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-border/40 pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gallery</h2>
          <p className="text-muted-foreground mt-1">
            Here is your collection of shared moments.
          </p>
        </div>
      </div>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <GalleryCard key={image._id} data={image} />
        ))}
      </div>
    </div>
  );
}