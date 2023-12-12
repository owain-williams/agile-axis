"use client";
// import { config } from "../../../personalisation";
import { Suspense } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { GanttChartSquare, Menu, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type NavItem = {
  title: string;
  href?: string;
  isSelected?: boolean;
  canAccess: string[];
  description?: string;
  subItems?: NavItem[];
};

type TopNavContentProps = {};

export default function TopNavContent(props: TopNavContentProps) {
  // const { orgName } = config;

  const pathName = usePathname();

  const navs: NavItem[] = [
    {
      title: "Projects",
      href: "/projects",
      isSelected: pathName.startsWith("/projects"),
      canAccess: ["ADMIN", "STAFF", "USER"],
    },

    // subItems: [
    //   {
    //     title: "New",
    //     href: "/dashboard/bookings/new",
    //     isSelected: pathName === "/dashboard/bookings/new",
    //     canAccess: ["admin", "staff", "user"],
    //     description: "Create a new booking",
    //   },
    //   {
    //     title: "Manage",
    //     href: "/dashboard/bookings/manage",
    //     isSelected: pathName === "/bookings/manage",
    //     canAccess: ["admin", "staff", "user"],
    //     description: "Manage your existing bookings",
    //   },
    // ],

    {
      title: "Team",
      href: "/team",
      isSelected: pathName.startsWith("/team"),
      canAccess: ["ADMIN", "STAFF", "USER"],
      // subItems: [
      //   {
      //     title: "Register",
      //     href: "/dashboard/dogs/new",
      //     isSelected: pathName === "/dogs/new",
      //     canAccess: ["admin", "staff", "user"],
      //     description: "Register your dog with us",
      //   },
      //   {
      //     title: "Manage",
      //     href: "/dashboard/dogs/manage",
      //     isSelected: pathName === "/dogs/manage",
      //     canAccess: ["admin", "staff", "user"],
      //     description: "Manage your dog's information",
      //   },
      // ],
    },
    {
      title: "Reports",
      href: "/reports",
      isSelected: pathName.startsWith("/reports"),
      canAccess: ["ADMIN", "STAFF", "USER"],
    },
  ];

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b shadow-lg">
        <div className="flex items-center">
          <GanttChartSquare className="ml-6 w-8 h-8" />
          <h3 className="scroll-m-20 pl-4 text-2xl font-semibold tracking-tight">
            ProjectMaster
          </h3>
          <NavigationMenu className="hidden pl-8 md:inline">
            <NavigationMenuList>
              {navs.map((nav) => (
                <div key={nav.title}>
                  {/* Parent with no children */}
                  {!nav.subItems && (
                    <NavigationMenuItem key={nav.title}>
                      <Link href={nav.href!} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {nav.title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )}
                  {/* Parent with children */}
                  {nav.subItems && (
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>{nav.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                          {nav.subItems.map((subNav) => (
                            <ListItem
                              key={subNav.title}
                              title={subNav.title}
                              href={subNav.href}
                            >
                              {subNav.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )}
                </div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4 pr-4">
          {/* <ModeToggle /> */}
          {/* <Button onClick={handleCheckout}>
            <Wallet className="mr-2" />
            {`${props.balance} `}
            <span className="hidden md:inline">&nbsp;credits</span>
          </Button> */}
          <SignedIn>
            <OrganizationSwitcher
              hidePersonal
              afterCreateOrganizationUrl="/projects"
              afterLeaveOrganizationUrl="/select-org"
              afterSelectOrganizationUrl="/projects"
              appearance={{
                elements: {
                  rootBox: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                },
              }}
            />
            {/* <UserButton /> */}
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <Sheet>
            <SheetTrigger>
              <Menu className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background p-1 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:hidden" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 pt-6">
                {navs.map((nav) => (
                  <div className="flex flex-col py-2" key={nav.title}>
                    {!nav.subItems && (
                      <Button className="py-8" variant={"secondary"}>
                        {nav.title}
                      </Button>
                    )}
                    {nav.subItems && (
                      <div>
                        <h4 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight">
                          {nav.title}
                        </h4>

                        <div className="flex flex-col gap-4">
                          {nav.subItems.map((subNav) => (
                            <Button
                              asChild
                              className="py-8"
                              key={subNav.title}
                              variant={"secondary"}
                            >
                              <Link href={subNav.href!}>{subNav.title}</Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  {/* <ModeToggle /> */}
                  {/* <Suspense fallback={<Skeleton className="h-8 w-10" />}>
                    <Button onClick={handleCheckout}>
                      <Wallet className="mr-2" />
                      {`${props.balance} `}
                      <span className="hidden md:inline">&nbsp;credits</span>
                    </Button>
                  </Suspense> */}
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
