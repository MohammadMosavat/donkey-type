import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Customize your Donkey Type experience — adjust behavior, sound, and appearance settings to fit how you like to type.",
};

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return <ul className="flex flex-col mb-20 gap-10 w-full">{children}</ul>;
};

export default SettingsLayout;