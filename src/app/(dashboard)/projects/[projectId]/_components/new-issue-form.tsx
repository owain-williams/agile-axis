"use client";

import { createIssue } from "@/actions/create/issue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hook";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  BookOpenText,
  Bug,
  Check,
  CheckSquare,
  ChevronsUpDown,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const epics = [
  {
    label: "Epic 1",
    value: "epic-1",
  },
  {
    label: "Epic 2",
    value: "epic-2",
  },
  {
    label: "Epic 3",
    value: "epic-3",
  },
  {
    label: "Epic 4",
    value: "epic-4",
  },
];

const formSchema = z.object({
  name: z.string(),
  issueType: z.optional(z.enum(["BUG", "TASK", "STORY"])),
  priority: z.optional(
    z
      .number()
      .gte(1, "Priority must be between 1 - 5")
      .lte(5, "Priority must be between 1 - 5")
  ),
  storyPoints: z.optional(
    z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().min(1)
    )
  ),
  assignedToId: z.optional(z.string()),
  epicId: z.optional(z.string()),
});

interface NewIssueFormProps {
  nextIssueNumber: number;
  projectId: string;
}

export default function NewIssueForm({
  nextIssueNumber,
  projectId,
}: NewIssueFormProps) {
  const { execute, status, result } = useAction(createIssue);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  // console.log(nextIssueNumber);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(`onSubmit executing with: ${JSON.stringify(values)}`);
    execute({
      name: values.name,
      issueNumber: nextIssueNumber,
      issueType: values.issueType,
      priority: values.priority,
      storyPoints: values.storyPoints,
      assignedToId: values.assignedToId,
      projectId: projectId,
      epicId: values.epicId,
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            New Issue
          </h2>
          {/* Issue Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Issue Name..."
                    disabled={status === "executing"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Issue Type */}
          <FormField
            control={form.control}
            name="issueType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Type</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Issue Type..."
                        disabled={status === "executing"}
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STORY">
                        <span className="flex flex-row gap-x-2 items-center">
                          <BookOpenText className="h-4 w-4" />
                          Story
                        </span>
                      </SelectItem>
                      <SelectItem value="BUG">
                        <span className="flex flex-row gap-x-2 items-center">
                          <Bug className="h-4 w-4" />
                          Bug
                        </span>
                      </SelectItem>
                      <SelectItem value="TASK">
                        <span className="flex flex-row gap-x-2 items-center">
                          <CheckSquare className="h-4 w-4" />
                          Task
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Priority */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={"3"}
                        placeholder="Medium"
                        disabled={status === "executing"}
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Critical</SelectItem>
                      <SelectItem value="2">High</SelectItem>
                      <SelectItem value="3">Medium</SelectItem>
                      <SelectItem value="4">Low</SelectItem>
                      <SelectItem value="5">Trivial</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Story Points */}
          <FormField
            control={form.control}
            name="storyPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Story Points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    disabled={status === "executing"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Assigned To */}
          <FormField
            control={form.control}
            name="assignedToId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned To</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="No One"
                        disabled={status === "executing"}
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {/* TODO: Get a list of people */}
                      <SelectItem value="STORY">Story</SelectItem>
                      <SelectItem value="BUG">Bug</SelectItem>
                      <SelectItem value="TASK">Task</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Epic Link */}
          <FormField
            control={form.control}
            name="epicId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* TODO: Get a list of epics */}
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                        {...field}
                      >
                        {value
                          ? epics.find((epic) => epic.value === value)?.label
                          : "Select Epic..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Epic..." />
                        <CommandEmpty>No Epic found.</CommandEmpty>
                        <CommandGroup>
                          {epics.map((epic) => (
                            <CommandItem
                              key={epic.value}
                              value={epic.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === epic.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {epic.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={status === "executing"} type="submit">
            Add Issue
          </Button>
          {status === "hasErrored" && (
            <div className="text-red-500">
              Something went wrong. Please try again.
              {result.fetchError}
              {result.validationError?._root}
              {result.serverError}
            </div>
          )}
          {status === "hasSucceeded" && (
            <div className="text-green-500">Issue created successfully!</div>
          )}
        </form>
      </Form>
    </>
  );
}
