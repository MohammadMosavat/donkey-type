"use client";;
import { motion } from "framer-motion";
import NavLinks from "../NavLinks";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";
const Header = () => {
  useAuth();
  const { user } = useUser();
  const pathname = usePathname();

  const yourHallLink = useMemo(() => {
    const username = user[0]?.username;
    return user.length > 0 ? (
      <NavLinks
        onClick={() => close()}
        className={`group terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === `/yourhall/${username}/sort` ? "!opacity-100 [&_*]:stroke-2" : ""
          }`}
        link={`/yourhall/${username}/sort?filter=newest`}
        value={"Yourhall"}
      />
    ) : (
      <NavLinks
        onClick={() => close()}
        className={`group terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === `/register/signup` ? "!opacity-100 [&_*]:stroke-2" : ""
          }`}
        link={`/register/signup`}
        value={"Signup"}
      />
    );
  }, [user, pathname]);

  return (
    <>
      <motion.header
        initial={{
          opacity: 0,
          x: window?.innerWidth >= 768 ? -100 : 0,
          y: window?.innerWidth < 768 ? -100 : 0,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{ duration: 0.2 }}
        className={`terminal-header z-50 w-full flex fixed top-0 left-0 gap-4 items-center  justify-center md:justify-between transition-all duration-300 backdrop-blur-2xl p-4`}
      >
        <ul
          className={`flex justify-start gap-3 md:gap-8 w-full`}
        >
          <li className="w-full  md:w-auto">
            <NavLinks
              onClick={() => close()}
              className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === "/" ? "!opacity-100 [&_*]:stroke-2" : ""
                }`}
              link="/"
              value={"Home"}
            />
          </li>
          <li className="w-full md:w-auto">
            <NavLinks
              onClick={() => close()}
              className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === "/theme" ? "!opacity-100 [&_*]:stroke-2" : ""
                }`}
              link="/theme"
              value={"Theme"}
            />
          </li>
          <li className="w-full md:w-auto">
            <NavLinks
              onClick={() => close()}
              className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === "/settings" ? "!opacity-100 [&_*]:stroke-2" : ""
                }`}
              link="/settings"
              value={"Settings"}
            />
          </li>
          <li className="w-full md:w-auto">
            <NavLinks
              onClick={() => close()}
              className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === "/about-us" ? "!opacity-100 [&_*]:stroke-2" : ""
                }`}
              link="/about-us"
              value={"About Us"}
            />
          </li>
          <li className="w-full md:w-auto">{yourHallLink}</li>
        </ul>
      </motion.header>
    </>
  );
};

const Header2 = Header;
export default Header2;