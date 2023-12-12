import { db } from "@/lib/db";
import Issues from "./_components/issues";
import ProjectDetails from "./_components/project-details";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProjectViewPage({
  params,
}: {
  params: { slug: string };
}) {
  const projectId = params.slug;
  const project = await db.project.findFirst({
    where: {
      id: projectId,
    },
  });
  return (
    <>
      <div className="p-4">
        {project ? (
          <ProjectDetails project={project} />
        ) : (
          <div className="flex flex-col max-w-md mx-auto gap-y-4 pt-12">
            <p>Project not found</p>
            <Button asChild>
              <Link href="/projects">Back to Projects</Link>
            </Button>
          </div>
        )}
        {project && <Issues projectId={project.id} />}
      </div>
    </>
  );
}
