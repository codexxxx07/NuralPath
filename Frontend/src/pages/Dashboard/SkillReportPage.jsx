import { motion } from "framer-motion";
import { Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { cn } from "../../lib/utils";

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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SkillReportPage() {
  const total = skills.length;
  const polygonPoints = skills
    .map((s, i) => getRadarPoint(i, total, s.progress))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Skill Report</h1>
        <p className="text-sm text-muted-foreground mt-1">Comprehensive analysis of your technical skills</p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Skill Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
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
                    fill="var(--color-primary)"
                    fillOpacity={0.2}
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                  />
                  {skills.map((skill, i) => {
                    const p = getRadarPoint(i, total, skill.progress);
                    return (
                      <circle key={i} cx={p.x} cy={p.y} r={4} fill="var(--color-primary)" />
                    );
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
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Detailed Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <Badge variant="secondary" className="text-xs">{skill.level}</Badge>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {skill.hours} hours</span>
                    <span className="flex items-center gap-1"><Award className="h-3 w-3" /> {skill.assessments} assessments</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Weak Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weakTopics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                    topic.severity === "high" && "bg-destructive",
                    topic.severity === "medium" && "bg-muted-foreground",
                    topic.severity === "low" && "bg-border"
                  )} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{topic.topic}</p>
                    <p className="text-xs text-muted-foreground">{topic.skill} · {topic.severity} priority</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="p-3 rounded-lg border border-border">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-foreground text-sm">{rec.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                    </div>
                    <Badge variant={rec.priority === "High" ? "destructive" : rec.priority === "Medium" ? "default" : "secondary"} className="text-xs flex-shrink-0">
                      {rec.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
