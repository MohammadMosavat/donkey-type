"use client";
import FilterLinks from "@/components/FiltersLink";
import Loading from "@/components/loading";
import WpmRecords from "@/components/WpmRecord";
import { WpmRecord } from "@/types";
import backendApi from "@/api/backend";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Records = () => {
  const searchParams = useSearchParams();
  const [records, setRecords] = useState<WpmRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const username = searchParams.get("user");
  const currentFilter = searchParams.get("filter") || "newest";

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await backendApi.get("/records", {
          params: { username, sort: currentFilter },
        });
        setRecords(response.data);
      } catch (err) {
        console.log("Failed to fetch records.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [username, currentFilter]);

  return !loading ? (
    <main className="w-full flex flex-col gap-4 md:gap-6 px-4 md:px-0">
      <h1 className="text-lg md:text-xl font-JetBrainsMono text-primary my-4 md:my-8">
        WPM Records
      </h1>
      <ul className="flex items-center gap-2 flex-wrap">
        <FilterLinks isActive={currentFilter === "newest"} filter="newest" />
        <FilterLinks isActive={currentFilter === "oldest"} filter="oldest" />
        <FilterLinks
          isActive={currentFilter === "highest"}
          data-tooltip="Base on WPM"
          className="tooltip"
          filter="highest"
        />
        <FilterLinks
          isActive={currentFilter === "lowest"}
          data-tooltip="Base on WPM"
          className="tooltip"
          filter="lowest"
        />
      </ul>
      <WpmRecords records={records} />
    </main>
  ) : (
    <Loading />
  );
};

const MainPageProfile = () => (
  <Suspense fallback={<Loading />}>
    <Records />
  </Suspense>
);

export default MainPageProfile;
