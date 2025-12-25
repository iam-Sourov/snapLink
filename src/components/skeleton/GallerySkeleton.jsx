import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <Card className="overflow-hidden border-border/50">
      <Skeleton className="aspect-video w-full rounded-b-none" />
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 p-2 rounded-md border border-border/50">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </CardFooter>
    </Card>
  )
}


export default function GallerySkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-border/40 pb-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}