import Roadmap from "../../components/skeuo/Roadmap";
import { dsaRoadmapStages } from "../../data/dsaTopics";

export default function DsaRoadmapPage() {
  return (
    <div className="min-h-screen">
      <Roadmap
        stages={dsaRoadmapStages}
        trackKey="dsa"
        title="Data Structures & Algorithms"
        backLabel="DSA roadmap"
        subtitle="A leather-bound plan, not a checklist. Each stage assumes the previous one; mark a stage only when you can explain its ideas without notes."
        backTo="/dsa"
      />
    </div>
  );
}
