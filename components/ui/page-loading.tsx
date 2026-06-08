export function PageLoading() {
  return (
    <div className="min-h-screen pt-20 animate-pulse">
      {/* Page header skeleton */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="h-3 w-24 sketch-skeleton mx-auto" />
          <div className="h-10 w-72 sketch-skeleton mx-auto" />
          <div className="h-4 w-96 sketch-skeleton mx-auto" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="sketch-border bg-card p-6 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sketch-skeleton" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 sketch-skeleton w-3/4" />
                  <div className="h-3 sketch-skeleton w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 sketch-skeleton" />
                <div className="h-3 sketch-skeleton w-5/6" />
                <div className="h-3 sketch-skeleton w-4/6" />
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-16 sketch-skeleton" />
                <div className="h-5 w-20 sketch-skeleton" />
                <div className="h-5 w-14 sketch-skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

