export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <div className="inline-flex flex-col items-center">
          <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />

          <div className="flex space-x-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-primary-600" />
            <div className="h-3 w-3 animate-pulse rounded-full bg-primary-600 animation-delay-200" />
            <div className="h-3 w-3 animate-pulse rounded-full bg-primary-600 animation-delay-400" />
          </div>
        </div>
      </div>
    </main>
  );
}
