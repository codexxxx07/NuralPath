import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";

const skills = [
  { name: "Linux", progress: 75, hours: 42, assessments: 8, level: "Intermediate" },
  { name: "Shell", progress: 60, hours: 28, assessments: 5, level: "Intermediate" },
  { name: "C", progress: 80, hours: 35, assessments: 7, level: "Advanced" },
  { name: "Git", progress: 55, hours: 12, assessments: 3, level: "Beginner" },
  { name: "Open Source", progress: 40, hours: 11, assessments: 2, level: "Beginner" },
];

const weakTopics = [
  { topic: "Shell Scripting: Arrays & Associative Arrays", skill: "Shell", severity: "medium" },
  { topic: "Linux Networking Commands", skill: "Linux", severity: "high" },
  { topic: "Git Rebasing & Cherry-picking", skill: "Git", severity: "medium" },
  { topic: "Open Source PR Etiquette", skill: "Open Source", severity: "low" },
];

const recommendations = [
  { title: "Practice Linux Networking", description: "Complete the networking module exercises to strengthen your understanding of netstat, ss, and iptables.", priority: "High" },
  { title: "Shell Arrays Workshop", description: "Attend the upcoming Shell Scripting lab focused on array manipulation and associative arrays.", priority: "Medium" },
  { title: "Git Advanced Commands", description: "Work through the Git rebase and cherry-pick exercises in the Practice Lab.", priority: "Medium" },
  { title: "Contribute to a Project", description: "Find a 'good first issue' on GitHub to improve your open source skills.", priority: "Low" },
];

const radarSize = 200;
const radarCenter = radarSize / 2;
const radarRadius = 80;

function getRadarPoint(index, total, value) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (value / 100) * radarRadius;
  return {
    x: radarCenter + r * Math.cos(angle),
    y: radarCenter + r * Math.sin(angle),
  };
}

export default function SkillReportPage() {
  const total = skills.length;
  const polygonPoints = skills
    .map((s, i) => getRadarPoint(i, total, s.progress))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Skill Report</h1>
        <p className="mt-1 text-sm text-muted-foreground">Comprehensive analysis of your technical skills</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
            Skill Overview
          </h2>
          <div className="flex justify-center py-5">
            <div className="relative">
              <svg width={radarSize} height={radarSize} viewBox={`0 0 ${radarSize} ${radarSize}`}>
                {[20, 40, 60, 80, 100].map((level) => {
                  const points = Array.from({ length: total }, (_, i) => {
                    const p = getRadarPoint(i, total, level);
                    return `${p.x},${p.y}`;
                  }).join(" ");
                  return (
                    <polygon
                      key={level}
                      points={points}
                      fill="none"
                      stroke="var(--color-border)"
                      strokeWidth="1"
                      opacity={0.5}
                    />
                  );
                })}
                {skills.map((_, i) => {
                  const p = getRadarPoint(i, total, 100);
                  return (
                    <line
                      key={i}
                      x1={radarCenter}
                      y1={radarCenter}
                      x2={p.x}
                      y2={p.y}
                      stroke="var(--color-border)"
                      strokeWidth="1"
                      opacity={0.3}
                    />
                  );
                })}
                <polygon
                  points={polygonPoints}
                  fill="var(--color-foreground)"
                  fillOpacity={0.08}
                  stroke="var(--color-foreground)"
                  strokeWidth={1.5}
                />
                {skills.map((skill, i) => {
                  const p = getRadarPoint(i, total, skill.progress);
                  return <circle key={i} cx={p.x} cy={p.y} r={3} fill="var(--color-foreground)" />;
                })}
                {skills.map((skill, i) => {
                  const labelPoint = getRadarPoint(i, total, 120);
                  return (
                    <text
                      key={i}
                      x={labelPoint.x}
                      y={labelPoint.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground text-xs font-medium"
                    >
                      {skill.name}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>
        </section>

        <section>
          <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
            Detailed Breakdown
          </h2>
          <div>
            {skills.map((skill) => (
              <div key={skill.name} className="border-b border-border py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <Badge variant="secondary" className="text-xs">{skill.level}</Badge>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="mt-2 h-1.5" />
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  <span>{skill.hours} hours</span>
                  <span>{skill.assessments} assessments</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
            Weak Topics
          </h2>
          <div>
            {weakTopics.map((topic, i) => (
              <div key={i} className="border-b border-border py-4">
                <p className="text-sm font-medium text-foreground">{topic.topic}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {topic.skill} · {topic.severity} priority
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
            Recommendations
          </h2>
          <div>
            {recommendations.map((rec, i) => (
              <div key={i} className="border-b border-border py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{rec.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{rec.description}</p>
                  </div>
                  <Badge
                    variant={
                      rec.priority === "High"
                        ? "success"
                        : rec.priority === "Medium"
                        ? "secondary"
                        : "outline"
                    }
                    className="shrink-0"
                  >
                    {rec.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
