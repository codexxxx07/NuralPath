import { motion } from "framer-motion";
import { Award, Download, Eye, Calendar, Hash } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CertificatesPage() {
  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Your Certificates</h1>
        <p className="text-sm text-muted-foreground mt-1">Certificates earned from completed courses</p>
      </motion.div>

      {certificates.length === 0 ? (
        <motion.div variants={item}>
          <Card>
            <CardContent className="py-12 text-center">
              <Award className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm font-medium text-foreground">No Certificates Yet</p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1">
                Complete your enrolled courses to earn certificates. Keep learning and you'll see them here!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div className="grid gap-6 md:grid-cols-2" variants={item}>
          {certificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden transition-colors hover:border-muted-foreground/40">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-foreground">{cert.courseName}</h3>
                      <p className="text-sm text-muted-foreground">by {cert.instructor}</p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-sm">{cert.grade}</Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="text-sm font-medium text-foreground">{cert.completionDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Certificate ID</p>
                      <p className="text-sm font-medium text-foreground font-mono text-xs">{cert.certificateId}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Skills Acquired</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
