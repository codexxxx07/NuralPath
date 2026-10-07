import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const certificates = [
  {
    id: 1,
    courseName: "Linux Fundamentals",
    completionDate: "July 28, 2026",
    certificateId: "NP-LNX-2026-00142",
    instructor: "Rahul Sharma",
    grade: "A",
    skills: ["Linux", "File System", "Permissions", "Process Management"],
  },
  {
    id: 2,
    courseName: "Shell Scripting Basics",
    completionDate: "June 15, 2026",
    certificateId: "NP-SHL-2026-00089",
    instructor: "Priya Mehta",
    grade: "A+",
    skills: ["Bash", "Scripting", "Automation", "Text Processing"],
  },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Your Certificates</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Certificates earned from completed courses</p>
      </div>

      {certificates.length === 0 ? (
        <div className="py-16 text-center">
          <Award className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-4 text-sm font-medium text-foreground">No certificates yet</p>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
            Complete a course to earn your first certificate.
          </p>
          <Button variant="outline" asChild className="mt-5">
            <Link to="/courses">Explore Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {certificates.map((cert) => (
            <article
              key={cert.id}
              className="card-depth card-depth-hover flex flex-col p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base font-medium text-foreground">{cert.courseName}</p>
                  <p className="mt-1 text-xs text-muted-foreground">by {cert.instructor}</p>
                </div>
                <Badge variant="success" className="shrink-0">{cert.grade}</Badge>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Completed
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {cert.completionDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Certificate ID
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-foreground">
                    {cert.certificateId}
                  </dd>
                </div>
              </dl>

              <div className="mb-5 mt-4 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Skills Acquired
                </span>
                {cert.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
              </div>

              <div className="mt-auto flex gap-3 border-t border-border pt-4">
                <Button className="flex-1">Download</Button>
                <Button variant="outline" className="flex-1">View</Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
