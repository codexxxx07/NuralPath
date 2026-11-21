import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Container } from "../../components/skeuo/Page";
import { MaterialTag } from "../../components/skeuo/Surfaces";
import { blogPosts } from "../../data/learningData";
import NotFoundPage from "../NotFoundPage";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (!post) return <NotFoundPage />;
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-20 h-0.5 w-full bg-transparent">
        <div className="h-full bg-[var(--color-brass)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <Container className="max-w-3xl py-8 sm:py-12">
        <Link to="/blogs" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> All articles
        </Link>

        <article className="paper mt-4 rounded-xl px-5 py-7 shadow-[var(--shadow-card)] sm:px-8 sm:py-9">
          <div className="flex flex-wrap items-center gap-2">
            <MaterialTag tone="brass">{post.category}</MaterialTag>
            <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" /> {post.readTime}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {new Date(post.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          <h1 className="mt-3 text-balance font-display text-3xl leading-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,var(--color-wood),transparent)]" />

          <div className="mt-6 space-y-6">
            {post.body.map((section) => (
              <section key={section.h}>
                <h2 className="font-display text-xl text-foreground">{section.h}</h2>
                <p className="mt-2 text-[15px] leading-8 text-foreground/85">{section.p}</p>
              </section>
            ))}
          </div>

          <p className="mt-8 border-t border-border pt-4 text-[11px] text-muted-foreground">
            Published on the NuralPath blog · Editorial piece, not vendor documentation.
          </p>
        </article>

        {related.length ? (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-foreground">Continue reading</h2>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} to={`/blogs/${r.slug}`} className="card-depth card-depth-hover p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{r.category}</p>
                  <p className="mt-1.5 font-display text-lg leading-tight text-foreground">{r.title}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
