"use server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { FolderKanban } from "lucide-react";
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
                    <FolderKanban className="w-8 h-8" />
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
                    <Button asChild>
                      <Link href={`/projects/${project.id}`}>View Project</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            : null}
        </div>
      </main>
    </>
  );
}
