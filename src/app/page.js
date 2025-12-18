import UploadButton from "@/components/upload-button";
import ImageGallery from "@/components/image-gallery";
import { auth } from '@/lib/firebase';
console.log("Firebase Auth Initialized:", auth);


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      <h1 className="text-4xl font-bold ">SnapLink Gallery</h1>

      <UploadButton />

      <ImageGallery />

    </main>
  );
}