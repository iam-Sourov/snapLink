"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import GalleryCard from "@/components/cards/GalleryCard";
import GallerySkeleton from "@/components/skeleton/GallerySkeleton";
import { deleteImage } from "@/actions/deleteImage";
import { toast } from "sonner";
import { useCallback } from "react";

const fetchImages = async () => {
  const res = await fetch("/api/images");
  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }
  return res.json();
};

export default function GalleryPage() {
  const queryClient = useQueryClient();
  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteImage,
    onMutate: async (imageId) => {
      await queryClient.cancelQueries({ queryKey: ["images"] });
      const previousImages = queryClient.getQueryData(["images"]);
      queryClient.setQueryData(["images"], (old) =>
        old.filter((image) => image._id !== imageId)
      );
      return { previousImages };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["images"], context.previousImages);
      toast.error("Failed to delete image. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onSuccess: () => {
      toast.success("Image deleted successfully!");
    },
  });

  const handleDelete = useCallback((id) => {
    deleteMutation.mutate(id);
  }, [deleteMutation]);

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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-border/40 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Gallery</h2>
          <p className="text-muted-foreground mt-1">
            Here is your collection of shared moments.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((image) => (
          <GalleryCard
            key={image._id}
            data={image}
            onDelete={handleDelete}
            isDeleting={
              deleteMutation.isPending && deleteMutation.variables === image._id
            }
          />
        ))}
      </div>
    </div>
  );
}