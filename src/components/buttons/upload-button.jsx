
"use client";

import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { addImageToDB } from "@/actions/addImage";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadButton() {
  const queryClient = useQueryClient();

  const handleUploadSuccess = async (result) => {
    const imageData = {
      publicId: result.info.public_id,
      originalUrl: result.info.secure_url,
    };
    await addImageToDB(imageData);

    toast("Image Uploaded!");
    queryClient.invalidateQueries({ queryKey: ["images"] });
  };

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