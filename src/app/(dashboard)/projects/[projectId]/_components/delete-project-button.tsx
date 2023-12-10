"use client";

import { deleteProject } from "@/actions/delete/project";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hook";

interface DeleteProjectButtonProps {
  projectId: string;
}

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const { execute, status } = useAction(deleteProject);
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
    </>
  );
}
