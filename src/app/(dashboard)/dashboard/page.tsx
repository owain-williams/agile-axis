import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { UserButton, auth } from "@clerk/nextjs";
import { GanttChartSquare, ProjectorIcon } from "lucide-react";
import Link from "next/link";
import AddProject from "./_components/add-project";

export default async function Dashboard() {
  const { userId } = auth();
  const projects = await db.project.findMany({
    where: {
      userId: userId,
    },
    include: {
      Issues: true,
    },
  });

  return (
    <>
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
          href="#"
        >
          <GanttChartSquare className="w-6 h-6" />
          <span className="sr-only">Project Management</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link className="font-bold" href="#">
            Dashboard
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Projects
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Tasks
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Team
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Reports
          </Link>
        </nav>
        <UserButton />
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4"></div>
      </header>
      <main className="flex flex-col min-h-[calc(100vh - theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <AddProject />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          My Projects
        </h2>
        {projects.length < 1 ? (
          <p>
            You have no projects. Add your first project using the form above.
          </p>
        ) : null}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
          {projects.length > 0
            ? projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <ProjectorIcon className="w-8 h-8" />
                    <div className="grid gap-1">
                      <CardTitle>{project.shortcode.toUpperCase()}</CardTitle>
                      <CardDescription>{project.name}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    {project.Issues.reduce((acc, curr) => {
                      return curr.completed ? acc + 1 : acc;
                    }, 0)}
                    /{project.Issues.length} Issues Completed
                    <div className="text-sm font-semibold">
                      <Badge color="green">{project.status}</Badge>
                    </div>
                    {/* <BarChart className="w-full h-[300px]" /> */}
                  </CardContent>
                </Card>
              ))
            : null}
        </div>
      </main>
    </>
  );
}
