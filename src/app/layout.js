import "./globals.css";
import QueryProvider from "@/utils/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/themeProvider/theme-provider";
import { AuthProvider } from "@/components/authProvider/auth-provider";
import Footer from "@/components/footer/footer";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata = {
  title: "SnapLink",
  description: "Image Gallery & URL Shortener",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <AuthProvider>
              <Navbar />
              {children}
              <Footer/>
            </AuthProvider>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}