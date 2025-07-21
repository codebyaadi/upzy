import { UseFormReturn } from "react-hook-form";
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
import { Textarea } from "@upzy/ui/components/textarea";
import { CreateMonitorDto } from "@upzy/validators/monitor";

interface PlaywrightConfigurationFormProps {
  form: UseFormReturn<CreateMonitorDto>;
}

export function PlaywrightConfigurationForm({
  form,
}: PlaywrightConfigurationFormProps) {
  return (
    <Card className="bg-card w-full">
      <CardHeader className="pb-4">
        <CardTitle className="font-outfit text-lg font-medium">
          Browser Automation Script
        </CardTitle>
        <CardDescription className="text-sm">
          Define the Playwright script for browser-based monitoring.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="playwrightScript"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Playwright Script
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="await page.goto('https://example.com');&#10;await page.waitForSelector('.login-form');&#10;// Add your test steps here"
                  className="min-h-32 font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
