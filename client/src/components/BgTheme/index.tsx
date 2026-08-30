"use client";
import { asset } from "@/utils/asset";

const BgTheme = () => {

  return (
    <img
      className="fixed top-0 left-0 right-0 blur-lg bottom-0 -z-30 scale-110 w-full h-screen"
      src={asset("/images/bg10.jpg")}
      alt="Background"
    />
  );
};

export default BgTheme;
