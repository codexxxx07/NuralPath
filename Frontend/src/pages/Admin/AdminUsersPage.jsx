import { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  Ban,
  Trash2,
  X,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";

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
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">User Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">{allUsers.length} registered users</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
      </div>

      {paginated.length === 0 ? (
        <div className="card-depth py-16 text-center">
          <Search className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">No users found</p>
          <p className="mt-1 text-sm text-muted-foreground">No users match your current search or filter.</p>
          <Button
            variant="outline"
            className="mt-5"
            onClick={() => { setSearch(""); setFilter("All"); setPage(1); }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <>
      <div className="card-depth hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr>
              <th className="whitespace-nowrap border-b border-border px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">User</th>
              <th className="whitespace-nowrap border-b border-border px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Role</th>
              <th className="whitespace-nowrap border-b border-border px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="whitespace-nowrap border-b border-border px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Join Date</th>
              <th className="whitespace-nowrap border-b border-border px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((user) => (
              <tr key={user.id} className="table-row border-b border-border last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={user.role === "Admin" ? "default" : user.role === "Mentor" ? "secondary" : "outline"}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={user.status === "Active" ? "success" : user.status === "Suspended" ? "secondary" : "outline"}>
                    {user.status}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-muted-foreground">{user.joinDate}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button type="button" className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground" aria-label={`Edit ${user.name}`} title="Edit user" onClick={() => setSelectedUser(user)}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button type="button" className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground" aria-label={`Suspend ${user.name}`} title="Suspend user">
                      <Ban className="h-4 w-4" />
                    </button>
                    <button type="button" className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-destructive" aria-label={`Delete ${user.name}`} title="Delete user">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {paginated.map((user) => (
          <div key={user.id} className="border-b border-border py-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Badge variant={user.status === "Active" ? "success" : user.status === "Suspended" ? "secondary" : "outline"}>
                {user.status}
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Badge variant={user.role === "Admin" ? "default" : user.role === "Mentor" ? "secondary" : "outline"}>
                  {user.role}
                </Badge>
                <span className="truncate text-xs text-muted-foreground">{user.joinDate}</span>
              </div>
              <div className="flex shrink-0 gap-1">
                <button type="button" className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground" aria-label={`Edit ${user.name}`} title="Edit user" onClick={() => setSelectedUser(user)}>
                  <Edit className="h-4 w-4" />
                </button>
                <button type="button" className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground" aria-label={`Suspend ${user.name}`} title="Suspend user">
                  <Ban className="h-4 w-4" />
                </button>
                <button type="button" className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-destructive" aria-label={`Delete ${user.name}`} title="Delete user">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        </>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/50 p-4" onClick={() => setSelectedUser(null)}>
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-pop animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold tracking-tight text-foreground">User Details</h2>
              <button type="button" className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground" aria-label="Close dialog" title="Close" onClick={() => setSelectedUser(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-6 flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg">{selectedUser.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">{selectedUser.name}</h3>
                <p className="truncate text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium text-foreground">{selectedUser.role}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="truncate font-medium text-foreground">{selectedUser.email}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Joined</span>
                <span className="font-medium text-foreground">{selectedUser.joinDate}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={selectedUser.status === "Active" ? "success" : selectedUser.status === "Suspended" ? "secondary" : "outline"}>
                  {selectedUser.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Course</span>
                <span className="truncate font-medium text-foreground">{selectedUser.course}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex gap-2">
              <Button className="flex-1">Edit User</Button>
              <Button variant="outline" className="flex-1">Send Email</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
