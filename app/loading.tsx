import { PageLoading } from "@/components/ui/page-loading";

export default function HomeLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="relative min-h-screen flex items-center justify-center graph-bg">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-20">
          <div className="h-6 w-40 sketch-skeleton mx-auto" />
          <div className="h-16 w-80 sketch-skeleton mx-auto" />
          <div className="h-16 w-64 sketch-skeleton mx-auto" />
          <div className="h-5 w-96 sketch-skeleton mx-auto" />
          <div className="h-5 w-72 sketch-skeleton mx-auto" />
          <div className="flex items-center justify-center gap-4">
            <div className="h-11 w-36 sketch-skeleton" />
            <div className="h-11 w-36 sketch-skeleton" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="sketch-border bg-card p-4 space-y-2">
                <div className="h-8 w-16 sketch-skeleton mx-auto" />
                <div className="h-3 w-20 sketch-skeleton mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
