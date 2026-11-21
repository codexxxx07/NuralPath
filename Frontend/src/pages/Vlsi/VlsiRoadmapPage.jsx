import Roadmap from "../../components/skeuo/Roadmap";
import { vlsiRoadmapStages } from "../../data/vlsiTopics";

export default function VlsiRoadmapPage() {
  return (
    <div className="min-h-screen">
      <Roadmap
        stages={vlsiRoadmapStages}
        trackKey="vlsi"
        title="VLSI Engineering Path"
        backLabel="VLSI roadmap"
        subtitle="A dependency-aware plan. Verification branches after RTL, while implementation continues through timing. Mark a stage when you can reason through its checks, not when you finish reading."
        backTo="/vlsi"
      />
    </div>
  );
}
