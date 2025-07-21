"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@upzy/ui/components/button";
import { Form } from "@upzy/ui/components/form";
import { monitorInputSchema, CreateMonitorDto } from "@upzy/validators/monitor";

import { BasicInformationForm } from "../_components/new-form/basic-information";
import { MonitoringRegionsForm } from "../_components/new-form/monitoring-regions";
import { HttpConfigurationForm } from "../_components/new-form/http-configuration";
import { DNSConfigurationForm } from "../_components/new-form/dns-configuration";
import { PlaywrightConfigurationForm } from "../_components/new-form/playwright-configuration";
import { AuthenticationForm } from "../_components/new-form/authentication";
import { AdvancedSettingsForm } from "../_components/new-form/advanced-settings";
import { StatusControlsForm } from "../_components/new-form/status-controls";

export default function NewMonitor() {
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

  const onSubmit: SubmitHandler<CreateMonitorDto> = (data) => {
    console.log("Monitor data:", data);
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
