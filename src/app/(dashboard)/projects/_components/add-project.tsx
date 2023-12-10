"use client";

import { createProject } from "@/actions/create/project";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hook";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  shortCode: z
    .string()
    .min(3, { message: "Short code must be 3-4 characters." })
    .max(4, { message: "Short code must be 3-4 characters." })
    .refine((value) => value === value.toUpperCase(), {
      message: "Short code must be uppercase.",
    }),
});

export default function AddProject() {
  const { execute, status } = useAction(createProject);
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(`onSubmit executing with: ${values}`);
    execute({
      name: values.name,
      shortCode: values.shortCode,
      userId: userId as string,
    });
  }

  return (
    <>
      <div className="max-w-6xl w-full mx-auto flex items-center gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            // onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-8"
          >
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              New Project
            </h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Project Name..."
                      disabled={status === "executing"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your project&apos;s full display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Shortcode</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Project Shortcode..."
                      disabled={status === "executing"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your 3-4 character project shortcode.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className=""
              disabled={status === "executing"}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
