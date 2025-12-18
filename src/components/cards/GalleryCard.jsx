"use client";

import { Copy, Trash2, ExternalLink, BarChart2, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

export default function GalleryCard({ data }) {
  const [copied, setCopied] = useState(false);

  const shortLink = `${typeof window !== "undefined" ? window.location.origin : ""}/${data.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this image?")) {

      console.log("Deleting", data._id);
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50">

      {/* 1. IMAGE SECTION */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted/50">
        <img
          src={data.originalUrl}
          alt={`Image ${data.shortCode}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay Buttons (Visible on Hover) */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
            asChild>
            <Link href={data.originalUrl} target="_blank">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/50 border border-border/50">
          <code className="text-sm font-semibold truncate text-primary">
            /{data.shortCode}
          </code>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BarChart2 className="h-3.5 w-3.5" />
            <span>{data.clicks} clicks</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(data.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge variant="outline" className="font-normal text-muted-foreground">
          ID: {data._id.slice(-6)}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2"
          onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}