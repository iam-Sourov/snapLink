
"use client";

import { useAuth } from "@/components/authProvider/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import GalleryCard from "@/components/cards/GalleryCard";
import GallerySkeleton from "@/components/skeleton/GallerySkeleton";
import { deleteImage } from "@/actions/deleteImage";
import { toast } from "sonner";

const fetchUserImages = async (userId) => {
  const res = await fetch(`/api/images?userId=${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user images");
  }
  return res.json();
};

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  const {
    data: images,
    isLoading: isLoadingImages,
    isError,
  } = useQuery({
    queryKey: ["images", user?.uid],
    queryFn: () => fetchUserImages(user.uid),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteImage,
    onMutate: async (imageId) => {
      const queryKey = ["images", user?.uid];
      await queryClient.cancelQueries({ queryKey });
      const previousImages = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) =>
        old.filter((image) => image._id !== imageId)
      );
      return { previousImages, queryKey };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(context.queryKey, context.previousImages);
      toast.error("Failed to delete image. Please try again.");
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: context.queryKey });
    },
    onSuccess: () => {
      toast.success("Image deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const handleDelete = useCallback((id) => {
    deleteMutation.mutate(id);
  }, [deleteMutation]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-5xl">
      <div className="space-y-10">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-md sm:text-lg text-muted-foreground mt-2">
            Manage your account and view your uploaded images.
          </p>
        </div>
        
        <div className="p-6 bg-background rounded-xl border border-border/50">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Account Details</h2>
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row">
              <strong className="w-32 shrink-0">Display Name:</strong>
              <span>{user.displayName || "Not set"}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <strong className="w-32 shrink-0">Email:</strong>
              <span className="truncate">{user.email}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your Images</h2>
          {isLoadingImages ? (
            <GallerySkeleton />
          ) : isError ? (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <p className="text-red-500">Failed to load your images.</p>
            </div>
          ) : images && images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg bg-muted/20">
              <h3 className="text-lg font-medium text-muted-foreground">No Images Yet</h3>
              <p className="text-sm text-muted-foreground mt-1">You haven't uploaded any images.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
