import UserProfileCard from "@/components/UserProfile";
import { ReactNode } from "react";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
  children: ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.id} | Profile`,
    description: `View the profile and details for ${params.id}.`,
  };
}

export default function UserPage({ children, params }: Props) {
  return (
    <div className="flex w-full gap-10 mx-auto flex-col items-center">
      <UserProfileCard username={params.id} />
      {children}
    </div>
  );
}