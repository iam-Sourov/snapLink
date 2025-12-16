import UploadButton from "@/components/upload-button";
import ImageGallery from "@/components/image-gallery"; // <--- Import this

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900">SnapLink Gallery</h1>

      <UploadButton />

      {/* The Gallery Component */}
      <ImageGallery />

    </main>
  );
}