import { ReactNode, Suspense } from "react";
import type { Metadata } from "next";
import ProfileHeader from "@/components/ProfileHeader";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your profile, typing records and performance history.",
};

export default function UserPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full gap-10 mx-auto flex-col items-center">
      <Suspense fallback={null}>
        <ProfileHeader />
      </Suspense>
      {children}
    </div>
  );
}
