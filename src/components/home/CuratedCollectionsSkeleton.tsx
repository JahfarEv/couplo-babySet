import { Grid } from "lucide-react";

export function CuratedCollectionsSkeleton() {
  return (
    <section className="py-20 px-4 md:px-16 bg-surface-container-low transition-all">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="h-4 w-32 bg-gray-200 rounded-full animate-pulse mx-auto" />
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mt-2" />
          <div className="h-5 w-96 bg-gray-200 rounded-full animate-pulse mx-auto mt-4" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {/* Large Card Skeleton */}
          <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          </div>

          {/* Small Card 1 Skeleton */}
          <div className="rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          </div>

          {/* Small Card 2 Skeleton */}
          <div className="rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          </div>

          {/* WhatsApp Card Skeleton */}
          <div className="rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          </div>

          {/* View All Card Skeleton */}
          <div className="rounded-3xl overflow-hidden bg-gray-200 animate-pulse border border-primary/10">
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-lg" />
                <div className="h-4 w-32 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}