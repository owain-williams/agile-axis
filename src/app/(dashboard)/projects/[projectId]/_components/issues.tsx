"use server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Issue } from "@prisma/client";
import NewIssueForm from "./new-issue-form";
import { db } from "@/lib/db";
import IssueCard from "./issue-card";

interface IssuesProps {
  projectId: string;
}

function getNextIssueNumber(issues: Issue[]) {
  const issueNumbers = issues.map((issue) => issue.issueNumber);
  !issueNumbers.length && issueNumbers.push(0);
  const maxIssueNumber = Math.max(...issueNumbers);
  return maxIssueNumber + 1;
}

export default async function Issues({ projectId }: IssuesProps) {
  const issues = await db.issue.findMany({
    where: {
      projectId,
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
          <CardDescription>View and manage project issues.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row">
          {issues.map((issue) => (
            <IssueCard
              className="basis-1/4"
              projectId={projectId}
              key={issue.id}
              issue={issue}
            />
          ))}
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger>
              <Button>+ New Issue</Button>
            </DialogTrigger>
            <DialogContent>
              <NewIssueForm
                projectId={projectId}
                nextIssueNumber={getNextIssueNumber(issues)}
              />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
}
