import TopNavContent from "./topnav-content";
import { auth } from "@clerk/nextjs";

export default async function TopNav() {
  const { userId } = auth();

  return (
    <>
      <TopNavContent />
    </>
  );
}
