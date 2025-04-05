import { Link, Outlet } from "@tanstack/react-router";

export function Layout() {
  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-lg border-b border-secondary/10 dark:border-light/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-xl font-bold text-secondary dark:text-light hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              Mi Blog
            </Link>

            {/* Navigation Links */}
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  to="/"
                  className="text-secondary/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-secondary/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-secondary/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
} 