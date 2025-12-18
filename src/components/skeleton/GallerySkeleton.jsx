import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GallerySkeleton() {
  return (
    // Mimic the container structure minus hover effects
    <Card className="overflow-hidden border-border/50">

      {/* 1. IMAGE SECTION PLACEHOLDER */}
      <Skeleton className="aspect-video w-full rounded-b-none" />

      {/* 2. CARD CONTENT PLACEHOLDER */}
      <CardContent className="p-4 space-y-3">
        {/* Short Link Row */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-md border border-border/50">
          {/* Placeholder for the shortcode text */}
          <Skeleton className="h-5 w-24" />
          {/* Placeholder for the Copy button */}
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Clicks placeholder */}
          <Skeleton className="h-4 w-16" />
          {/* Date placeholder (aligned right to match original) */}
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
      </CardContent>

      {/* 3. FOOTER PLACEHOLDER */}
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {/* Badge ID placeholder (rounded-full looks like a badge) */}
        <Skeleton className="h-6 w-24 rounded-full" />

        {/* Delete button placeholder */}
        <Skeleton className="h-9 w-20 rounded-md" />
      </CardFooter>
    </Card>
  );
}