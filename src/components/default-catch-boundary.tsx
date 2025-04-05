import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error("DefaultCatchBoundary Error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">¡Ups! Algo salió mal</h2>
          <ErrorComponent error={error} />
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.invalidate()}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
          >
            Intentar de nuevo
          </button>
          
          {isRoot ? (
            <Link
              to="/"
              className="w-full py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg font-medium text-center transition-colors"
            >
              Ir al inicio
            </Link>
          ) : (
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="w-full py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg font-medium text-center transition-colors"
            >
              Volver atrás
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
