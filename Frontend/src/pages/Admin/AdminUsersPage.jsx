import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Ban,
  Trash2,
  X,
  Mail,
  Calendar,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";

const allUsers = [
  { id: 1, name: "Aarav Patel", email: "aarav.patel@email.com", role: "Student", status: "Active", joinDate: "Jan 15, 2026", initials: "AP", course: "Advanced React & Next.js", phone: "+91 98765 43210" },
  { id: 2, name: "Sneha Reddy", email: "sneha.r@email.com", role: "Student", status: "Active", joinDate: "Feb 3, 2026", initials: "SR", course: "Python for Data Science", phone: "+91 87654 32109" },
  { id: 3, name: "Rahul Sharma", email: "rahul.s@email.com", role: "Mentor", status: "Active", joinDate: "Dec 10, 2025", initials: "RS", course: "Linux Administration Pro", phone: "+91 76543 21098" },
  { id: 4, name: "Priya Mehta", email: "priya.m@email.com", role: "Student", status: "Inactive", joinDate: "Mar 22, 2026", initials: "PM", course: "Full Stack MERN Bootcamp", phone: "+91 65432 10987" },
  { id: 5, name: "Vikram Singh", email: "vikram.s@email.com", role: "Student", status: "Active", joinDate: "Apr 8, 2026", initials: "VS", course: "Advanced React & Next.js", phone: "+91 54321 09876" },
  { id: 6, name: "Neha Gupta", email: "neha.g@email.com", role: "Mentor", status: "Active", joinDate: "Nov 5, 2025", initials: "NG", course: "Python for Data Science", phone: "+91 43210 98765" },
  { id: 7, name: "Aditya Kumar", email: "aditya.k@email.com", role: "Admin", status: "Active", joinDate: "Oct 1, 2025", initials: "AK", course: "N/A", phone: "+91 32109 87654" },
  { id: 8, name: "Ananya Joshi", email: "ananya.j@email.com", role: "Student", status: "Suspended", joinDate: "May 14, 2026", initials: "AJ", course: "DevOps Bootcamp", phone: "+91 21098 76543" },
  { id: 9, name: "Karthik Nair", email: "karthik.n@email.com", role: "Student", status: "Active", joinDate: "Jun 1, 2026", initials: "KN", course: "Linux Administration Pro", phone: "+91 10987 65432" },
  { id: 10, name: "Rohan Verma", email: "rohan.v@email.com", role: "Mentor", status: "Active", joinDate: "Jan 20, 2026", initials: "RV", course: "Full Stack MERN Bootcamp", phone: "+91 09876 54321" },
  { id: 11, name: "Isha Singhania", email: "isha.s@email.com", role: "Student", status: "Active", joinDate: "Jul 12, 2026", initials: "IS", course: "Python for Data Science", phone: "+91 98712 34567" },
  { id: 12, name: "Deepak Rao", email: "deepak.r@email.com", role: "Student", status: "Inactive", joinDate: "Aug 5, 2026", initials: "DR", course: "DevOps Bootcamp", phone: "+91 87612 34568" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const perPage = 6;

  const filtered = allUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || u.role === filter;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">{allUsers.length} registered users</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => { setFilter(v); setPage(1); }}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Student">Students</TabsTrigger>
            <TabsTrigger value="Mentor">Mentors</TabsTrigger>
            <TabsTrigger value="Admin">Admins</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <motion.div variants={item} className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Join Date</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.role === "Admin" ? "default" : user.role === "Mentor" ? "secondary" : "outline"}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.status === "Active" ? "success" : user.status === "Suspended" ? "destructive" : "secondary"}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{user.joinDate}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Ban className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="md:hidden space-y-3">
        {paginated.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Badge variant={user.status === "Active" ? "success" : user.status === "Suspended" ? "destructive" : "secondary"}>
                  {user.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Badge variant={user.role === "Admin" ? "default" : user.role === "Mentor" ? "secondary" : "outline"}>
                    {user.role}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{user.joinDate}</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedUser(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Ban className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {totalPages > 1 && (
        <motion.div variants={item} className="flex items-center justify-center gap-4">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedUser(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">User Details</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedUser(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg">{selectedUser.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">{selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Role:</span>
                <span className="font-medium text-foreground">{selectedUser.role}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined:</span>
                <span className="font-medium text-foreground">{selectedUser.joinDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={selectedUser.status === "Active" ? "success" : selectedUser.status === "Suspended" ? "destructive" : "secondary"}>
                  {selectedUser.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Course:</span>
                <span className="font-medium text-foreground">{selectedUser.course}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex gap-2">
              <Button className="flex-1">Edit User</Button>
              <Button variant="outline" className="flex-1">Send Email</Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
