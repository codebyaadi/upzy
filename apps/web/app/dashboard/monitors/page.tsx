"use client";

import { Button } from "@upzy/ui/components/button";
import { Input } from "@upzy/ui/components/input";
import { useId } from "react";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import MonitorTable from "./_components/monitor-table";

export default function Monitors() {
  const router = useRouter();

  const sampleData = [
    {
      name: "Website - Homepage",
      status: "up",
      uptime: "99.98%",
      lastChecked: "Just now",
      region: "US-East",
    },
    {
      name: "API Gateway",
      status: "degraded",
      uptime: "96.21%",
      lastChecked: "2 mins ago",
      region: "Europe-West",
    },
    {
      name: "Background Jobs",
      status: "maintenance",
      uptime: "Scheduled",
      lastChecked: "5 mins ago",
      region: "Asia-Pacific",
    },
    {
      name: "Database Connection",
      status: "down",
      uptime: "95.22%",
      lastChecked: "5 mins ago",
      region: "Asia-Pacific",
    },
  ];

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-outfit">Monitors</h1>
          </div>
          <div className="flex justify-center gap-3">
            <div className="relative">
              <Input
                placeholder="Search..."
                type="search"
                className="peer h-8 ps-9 pe-9 text-xs"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
                <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                  ⌘K
                </kbd>
              </div>
            </div>
            <Button
              onClick={() => router.push("/dashboard/monitors/new")}
              size="sm"
              className="cursor-pointer text-xs"
            >
              Create Monitor
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border">
          <MonitorTable data={sampleData} />
        </div>
      </div>
    </div>
  );
}
