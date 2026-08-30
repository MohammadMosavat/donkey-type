"use client";
import FilterLinks from "@/components/FiltersLink";
import Loading from "@/components/loading";
import WpmRecords from "@/components/WpmRecord";
import { WpmRecord } from "@/types";
import backendApi from "@/api/backend";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const SortedRecords = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("user");
  const filter = searchParams.get("filter");
  const [records, setRecords] = useState<WpmRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await backendApi.get("/records", {
          params: { username, sort: filter ?? "newest" },
        });
        setRecords(response.data);

      } catch (err) {
        console.log("Failed to fetch records.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [username, filter]);
  return !loading ? (
    <main className="w-full flex flex-col gap-4 md:gap-10 px-4 md:px-0">
      <h1 className="text-base sm:text-lg md:text-xl capitalize font-JetBrainsMono text-primary">
        {filter} WPM Records
      </h1>
      <div className="flex items-center gap-4">
        <ul className="flex flex-wrap items-center gap-2 md:gap-3">
          <FilterLinks
            data-tooltip="Base on Date"
            className="tooltip text-xs sm:text-sm md:text-base"
            isActive={filter === "newest"}
            filter="newest"
          />
          <FilterLinks
            data-tooltip="Base on Date"
            className="tooltip text-xs sm:text-sm md:text-base"
            isActive={filter === "oldest"}
            filter="oldest"
          />
          <FilterLinks
            isActive={filter === "highest"}
            data-tooltip="Base on WPM"
            className="tooltip text-xs sm:text-sm md:text-base"
            filter="highest"
          />
          <FilterLinks
            isActive={filter === "lowest"}
            data-tooltip="Base on WPM"
            className="tooltip text-xs sm:text-sm md:text-base"
            filter="lowest"
          />
        </ul>
      </div>
      <WpmRecords records={records} />

    </main>
  ) : (
    <Loading />
  );
};

const FilterRecordPage = () => (
  <Suspense fallback={<Loading />}>
    <SortedRecords />
  </Suspense>
);

export default FilterRecordPage;
