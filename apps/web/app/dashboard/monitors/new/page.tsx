"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@upzy/ui/components/card";
import { Button } from "@upzy/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@upzy/ui/components/form";
import { Input } from "@upzy/ui/components/input";
import { Label } from "@upzy/ui/components/label";
import { Switch } from "@upzy/ui/components/switch";
import { Textarea } from "@upzy/ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@upzy/ui/components/select";
import { Checkbox } from "@upzy/ui/components/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { generateSlug } from "@upzy/utils";

const monitorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.string().min(1, "Type is required"),
  url: z.string().url("Please enter a valid URL"),
  interval: z.coerce.number().min(1, "Interval must be at least 1 second"),
  enabled: z.boolean(),
  verifySSL: z.boolean(),
  regions: z.array(z.string()).min(1, "At least one region must be selected"),
  httpMethod: z.enum([
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
  ]),
  requestTimeout: z.coerce.number().min(1, "Timeout must be at least 1 second"),
  requestBody: z.string().optional(),
  requestHeaders: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      try {
        JSON.parse(val);
        return true;
      } catch (e) {
        return false;
      }
    }, "Invalid JSON format for headers"),
});

type MonitorFormData = z.infer<typeof monitorSchema>;

const AVAILABLE_REGIONS = [
  { id: "us-east-1", label: "US East (N. Virginia)" },
  { id: "us-west-2", label: "US West (Oregon)" },
  { id: "eu-west-1", label: "Europe (Ireland)" },
  { id: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  { id: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
];

const MONITOR_TYPES = [
  { value: "http", label: "HTTP/HTTPS" },
  { value: "tcp", label: "TCP Port" },
  { value: "ping", label: "Ping" },
  { value: "dns", label: "DNS" },
];

export default function NewMonitor() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<MonitorFormData>({
    resolver: zodResolver(monitorSchema),
    defaultValues: {
      name: "",
      slug: "",
      type: "http",
      url: "",
      interval: 60,
      enabled: true,
      verifySSL: true,
      regions: [],
      httpMethod: "GET",
      requestTimeout: 30,
      requestBody: "",
      requestHeaders: "",
    },
  });

  const onSubmit = (data: MonitorFormData) => {
    console.log("Monitor data:", data);
    // Handle form submission here
  };

  return (
    <div className="mb-12 space-y-5">
      <div>
        <h1 className="font-outfit mt-5 text-xl md:mt-8">Create Monitor</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-sidebar w-full rounded-lg">
            <CardHeader>
              <CardTitle className="font-outfit font-normal">
                Basic Information
              </CardTitle>
              <CardDescription className="text-xs">
                Essential details for your monitor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Monitor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Website Monitor" {...field} />
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
                    <FormLabel className="text-xs">Monitor Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select monitor type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MONITOR_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
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
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">URL to Monitor</FormLabel>
                    <FormControl>
                      <div className="flex rounded-md shadow-xs">
                        <span className="border-input text-muted-foreground inline-flex items-center rounded-s-md border px-3 text-sm">
                          https://
                        </span>
                        <Input
                          className="-ms-px rounded-s-none shadow-none"
                          placeholder="google.com"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              `https://${e.target.value.replace(/^https?:\/\//, "")}`
                            )
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Check Interval (seconds)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Monitoring Regions
                    </FormLabel>
                    <div className="space-y-2">
                      {AVAILABLE_REGIONS.map((region) => (
                        <div
                          key={region.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={region.id}
                            checked={field.value.includes(region.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, region.id]);
                              } else {
                                field.onChange(
                                  field.value.filter((r) => r !== region.id)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={region.id} className="text-xs">
                            {region.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-4">
                <FormField
                  control={form.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-xs">Enable Monitor</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="verifySSL"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-xs">Verify SSL</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          {/* --- */}
          <Card className="bg-sidebar w-full rounded-lg">
            <CardHeader>
              <CardTitle className="font-outfit flex items-center justify-between font-normal">
                Advanced Settings
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs"
                  size="sm"
                >
                  {showAdvanced ? "Hide" : "Show"}
                </Button>
              </CardTitle>
              <CardDescription className="text-xs">
                Optional configurations for specific monitoring needs.
              </CardDescription>
            </CardHeader>
            {showAdvanced && (
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="httpMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">HTTP Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                          <SelectItem value="PATCH">PATCH</SelectItem>
                          <SelectItem value="HEAD">HEAD</SelectItem>
                          <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestTimeout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        Request Timeout (seconds)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestHeaders"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">
                        Request Headers (JSON)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestBody"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Request Body</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Request body content (for POST, PUT, PATCH methods)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            )}
          </Card>
          {/* --- */}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit">Create Monitor</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
