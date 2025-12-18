import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GallerySkeleton() {
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
  );
}