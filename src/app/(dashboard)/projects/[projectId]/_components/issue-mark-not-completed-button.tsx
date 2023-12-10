"use client";

import { markIssueNotCompleted } from "@/actions/update/issue/mark-not-complete";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hook";

interface IssueMarkCompletedButtonProps {
  issueId: string;
  projectId: string;
}

export default function IssueMarkNotCompletedButton({
  issueId,
  projectId,
}: IssueMarkCompletedButtonProps) {
  const { execute, status } = useAction(markIssueNotCompleted);

  function handleClick() {
    execute({ projectId: projectId, issueId: issueId });
  }

  return (
    <>
      <Button
        className="px-4 py-2"
        variant="outline"
        onClick={handleClick}
        disabled={status === "executing"}
      >
        Mark Incomplete
      </Button>
    </>
  );
}
