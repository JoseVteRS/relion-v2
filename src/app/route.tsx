import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black text-secondary dark:text-light mb-8 font-primary tracking-tight">
              Bienvenido a Mi{" "}
              <span className="text-primary dark:text-primary/90">Blog Personal</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary/80 dark:text-light/80 mb-12 font-secondary max-w-3xl mx-auto">
              Un espacio donde comparto mis pensamientos sobre desarrollo, tecnología y más
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Posts Card */}
          <div className="group bg-white dark:bg-dark/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-secondary dark:text-light mb-4 font-primary group-hover:text-primary transition-colors">
                Últimos Posts
              </h3>
              <p className="text-secondary/70 dark:text-light/70 mb-6 font-secondary line-clamp-3">
                Explora mis publicaciones más recientes sobre desarrollo web y tecnología
              </p>
              <Link
                to="/posts"
                className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all"
              >
                Ver Posts
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* About Card */}
          <div className="group bg-white dark:bg-dark/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-secondary dark:text-light mb-4 font-primary group-hover:text-secondary transition-colors">
                Sobre Mí
              </h3>
              <p className="text-secondary/70 dark:text-light/70 mb-6 font-secondary line-clamp-3">
                Conoce más sobre mi trayectoria y experiencia en el mundo del desarrollo
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-secondary font-medium group-hover:gap-2 transition-all"
              >
                Conóceme
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Contact Card */}
          <div className="group bg-white dark:bg-dark/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="p-8">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-secondary dark:text-light mb-4 font-primary group-hover:text-primary transition-colors">
                Contacto
              </h3>
              <p className="text-secondary/70 dark:text-light/70 mb-6 font-secondary line-clamp-3">
                ¿Tienes alguna pregunta o propuesta? No dudes en contactarme
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all"
              >
                Contáctame
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
