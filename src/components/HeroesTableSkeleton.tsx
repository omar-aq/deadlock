import { Skeleton } from '@/components/ui/skeleton';

const HeroesSkeleton = () => {
  return (
    <div className="w-full overflow-x-auto py-10">
      <div className="min-w-[600px] md:min-w-0">
        <div className="bg-muted/60 dark:bg-muted/60 rounded-lg p-6">
          <div className="mb-4 grid grid-cols-5 gap-4">
            <Skeleton className="mx-auto h-6 w-full" />
            <Skeleton className="mx-auto h-6 w-full" />
            <Skeleton className="mx-auto h-6 w-full" />
            <Skeleton className="mx-auto h-6 w-full" />
            <Skeleton className="mx-auto h-6 w-full" />
          </div>
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="grid grid-cols-5 items-center gap-4">
                <Skeleton className="mx-auto h-8 w-full rounded-full" />
                <Skeleton className="mx-auto h-6 w-full" />
                <Skeleton className="mx-auto h-6 w-full" />
                <Skeleton className="mx-auto h-6 w-full" />
                <Skeleton className="mx-auto h-6 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroesSkeleton;
