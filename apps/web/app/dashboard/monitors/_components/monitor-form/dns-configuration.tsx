import { UseFormReturn } from "react-hook-form";
import { DNS_RECORD_TYPES } from "@upzy/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@upzy/ui/components/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@upzy/ui/components/form";
import { Input } from "@upzy/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@upzy/ui/components/select";
import { CreateMonitorDto } from "@upzy/validators/schemas/monitor";

interface DNSConfigurationFormProps {
  form: UseFormReturn<CreateMonitorDto>;
}

export function DNSConfigurationForm({ form }: DNSConfigurationFormProps) {
  return (
    <Card className="bg-card w-full">
      <CardHeader className="pb-4">
        <CardTitle className="font-outfit text-lg font-medium">
          DNS Configuration
        </CardTitle>
        <CardDescription className="text-sm">
          Configure DNS-specific settings for your monitor.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="dnsRecordType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  DNS Record Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DNS_RECORD_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dnsServer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  DNS Server (optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="8.8.8.8" className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="expectedIp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Expected IP Address (optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="192.168.1.1" className="h-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
