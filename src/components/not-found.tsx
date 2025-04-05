import { Link } from '@tanstack/react-router'

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-8">
        <h1 className="text-8xl font-bold text-zinc-800 dark:text-zinc-200">404</h1>
        <div className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
          {children || (
            <>
              <p className="mb-2">¡Ups! Parece que te has perdido.</p>
              <p className="text-lg">La página que buscas no existe o ha sido movida.</p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <button
          onClick={() => window.history.back()}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Regresar
        </button>
        <Link
          to="/"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Inicio
        </Link>
      </div>
    </div>
  )
}
