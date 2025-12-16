// components/upload-button.jsx
"use client";

import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { addImageToDB } from "@/actions/addImage";
import { toast } from "sonner";

export default function UploadButton() {

  // This runs when the upload to Cloudinary finishes successfully
  const handleUploadSuccess = async (result) => {
    const imageData = {
      publicId: result.info.public_id,
      originalUrl: result.info.secure_url,
    };

    // Call our Server Action to save to DB
    await addImageToDB(imageData);

    toast("Image Uploaded!");
  };

  return (
    <Button asChild>
      {/* Replace 'snaplink_preset' with the name you created in Step 1 */}
      <CldUploadButton
        uploadPreset="snaplink_preset"
        onSuccess={handleUploadSuccess}
      >
        <span className="flex items-center gap-2">
          Upload Image
        </span>
      </CldUploadButton>
    </Button>
  );
}