import Skeleton from "../components/skeletons/Skeleton";
import LoadingSequence from "../components/skeletons/LoadingSequence";

export default function ContactLoading() {
  const skeleton = (
    <div className="relative flex min-h-screen w-full flex-col pt-16 bg-background">
      <main className="flex-1 py-16 px-4 md:px-10 max-w-7xl mx-auto w-full pb-24 xl:pb-16">
        {/* Page Heading Placeholder */}
        <div className="flex flex-col gap-3 mb-12">
          <Skeleton className="h-12 w-80" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column Placeholder */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-14 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>

            {/* Address Card */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48 ml-7" />
                  <Skeleton className="h-4 w-40 ml-7" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Placeholder */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm h-full">
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <div className="sm:col-span-2">
                  <Skeleton className="h-14 w-40 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 w-full">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      </main>
    </div>
  );

  return (
    <LoadingSequence
      skeleton={skeleton}
    />
  );
}
