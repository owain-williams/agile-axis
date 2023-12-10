"use client";

import { markIssueCompleted } from "@/actions/update/issue/mark-complete";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hook";

interface IssueMarkCompletedButtonProps {
  issueId: string;
  projectId: string;
}

export default function IssueMarkCompletedButton({
  issueId,
  projectId,
}: IssueMarkCompletedButtonProps) {
  const { execute, status } = useAction(markIssueCompleted);

  function handleClick() {
    execute({ projectId: projectId, issueId: issueId });
  }

  return (
    <>
      <Button
        className="px-4 py-2"
        variant="secondary"
        onClick={handleClick}
        disabled={status === "executing"}
      >
        Mark Completed
      </Button>
    </>
  );
}
