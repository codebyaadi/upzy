import MonitorListAction from "./action-dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@upzy/ui/components/table";
import StatusBadge from "./status-badge";
import { useId } from "react";

interface Monitor {
  name: string;
  status: string;
  uptime: string;
  lastChecked: string;
  region: string;
}

interface MonitorTableProps {
  data: Monitor[];
}

export default function MonitorTable({ data }: MonitorTableProps) {
  const id = useId();

  return (
    <Table className="text-xs">
      <TableHeader className="bg-sidebar">
        <TableRow>
          <TableHead className="w-[300px] py-4">Monitor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Uptime</TableHead>
          <TableHead>Last Checked</TableHead>
          <TableHead>Region</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((monitor, index) => (
          <TableRow key={`${id}-${index}`}>
            <TableCell className="py-4">{monitor.name}</TableCell>
            <TableCell>
              <StatusBadge status={monitor.status as any} />
            </TableCell>
            <TableCell>{monitor.uptime}</TableCell>
            <TableCell>{monitor.lastChecked}</TableCell>
            <TableCell>{monitor.region}</TableCell>
            <TableCell>
              <MonitorListAction />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
