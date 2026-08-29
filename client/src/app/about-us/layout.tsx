import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Donkey Type — a minimal, open-source typing speed test. Meet the contributors and see what we're building toward.",
};

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AboutLayout;