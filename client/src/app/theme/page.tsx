import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme",
  description:
    "Customize the look of Donkey Type. Pick from a range of color themes to personalize your typing test experience.",
};

const Theme = () => {
  return <ThemeSwitcher />;
};

export default Theme;