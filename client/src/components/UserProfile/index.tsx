"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../loading";
import UserProfileCardProps from "@/types";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/navigation";
import Button from "../MainButton";
import backendApi from "@/api/backend";
import Cookies from "js-cookie";

export default function UserProfileCard({ username }: { username: string }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserProfileCardProps>();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.className =
      localStorage.getItem("theme") ?? "theme-indigo-emerald";

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await backendApi.get("/users", {
          params: { username },
        });
        setData(response.data[0]);
      } catch (error) {
        toast.error("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("username");
    toast.success("Logged out successfully");
    router.push("/register/login");
    router.refresh();
  };

  return (
    data && (
      <>
        {!loading ? (
          <div className="flex w-full flex-col md:flex-row items-start md:items-center gap-4 md:justify-between">
            <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center">
              <h2 className="text-base sm:text-lg md:text-xl font-JetBrainsMono text-primary break-all">
                @{data.username}
              </h2>
              <p className="text-xs md:text-sm font-JetBrainsMono text-primary break-all">
                {data.email}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-8 w-full md:w-auto">
              <section
                data-tooltip="Location"
                className="!flex font-JetBrainsMono items-center tooltip gap-2"
              >
                <ReactSVG
                  src="/svgs/location.svg"
                  className="[&>div>svg]:size-5  [&>div>svg]:md:size-6 [&_*]:stroke-primary"
                />
                <p className="text-xs sm:text-sm md:text-base font-JetBrainsMono capitalize text-primary">
                  {data.location}
                </p>
              </section>
              <section
                data-tooltip="joined At"
                className="!flex font-JetBrainsMono items-center gap-2 tooltip"
              >
                <ReactSVG
                  src="/svgs/calendar.svg"
                  className="[&>div>svg]:size-5  [&>div>svg]:md:size-6 [&_*]:stroke-primary"
                />
                <p className="text-xs sm:text-sm md:text-base font-JetBrainsMono text-primary">
                  {new Date(data.joinedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </section>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-primary w-full sm:w-auto"
              >
                Log Out
              </Button>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </>
    )
  );
}