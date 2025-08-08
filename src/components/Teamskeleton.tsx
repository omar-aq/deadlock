const TeamSkeleton = () => {
  return (
    <div className="space-y-3" aria-busy>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-card/50 supports-[backdrop-filter]:bg-card/40 rounded-xl border p-6 shadow-sm backdrop-blur"
        >
          <div className="bg-accent/50 h-6 w-40 animate-pulse rounded" />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="bg-accent/40 h-5 w-64 animate-pulse rounded" />
            <div className="bg-accent/40 h-5 w-64 animate-pulse rounded" />
          </div>
          <div className="mt-4 grid grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((__, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="bg-accent/40 size-10 animate-pulse rounded-full" />
                <div className="bg-accent/30 h-3 w-16 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSkeleton;
