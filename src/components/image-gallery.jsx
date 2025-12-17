
"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner"
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteImage } from "@/actions/deleteImage";

const fetchImages = async () => {
  const res = await fetch("/api/images");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function ImageGallery() {
  const { data: images, isLoading, error, refetch } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  if (isLoading) return <p className="text-center mt-10">Loading Gallery...</p>;
  if (error) return <p className="text-center text-red-500">Error loading images</p>;

  const handleCopy = (shortCode) => {
    const fullUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    toast("Link copied to clipboard!");
  };
  
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    const result = await deleteImage(id);

    if (result.success) {

      refetch();
    } else {
      alert("Failed to delete image");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-8">
      {images.map((image) => (
        <div key={image._id} className="border rounded-lg overflow-hidden shadow-sm flex flex-col">

          <div className="relative h-48 w-full bg-gray-100 ">
            <img
              src={image.originalUrl}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Controls */}
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between  p-2 rounded">
              <span className="text-sm font-mono  truncate">
                /{image.shortCode}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleCopy(image.shortCode)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {/* We will activate this button in Part 2 */}
            <Button
              variant="destructive"
              className="w-full flex items-center gap-2"
              onClick={() => handleDelete(image._id)}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}