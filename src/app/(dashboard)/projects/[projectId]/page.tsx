import { db } from "@/lib/db";
import Issues from "./_components/issues";
import ProjectDetails from "./_components/project-details";

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
        <ProjectDetails project={project} />
        {project && <Issues projectId={project.id} />}
      </div>
    </>
  );
}
