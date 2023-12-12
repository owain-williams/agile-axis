import Link from "next/link";
import React from "react";
import { GanttChartSquare } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { auth } from "@clerk/nextjs";

export function LandingNav({}) {
  const { userId } = auth();
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center justify-center" href="#">
        <GanttChartSquare className="h-6 w-6" />
        <span className="ml-2 text-lg font-semibold">ProjectMaster</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        <Button asChild variant="ghost">
          <Link href="#">Features</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="#">Pricing</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="#">About</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="#">Contact</Link>
        </Button>
        {userId && (
          <Button asChild variant="default">
            <Link href="/projects">Dashboard</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
