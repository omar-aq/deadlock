import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className="w-full overflow-x-auto py-10">
      <div className="min-w-[600px] md:min-w-0">
        <div className="rounded-lg border p-6">
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
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-5 w-28" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-2.5 w-40" />
                  <Skeleton className="h-2.5 w-24" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-2.5 w-36" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
                <Skeleton className="mx-auto h-5 w-20" />
                <Skeleton className="mx-auto h-5 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
