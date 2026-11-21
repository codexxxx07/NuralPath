import TopicLayout from "../../components/skeuo/TopicLayout";
import DsaVisualizer from "../../components/skeuo/DsaVisualizer";
import { dsaTopics } from "../../data/dsaTopics";
import NotFoundPage from "../NotFoundPage";

export default function DsaTopicPage({ slug }) {
  const index = dsaTopics.findIndex((t) => t.slug === slug);
  if (index === -1) return <NotFoundPage />;

  const topic = dsaTopics[index];
  const prev = index > 0 ? dsaTopics[index - 1] : null;
  const next = index < dsaTopics.length - 1 ? dsaTopics[index + 1] : null;

  return (
    <TopicLayout
      topic={topic}
      kind="dsa"
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "DSA", to: "/dsa" }, { label: topic.title }]}
      visual={
        <DsaVisualizer
          kind={topic.visual.kind}
          algorithm={topic.visual.algorithm}
          caption={topic.visual.caption}
        />
      }
      prev={prev ? { to: `/dsa/${prev.slug}`, label: prev.title } : null}
      next={next ? { to: `/dsa/${next.slug}`, label: next.title } : null}
    />
  );
}
