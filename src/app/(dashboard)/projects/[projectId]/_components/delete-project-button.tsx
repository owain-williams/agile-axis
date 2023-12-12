"use client";

import { deleteProject } from "@/actions/delete/project";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hook";
import { useToast } from "@/components/ui/use-toast";

interface DeleteProjectButtonProps {
  projectId: string;
}

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const { execute, status } = useAction(deleteProject);
  const { toast } = useToast();
  function onSubmit() {
    execute({ id: projectId! });
  }
  return (
    <>
      <Button
        variant="destructive"
        disabled={status === "executing"}
        onClick={onSubmit}
      >
        Delete Project
      </Button>
      {status === "hasSucceeded" &&
        toast({
          title: "Success!",
          description: "Project Deleted",
        })}
    </>
  );
}
