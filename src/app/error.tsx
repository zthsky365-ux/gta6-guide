'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-[#16213e] rounded-2xl p-8 border border-[#e94560]/30 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-gray-400 mb-4 text-sm">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-[#e94560] hover:bg-[#d63851] text-white font-semibold rounded-xl transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
