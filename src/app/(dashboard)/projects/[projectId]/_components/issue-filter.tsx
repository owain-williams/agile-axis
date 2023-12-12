"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { parseAsBoolean, useQueryState } from "next-usequerystate";

export default function IssueFilter() {
  const [filterCompleted, setFilterCompleted] = useQueryState(
    "filterCompleted",
    parseAsBoolean
  );
  return (
    <>
      Filter Completed?
      <Checkbox
        className="w-6 h-6"
        checked={filterCompleted as CheckedState}
        onClick={() =>
          setFilterCompleted(filterCompleted === true ? false : true)
        }
      />
    </>
  );
}
