import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Issue } from "@prisma/client";
import { cn } from "@/lib/utils";
import IssueMarkCompletedButton from "./issue-mark-completed-button";
import IssueMarkNotCompletedButton from "./issue-mark-not-completed-button";

interface IssueCardProps {
  issue: Issue;
  className?: string;
  projectId: string;
}

export default function IssueCard({
  issue,
  className,
  projectId,
}: IssueCardProps) {
  return (
    <Card className={cn(className, "bg-white shadow-md rounded-lg m-4 p-6")}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{issue.name}</CardTitle>
          <Badge className="text-xs font-semibold bg-green-500 text-white px-2 py-1 rounded-md">
            {issue.issueNumber}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-500 mt-2">
          {issue.issueType}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm mt-4">
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold">Completed?</label>
          <Checkbox
            className="form-checkbox h-5 w-5 text-green-500"
            checked={issue.completed}
            contentEditable={false}
            id="completed"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold">Priority</label>
          <Badge
            className={cn(
              "text-xs font-semibold bg-red-500 text-white px-2 py-1 rounded-md",
              issue.priority === 5 && "bg-green-500",
              issue.priority === 4 && "bg-lime-500",
              issue.priority === 3 && "bg-yellow-500",
              issue.priority === 2 && "bg-orange-500",
              issue.priority === 1 && "bg-red-500"
            )}
          >
            {issue.priority}
          </Badge>
        </div>
        <div className={"flex justify-between items-center mb-2"}>
          <label className="font-semibold">Story Points</label>
          <p>{issue.storyPoints ? issue.storyPoints : "-"}</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold">Assigned to</label>
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=24&width=24" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <p className="ml-2">John Doe</p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold">Epic Link</label>
          {issue.epicId ? issue.epicId : "-"}
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold">Created At</label>
          <p>{issue.createdAt.toISOString()}</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold">Updated At</label>
          <p>{issue.updatedAt.toISOString()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        {!issue.completed ? (
          <IssueMarkCompletedButton projectId={projectId} issueId={issue.id} />
        ) : (
          <IssueMarkNotCompletedButton
            projectId={projectId}
            issueId={issue.id}
          />
        )}
        <Button className="px-4 py-2" variant="default">
          Edit Issue
        </Button>
      </CardFooter>
    </Card>
  );
}
