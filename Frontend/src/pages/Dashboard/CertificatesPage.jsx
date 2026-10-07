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
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Your Certificates</h1>
        <p className="mt-1 text-sm text-muted-foreground">Certificates earned from completed courses</p>
      </div>

      {certificates.length === 0 ? (
        <div className="border-t border-border py-12 text-center">
          <p className="text-sm font-medium text-foreground">No Certificates Yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Complete your enrolled courses to earn certificates. Keep learning and you'll see them here!
          </p>
        </div>
      ) : (
        <div>
          {certificates.map((cert) => (
            <div key={cert.id} className="border-b border-border py-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-medium text-foreground">{cert.courseName}</p>
                    <Badge variant="success">{cert.grade}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">by {cert.instructor}</p>

                  <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{cert.completionDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Certificate ID</p>
                      <p className="mt-0.5 font-mono text-xs text-foreground">{cert.certificateId}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-xs text-muted-foreground">Skills Acquired</span>
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 gap-3">
                  <Button className="flex-1">Download</Button>
                  <Button variant="outline" className="flex-1">View</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
