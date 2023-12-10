import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@prisma/client";
import { CheckSquare, Square } from "lucide-react";
import DeleteProjectButton from "./delete-project-button";

interface ProjectDetailsProps {
  project: Project | null;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            {project?.shortcode} - {project?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4">
            <strong>Name:</strong>
            <p>{project?.name}</p>
          </div>
          <div className="flex flex-row gap-4">
            <strong>Shortcode:</strong>
            <p>{project?.shortcode}</p>
          </div>
          <div className="flex flex-row gap-4">
            <strong>Status:</strong>
            <p>{project?.status}</p>
          </div>
          <div className="flex flex-row gap-4">
            <strong>Deadline:</strong>
            <p>{project?.deadline?.toLocaleDateString()}</p>
          </div>
          <div className="flex flex-row gap-4">
            <strong>Completed:</strong>
            <p>{project?.completed ? <CheckSquare /> : <Square />}</p>
          </div>
        </CardContent>
        <CardFooter>
          {project && <DeleteProjectButton projectId={project.id} />}
        </CardFooter>
      </Card>
    </>
  );
}
