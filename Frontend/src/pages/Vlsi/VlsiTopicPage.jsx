import TopicLayout from "../../components/skeuo/TopicLayout";
import CircuitDiagram from "../../components/skeuo/CircuitDiagram";
import { vlsiTopics } from "../../data/vlsiTopics";
import NotFoundPage from "../NotFoundPage";

export default function VlsiTopicPage({ slug }) {
  const index = vlsiTopics.findIndex((t) => t.slug === slug);
  if (index === -1) return <NotFoundPage />;

  const topic = vlsiTopics[index];
  const prev = index > 0 ? vlsiTopics[index - 1] : null;
  const next = index < vlsiTopics.length - 1 ? vlsiTopics[index + 1] : null;

  return (
    <TopicLayout
      topic={topic}
      kind="vlsi"
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "VLSI", to: "/vlsi" }, { label: topic.title }]}
      diagram={<CircuitDiagram type={topic.diagram} caption={topic.diagramCaption} />}
      prev={prev ? { to: `/vlsi/${prev.slug}`, label: prev.title } : null}
      next={next ? { to: `/vlsi/${next.slug}`, label: next.title } : null}
    />
  );
}
