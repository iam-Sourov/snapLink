// app/gallery/page.js
import { useQuery } from "@tanstack/react-query";
import ImageCard from "@/components/GalleryCard";

// Mock data (replace with your MongoDB fetch logic later)
const mockData = {
  _id: "694193a8ca623ecd8517d06e",
  publicId: "emfh5tlxfobtmcynprbn",
  originalUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba", // using a placeholder for demo
  shortCode: "iODA1",
  clicks: 12,
  createdAt: "2025-12-16T17:15:20.150+00:00"
};


export default function GalleryPage() {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Use the component here */}
      <ImageCard data={mockData} />
    </div>
  );
}