"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@upzy/ui/components/button";
import { Form } from "@upzy/ui/components/form";
import { monitorInputSchema, CreateMonitorDto } from "@upzy/validators";

import { BasicInformationForm } from "../_components/monitor-form/basic-information";
import { MonitoringRegionsForm } from "../_components/monitor-form/monitoring-regions";
import { HttpConfigurationForm } from "../_components/monitor-form/http-configuration";
import { DNSConfigurationForm } from "../_components/monitor-form/dns-configuration";
import { PlaywrightConfigurationForm } from "../_components/monitor-form/playwright-configuration";
import { AuthenticationForm } from "../_components/monitor-form/authentication";
import { AdvancedSettingsForm } from "../_components/monitor-form/advanced-settings";
import { StatusControlsForm } from "../_components/monitor-form/status-controls";
import { useRouter } from "next/navigation";
import { http } from "@/lib/http";
import { HttpError } from "@upzy/lib";

export default function CreateMonitorPage() {
  const router = useRouter();
  const [currentTag, setCurrentTag] = useState("");

  const form = useForm<CreateMonitorDto>({
    resolver: zodResolver(monitorInputSchema),
    defaultValues: {
      name: "",
      type: "http",
      url: "",
      interval: 60,
      requestTimeout: 30,
      retryCount: 3,
      enabled: true,
      isPaused: false,
      httpMethod: "GET",
      expectedStatusCodes: [200],
      followRedirects: true,
      verifySSL: true,
      sslCheckEnabled: false,
      sslExpiryThreshold: 30,
      authType: "none",
      dnsRecordType: "A",
      heartbeatGracePeriod: 3600,
      playwrightScript: "",
      regions: [],
      tags: [],
      // Optional fields
      requestBody: "",
      requestHeaders: "",
      authUsername: "",
      authPassword: "",
      authToken: "",
      dnsServer: "",
      expectedIp: "",
    },
  });

  const watchedType = form.watch("type");
  const watchedAuthType = form.watch("authType");

  const onSubmit: SubmitHandler<CreateMonitorDto> = async (data) => {
    try {
      const result = await http.post<{ success: boolean; message: string }>(
        "/monitor",
        data
      );

      console.log("API Success:", result.message);
      toast.success(result.message || "Monitor created successfully!");

      router.push("/dashboard/monitors");
    } catch (error) {
      console.error("Submission failed:", error);

      if (error instanceof HttpError) {
        // The `error.body` contains the JSON response from the server.
        // This could be a generic message or specific validation errors.
        const serverMessage =
          error.body?.message || "An error occurred on the server.";

        toast.error(serverMessage);
      } else {
        toast.error("An unexpected network error occurred. Please try again.");
      }
    }
  };

  const addTag = () => {
    if (
      currentTag.trim() &&
      !form.getValues("tags")?.includes(currentTag.trim())
    ) {
      const currentTags = form.getValues("tags") ?? [];
      form.setValue("tags", [...currentTags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") ?? [];
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const addStatusCode = (code: number) => {
    const currentCodes = form.getValues("expectedStatusCodes") ?? [];
    if (!currentCodes.includes(code)) {
      form.setValue("expectedStatusCodes", [...currentCodes, code]);
    }
  };

  const removeStatusCode = (code: number) => {
    const currentCodes = form.getValues("expectedStatusCodes") ?? [];
    form.setValue(
      "expectedStatusCodes",
      currentCodes.filter((c) => c !== code)
    );
  };

  return (
    <div className="mb-12 space-y-5">
      <div className="space-y-2">
        <h1 className="font-outfit text-2xl font-semibold tracking-tight">
          Create Monitor
        </h1>
        <p className="text-muted-foreground text-sm">
          Set up a new monitor to track your service's uptime and performance.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <BasicInformationForm form={form} watchedType={watchedType} />

          {/* Monitoring Regions */}
          <MonitoringRegionsForm form={form} />

          {/* HTTP Configuration */}
          {(watchedType === "http" || watchedType === "https") && (
            <HttpConfigurationForm
              form={form}
              addStatusCode={addStatusCode}
              removeStatusCode={removeStatusCode}
            />
          )}

          {/* DNS Configuration */}
          {watchedType === "dns" && <DNSConfigurationForm form={form} />}

          {/* Playwright Configuration */}
          {watchedType === "playwright" && (
            <PlaywrightConfigurationForm form={form} />
          )}

          {/* Authentication */}
          <AuthenticationForm form={form} watchedAuthType={watchedAuthType} />

          {/* Advanced Settings */}
          <AdvancedSettingsForm
            form={form}
            watchedType={watchedType}
            currentTag={currentTag}
            setCurrentTag={setCurrentTag}
            addTag={addTag}
            removeTag={removeTag}
          />

          {/* Status Controls */}
          <StatusControlsForm form={form} />

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit">
              {" "}
              {form.formState.isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
