import { Spinner } from "@/components/spinner";
import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: PostDetail,
  loader: async ({ params: { postId }, context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.posts.getById.queryOptions({ id: Number(postId) })
    );
  },
  errorComponent: () => "Oh error",
  pendingComponent: Spinner,
});

function PostDetail() {
  const { postId } = useParams({ from: "/posts/$postId" });
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.posts.getById.queryOptions({ id: Number(postId) })
  );

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      {/* Botón de regreso */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to="/posts"
          className="inline-flex items-center text-secondary/60 dark:text-light/60 hover:text-primary transition-colors group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          Volver al blog
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6 pb-16">
        {/* Cabecera del post */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-medium text-primary dark:text-primary/80 bg-primary/5 dark:bg-primary/10 px-3 py-1 rounded-full">
              #{postId.padStart(3, "0")}
            </span>
            <span className="text-xs text-secondary/60 dark:text-light/60">
              04/04/2024
            </span>
            <span className="text-xs text-secondary/60 dark:text-light/60 before:content-['•'] before:mr-3">
              3 min lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-secondary dark:text-light mb-6">
            {data.title}
          </h1>

          <div className="flex items-center gap-4 pt-6 border-t border-secondary/10 dark:border-light/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-light flex items-center justify-center font-bold">
              J
            </div>
            <div>
              <div className="font-medium text-secondary dark:text-light">
                Jose
              </div>
              <div className="text-sm text-secondary/60 dark:text-light/60">
                Developer & Writer
              </div>
            </div>
          </div>
        </header>

        {/* Contenido del post */}
        <div className="text-light prose prose-2xl">
          <h2>Contenido</h2>
          <p>{data.excerpt}</p>
        </div>

        {/* Footer del post */}
        <footer className="mt-16 pt-8 border-t border-secondary/10 dark:border-light/10">
          <div className="flex flex-wrap gap-3">
            {["React", "TypeScript", "Development"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-secondary/60 dark:text-light/60 bg-secondary/5 dark:bg-light/5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
}
