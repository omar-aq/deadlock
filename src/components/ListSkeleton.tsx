import { Skeleton } from '@/components/ui/skeleton';

const LestSkeleton = () => {
  return (
    <ul className="space-y-3" aria-busy>
      {Array.from({ length: 6 }).map((_, idx) => (
        <li
          key={idx}
          className="bg-card/50 supports-[backdrop-filter]:bg-card/40 rounded-xl border p-4 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-2/5 sm:w-1/3" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-4 w-6 rounded" />
              </div>
            </div>
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LestSkeleton;
