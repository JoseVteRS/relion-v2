import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute('/posts/')({
  component: PostsLayout,
});

function PostsLayout() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.posts.get.queryOptions());
  
  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      {/* Header con diseño moderno */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-5 dark:opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative">
            <span className="absolute -top-8 text-[120px] font-black text-primary/5 dark:text-light/5 select-none">
              BLOG
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary dark:text-light">
              Blog
              <span className="block mt-2 text-xl md:text-2xl font-normal text-secondary/60 dark:text-light/60">
                Pensamientos & Código
              </span>
            </h1>
          </div>
        </div>
      </header>

      {/* Grid de posts con diseño moderno */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.res.map((post) => (
            <article 
              key={post.id}
              className="group bg-white dark:bg-dark/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Link 
                to={`/posts/$postId`}
                params={{ postId: post.id.toString() }}
                className="block p-6"
              >
                <div className="mb-6">
                  <span className="text-xs font-medium text-primary dark:text-primary/80 bg-primary/5 dark:bg-primary/10 px-3 py-1 rounded-full">
                    #{post.id.toString().padStart(3, '0')}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-secondary dark:text-light mb-3 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="text-secondary/70 dark:text-light/70 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-secondary/10 dark:border-light/10">
                  <time className="text-xs text-secondary/60 dark:text-light/60">
                    04/04/2024
                  </time>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Leer
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      {/* Footer con diseño moderno */}
      <footer className="border-t border-secondary/10 dark:border-light/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-secondary/80 dark:text-light/80 text-sm">
              Blog Personal © 2024
            </div>
            <div className="flex items-center gap-6">
              {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-sm text-secondary/60 dark:text-light/60 hover:text-primary transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 