import { auth, clerkClient } from "@clerk/nextjs";

export default function OrganizationChecker() {
  const { user } = auth();
  
  return <></>;
}
