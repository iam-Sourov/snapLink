"use client";

import React, { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, Trash2, FileImage, Loader2, Sparkles, AlertTriangle, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteImage } from "@/actions/deleteImage";
import { useAuth } from "@/components/authProvider/auth-provider";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";

const fetchImages = async () => {
  const res = await fetch("/api/images");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const BentoSkeleton = () => (
  <BentoGrid className="grid-cols-1 md:grid-cols-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className={cn(
        "relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        i === 0 && "md:col-span-2",
        i === 1 && "md:col-span-2",
      )}>
        <Skeleton className="h-full w-full" />
      </div>
    ))}
  </BentoGrid>
)

const BentoCards = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: images,
    isLoading,
    error,
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

  const handleCopy = useCallback((shortCode) => {
    if (typeof window === "undefined") return;
    const fullUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copied!");
  }, []);

  const handleDelete = useCallback((id) => {
    deleteMutation.mutate(id);
  }, [deleteMutation]);

  const cardLayout = [
    "md:col-span-2",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-2",
    "md:col-span-1",
  ]

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <BentoSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-red-500 bg-red-500/10 rounded-xl border border-red-500/20 max-w-4xl mx-auto">
        <AlertTriangle className="h-10 w-10 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Failed to load gallery</h3>
        <p className="text-sm text-red-500/80 mb-6 max-w-sm">
          There was an unexpected error while fetching the images. Please try again in a few moments.
        </p>
        <Button
          variant="outline"
          onClick={() => queryClient.refetchQueries(["images"])}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground bg-background/50 rounded-xl border-2 border-dashed border-border">
        <UploadCloud className="h-12 w-12 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Your gallery is empty</h3>
        <p className="text-sm mb-6 max-w-sm">
          Upload your first image to get started. It will appear here once the upload is complete.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-border/40 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Recent Uploads</h2>
          <p className="text-muted-foreground mt-1">
            Browse your collection of shared moments.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1 backdrop-blur-sm shrink-0">
          <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
          <span className="text-sm font-medium text-muted-foreground">
            {images.length} {images.length === 1 ? "Item" : "Items"}
          </span>
        </div>
      </div>
      <BentoGrid className="grid-cols-1 md:grid-cols-4">
        {images.map((image, index) => {
          return (
            <BentoCard
              key={image._id}
              name={`/${image.shortCode}`}
              className={cardLayout[index % cardLayout.length]}
              Icon={FileImage}
              description="Click to view original"
              href={image.originalUrl}
              cta="Open Image"
              background={
                <div className="absolute inset-0 h-full w-full bg-muted/20">
                  <Image
                    src={image.originalUrl}
                    alt="Gallery Item"
                    fill
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
                </div>
              }
              actions={
                <div
                  className="flex gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full bg-background/50 hover:bg-background border border-border/10"
                    onClick={() => handleCopy(image.shortCode)}
                    title="Copy Link"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  {user && (
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8 rounded-full shadow-sm"
                      onClick={() => handleDelete(image._id)}
                      title="Delete"
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending &&
                      deleteMutation.variables === image._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
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