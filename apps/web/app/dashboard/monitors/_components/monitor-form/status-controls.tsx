import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@upzy/ui/components/card";
import { FormControl, FormField, FormItem } from "@upzy/ui/components/form";
import { Label } from "@upzy/ui/components/label";
import { Switch } from "@upzy/ui/components/switch";
import { CreateMonitorDto } from "@upzy/validators/schemas/monitor";

interface StatusControlsFormProps {
  form: UseFormReturn<CreateMonitorDto>;
}

export function StatusControlsForm({ form }: StatusControlsFormProps) {
  return (
    <Card className="bg-card w-full">
      <CardHeader className="pb-4">
        <CardTitle className="font-outfit text-lg font-medium">
          Monitor Status
        </CardTitle>
        <CardDescription className="text-sm">
          Control the initial state of your monitor.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Enable Monitor</Label>
            <p className="text-muted-foreground text-xs">
              Start monitoring immediately after creation
            </p>
          </div>
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Pause Monitor</Label>
            <p className="text-muted-foreground text-xs">
              Create in paused state (can be resumed later)
            </p>
          </div>
          <FormField
            control={form.control}
            name="isPaused"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
