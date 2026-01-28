import Skeleton from "../components/skeletons/Skeleton";
import LoadingSequence from "../components/skeletons/LoadingSequence";

export default function LoginLoading() {
  const skeleton = (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-2xl border border-border">
        <div className="text-center flex flex-col items-center gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-64 mt-4" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-0">
            <Skeleton className="h-12 w-full rounded-t-xl rounded-b-none" />
            <Skeleton className="h-12 w-full rounded-b-xl rounded-t-none" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <LoadingSequence
      skeleton={skeleton}
    />
  );
}
