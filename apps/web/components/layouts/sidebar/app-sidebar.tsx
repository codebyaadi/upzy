// app-sidebar.tsx
"use client";

import * as React from "react";
import {
  Activity, // For Incidents/Activity Log
  AlertTriangle, // For On-Call/Alerts
  Bug, // For Vulnerabilities/Findings
  Boxes, // For Integrations
  Database, // For Assets/Targets
  FolderOpen, // For Asset Groups/Scan Profiles
  LayoutDashboard, // For Dashboard
  Monitor, // For Uptime Monitors
  ScrollText, // For Status Pages
  SearchCode, // For Scans/Security Tools
  Settings2,
  Users,
  ShieldCheck, // For Team Management
} from "lucide-react";

import { NavMain } from "@/components/layouts/sidebar/nav-main";
import { NavProjects } from "@/components/layouts/sidebar/nav-projects"; // Renaming conceptually to NavGroups
import { NavUser } from "@/components/layouts/sidebar/nav-user";
import { TeamSwitcher } from "@/components/layouts/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@upzy/ui/components/sidebar";
import { authClient } from "@upzy/auth/client";
import { useRouter } from "next/navigation";

// Updated data for a combined SecOps & Monitoring Platform
const data = {
  user: {
    name: "Alex Johnson",
    email: "alex.j@acme.com",
    avatar: "/avatars/alex-johnson.jpg", // Replace with actual path
  },
  teams: [
    {
      name: "Acme SecOps",
      logo: ShieldCheck, // New icon for a security-focused team (assuming ShieldCheck is available)
      plan: "Enterprise",
    },
    {
      name: "Infra Monitoring",
      logo: Monitor,
      plan: "Pro",
    },
    {
      name: "Bug Bounty Hunters",
      logo: Bug,
      plan: "Community",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#/dashboard", // Example URL
      icon: LayoutDashboard,
      isActive: true,
      items: [], // Direct links for main navigation
    },
    {
      title: "Uptime Monitors",
      url: "#/monitors",
      icon: Monitor,
      items: [],
    },
    {
      title: "Security Scans",
      url: "#/scans",
      icon: SearchCode, // Icon for security scanning
      items: [
        { title: "Nuclei Scans", url: "#/scans/nuclei" },
        { title: "Subfinder", url: "#/scans/subfinder" },
        { title: "HTTPX", url: "#/scans/httpx" },
      ],
    },
    {
      title: "Vulnerabilities",
      url: "#/vulnerabilities",
      icon: Bug, // Icon for vulnerabilities
      items: [],
    },
    {
      title: "Assets & Targets",
      url: "#/assets",
      icon: Database, // Icon for assets/targets
      items: [
        { title: "Discovered Assets", url: "#/assets/discovered" },
        { title: "Asset Inventory", url: "#/assets/inventory" },
      ],
    },
    {
      title: "On-Call & Incidents",
      url: "#/incidents",
      icon: AlertTriangle, // More explicit for alerts
      items: [
        { title: "Active Incidents", url: "#/incidents/active" },
        { title: "Incident History", url: "#/incidents/history" },
        { title: "On-Call Schedules", url: "#/incidents/schedules" },
      ],
    },
    {
      title: "Status Pages",
      url: "#/status-pages",
      icon: ScrollText,
      items: [],
    },
    {
      title: "Integrations",
      url: "#/integrations",
      icon: Boxes,
      items: [],
    },
    {
      title: "Team",
      url: "#/team",
      icon: Users,
      items: [],
    },
    {
      title: "Settings",
      url: "#/settings",
      icon: Settings2,
      items: [
        { title: "General Settings", url: "#/settings/general" },
        { title: "Security Settings", url: "#/settings/security" },
        { title: "Billing", url: "#/settings/billing" },
      ],
    },
  ],
  projects: [
    // Re-purposing 'projects' to represent 'Asset Groups' or 'Scan Profiles'
    {
      name: "Critical Web Apps",
      url: "#/groups/webapps",
      icon: FolderOpen,
    },
    {
      name: "Internal APIs",
      url: "#/groups/apis",
      icon: FolderOpen,
    },
    {
      name: "Network Segments",
      url: "#/groups/networks",
      icon: FolderOpen,
    },
    {
      name: "Cloud Infra Scans",
      url: "#/groups/cloud",
      icon: FolderOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  function handleLogout() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  }

  return (
    <Sidebar className="font-inter" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* Renaming NavProjects to NavGroups conceptually to fit broader use */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user.name!,
            email: session?.user.email!,
            avatar: session?.user.image ?? "",
          }}
          isLoading={isPending}
          onLogout={handleLogout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
