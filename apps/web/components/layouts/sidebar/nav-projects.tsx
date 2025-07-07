// nav-projects.tsx
"use client";

import {
  FolderOpen, // Consistent icon for groups
  FileScan, // For "Run Scan" (assuming FileScan is available)
  Eye, // For "View Details"
  Trash2,
  MoreHorizontal,
  PlusCircle, // For "Add New Group"
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@upzy/ui/components/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@upzy/ui/components/sidebar";

export function NavProjects({
  // Keeping prop name 'projects' but conceptualizing as 'groups'
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Asset & Scan Groups</SidebarGroupLabel>{" "}
      {/* Updated label */}
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span className="text-xs">{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">Group Actions</span>{" "}
                  {/* Updated sr-only */}
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Eye className="text-muted-foreground mr-2 h-4 w-4" />{" "}
                  {/* Added mr-2 and h-4 w-4 for consistency */}
                  <span>View Group Details</span> {/* Updated text */}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileScan className="text-muted-foreground mr-2 h-4 w-4" />{" "}
                  {/* New action for scanning */}
                  <span>Run Scan on Group</span> {/* Updated text */}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>Delete Group</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <PlusCircle className="text-sidebar-foreground/70 mr-2 h-4 w-4" />{" "}
            {/* Added mr-2 and h-4 w-4 */}
            <span className="text-xs">Create New Group</span>{" "}
            {/* Updated text */}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
