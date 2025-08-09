import { UseFormReturn } from "react-hook-form";
import { MONITOR_TYPES } from "@upzy/constants";
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

interface BasicInformationFormProps {
  form: UseFormReturn<CreateMonitorDto>;
  watchedType: string;
}

export function BasicInformationForm({
  form,
  watchedType,
}: BasicInformationFormProps) {
  return (
    <Card className="bg-card w-full">
      <CardHeader className="pb-4">
        <CardTitle className="font-outfit text-lg font-medium">
          Basic Information
        </CardTitle>
        <CardDescription className="text-sm">
          Essential details for your monitor configuration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Monitor Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="My Website Monitor"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Monitor Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select monitor type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-inter">
                    {MONITOR_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="space-y-1">
                          <div className="font-medium">{type.label}</div>
                          <div className="text-muted-foreground text-xs">
                            {type.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                {watchedType === "tcp" ? "Host and Port" : "URL to Monitor"}
              </FormLabel>
              <FormControl>
                <div className="flex rounded-md shadow-sm">
                  {watchedType !== "tcp" && (
                    <span className="border-input text-muted-foreground bg-muted inline-flex items-center rounded-s-md border px-3 text-sm">
                      https://
                    </span>
                  )}
                  <Input
                    className={`h-10 ${watchedType !== "tcp" ? "-ms-px rounded-s-none shadow-none" : ""}`}
                    placeholder={
                      watchedType === "tcp" ? "example.com:80" : "example.com"
                    }
                    {...field}
                    onChange={(e) => {
                      if (watchedType === "tcp") {
                        field.onChange(e.target.value);
                      } else {
                        field.onChange(
                          `https://${e.target.value.replace(/^https?:\/\//, "")}`
                        );
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="interval"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Check Interval
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min="1"
                      className="h-10 pr-16"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                    <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                      seconds
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requestTimeout"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Request Timeout
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min="1"
                      max="300"
                      className="h-10 pr-16"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                    <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                      seconds
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
