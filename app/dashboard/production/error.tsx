"use client";

export default function ProductionError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-4">
      <div className="rounded-xl border bg-card p-6 max-w-md w-full text-center space-y-4">
        <span className="material-symbols-outlined text-4xl text-destructive">
          error
        </span>
        <h2 className="text-lg font-semibold">Production error</h2>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
