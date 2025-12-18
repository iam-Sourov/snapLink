
"use client";

import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { addImageToDB } from "@/actions/addImage";
import { toast } from "sonner";

export default function UploadButton() {

  const handleUploadSuccess = async (result) => {
    const imageData = {
      publicId: result.info.public_id,
      originalUrl: result.info.secure_url,
    };
    await addImageToDB(imageData);

    toast("Image Uploaded!");
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