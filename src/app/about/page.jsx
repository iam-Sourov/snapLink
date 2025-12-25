
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-center">About SnapLink</h1>
        <p className="text-lg text-muted-foreground text-center">
          SnapLink is a modern, open-source application that seamlessly combines a powerful image gallery with a lightning-fast URL shortener. 
          It's designed for creators, developers, and anyone who needs to share visual content quickly and efficiently.
        </p>

        <div className="pt-8">
          <h2 className="text-2xl font-semibold mb-4">Core Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Instant Image Uploads:</strong> Upload your images and get a shareable link in seconds, powered by Cloudinary.</li>
            <li><strong>URL Shortening:</strong> Every uploaded image automatically gets a unique, short, and clean URL.</li>
            <li><strong>Beautiful Gallery:</strong> A responsive and stylish gallery to browse your uploaded content.</li>
            <li><strong>Easy Management:</strong> Copy links to your clipboard or delete images with a single click.</li>
            <li><strong>User Authentication:</strong> Securely manage your own collection of images.</li>
            <li><strong>Light & Dark Mode:</strong> A beautiful and consistent theme that adapts to your system preference.</li>
          </ul>
        </div>

        <div className="pt-8">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <p className="text-muted-foreground">
            SnapLink is built with a modern, full-stack JavaScript setup:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
            <li><strong>Next.js:</strong> The core React framework, providing server-side rendering, routing, and API capabilities.</li>
            <li><strong>React & TanStack Query:</strong> For a dynamic and responsive user interface with efficient data fetching and state management.</li>
            <li><strong>Tailwind CSS & shadcn/ui:</strong> For a utility-first styling workflow and a set of beautifully designed, accessible components.</li>
            <li><strong>MongoDB:</strong> As the primary database for storing image metadata.</li>
            <li><strong>Firebase Authentication:</strong> For handling user sign-up, login, and session management.</li>
            <li><strong>Cloudinary:</strong> For robust and scalable cloud-based image storage and delivery.</li>
          </ul>
        </div>
        
        <div className="text-center pt-12">
          <p className="text-muted-foreground">
            Want to contribute or check out the source code? 
            Find this project on <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
