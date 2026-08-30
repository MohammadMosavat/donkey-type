"use client";
import { useSearchParams } from "next/navigation";
import UserProfileCard from "@/components/UserProfile";

// The profile is addressed by a query param (`/yourhall?user=name`) rather than
// a dynamic segment so the app can be exported as static HTML for GitHub Pages.
const ProfileHeader = () => {
  const username = useSearchParams().get("user");

  return username ? <UserProfileCard username={username} /> : null;
};

export default ProfileHeader;
