"use client";

import { motion } from "framer-motion";
import NavLinks from "../NavLinks";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';

const Header = () => {
  useAuth();
  const { user } = useUser();
  const pathname = usePathname();

  // State to manage mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  const yourHallLink = useMemo(() => {
    const username = user[0]?.username;
    return user.length > 0 ? (
      <NavLinks
        onClick={closeMenu}
        className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === `/yourhall/${username}/sort` ? "!opacity-100 [&_*]:stroke-2" : ""
          }`}
        link={`/yourhall/${username}/sort?filter=newest`}
        value={"Yourhall"}
      />
    ) : (
      <NavLinks
        onClick={closeMenu}
        className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === `/register/signup` ? "!opacity-100 [&_*]:stroke-2" : ""
          }`}
        link={`/register/signup`}
        value={"Signup"}
      />
    );
  }, [user, pathname]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`terminal-header z-50 w-full fixed top-0 left-0 transition-all duration-300 backdrop-blur-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between`}
      >
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-0">
            <button
              className="md:hidden flex items-center justify-center p-2 text-current focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <CloseRoundedIcon className="text-primary" /> : <LunchDiningRoundedIcon className="text-primary" />}
            </button>

            <Link href={'/'} onClick={closeMenu}>
              <Image src="/svgs/logo/logo.svg" width={64} height={64} alt="Donkey Typing Logo" />
            </Link>
          </div>
        </div>

        <nav
          className={`${isOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0`}
        >
          <ul className={`flex flex-col md:flex-row justify-start gap-3 md:gap-4 w-full`}>
            <li className="w-full md:w-auto">
              <NavLinks
                onClick={closeMenu}
                className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === "/" ? "!opacity-100 [&_*]:stroke-2" : ""
                  }`}
                link="/"
                value={"Home"}
              />
            </li>
            <li className="w-full md:w-auto">
              <NavLinks
                onClick={closeMenu}
                className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === "/theme" ? "!opacity-100 [&_*]:stroke-2" : ""
                  }`}
                link="/theme"
                value={"Theme"}
              />
            </li>
            <li className="w-full md:w-auto">
              <NavLinks
                onClick={closeMenu}
                className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === "/settings" ? "!opacity-100 [&_*]:stroke-2" : ""
                  }`}
                link="/settings"
                value={"Settings"}
              />
            </li>
            <li className="w-full md:w-auto">
              <NavLinks
                onClick={closeMenu}
                className={`group max-md:px-0 terminal-nav-link w-full md:w-auto opacity-50 hover:opacity-100 bg-transparent ${pathname === "/about-us" ? "!opacity-100 [&_*]:stroke-2" : ""
                  }`}
                link="/about-us"
                value={"About Us"}
              />
            </li>
            <li className="w-full md:w-auto">{yourHallLink}</li>
          </ul>
        </nav>
      </motion.header>
    </>
  );
};

export default Header;