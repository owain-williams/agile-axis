import { OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";

export default function TeamPage() {
  return (
    <div className="flex flex-col justify-center items-center pt-12 gap-y-12">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "100%",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%",
            },
          },
        }}
      />
    </div>
  );
}
