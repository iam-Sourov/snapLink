
"use client";

import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { addImageToDB } from "@/actions/addImage";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/authProvider/auth-provider";

export default function UploadButton() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleUploadSuccess = async (result) => {
    if (!user) {
      toast.error("You must be logged in to upload images.");
      return;
    }
    const imageData = {
      publicId: result.info.public_id,
      originalUrl: result.info.secure_url,
      userId: user.uid,
    };
    await addImageToDB(imageData);

    toast("Image Uploaded!");
    queryClient.invalidateQueries({ queryKey: ["images"] });
  };

  if (!user) {
    return null;
  }

  return (
    <Button asChild>
      <CldUploadButton
        uploadPreset="snaplink_preset"
        onSuccess={handleUploadSuccess}>
        <span className="flex items-center gap-2">
          Upload Image
        </span>
      </CldUploadButton>
    </Button>
  );
}