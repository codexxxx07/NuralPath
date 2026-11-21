import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Container, PageHeader } from "../../components/skeuo/Page";
import { Input } from "../../components/ui/input";
import { MaterialTag } from "../../components/skeuo/Surfaces";
import { blogPosts } from "../../data/learningData";

export default function BlogsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];

  const posts = blogPosts.filter((p) => {
    const inCategory = category === "All" || p.category === category;
    const inQuery = !query || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(query.toLowerCase());
    return inCategory && inQuery;
  });

  return (
    <div className="min-h-screen">
      <Container className="py-8 sm:py-10">
        <PageHeader
          accent="wood"
          eyebrow="Blog"
          meta="Editorial"
          title="Notes from the desk."
          description="Essays about learning design, DSA practice and RTL habits. Written by the people building NuralPath, without inflated claims."
          breadcrumbs={[{ label: "Home", to: "/" }, { label: "Learn" }, { label: "Blog" }]}
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-[4px] border px-2.5 py-1 text-xs transition-colors ${
                  category === c
                    ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="h-9 sm:max-w-56"
          />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={`paper group flex flex-col rounded-xl shadow-[var(--shadow-card)] ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/70 px-5 py-2.5">
                <MaterialTag tone="brass">{post.category}</MaterialTag>
                <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {new Date(post.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <h2 className="mt-2 max-w-xl font-display text-2xl leading-tight text-foreground">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-xl flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <Link
                  to={`/blogs/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  Read article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {!posts.length ? (
          <p className="mt-8 rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            No articles match this search.
          </p>
        ) : null}
      </Container>
    </div>
  );
}
