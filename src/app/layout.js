// app/layout.js
import "./globals.css";
import QueryProvider from "@/utils/QueryProvider"; // Import it
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: "SnapLink",
  description: "Image Gallery & URL Shortener",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the children with your QueryProvider */}
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}