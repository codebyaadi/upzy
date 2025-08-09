import { UseFormReturn } from "react-hook-form";
import { AVAILABLE_REGIONS } from "@upzy/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@upzy/ui/components/card";
import { Checkbox } from "@upzy/ui/components/checkbox";
import { FormField, FormItem, FormMessage } from "@upzy/ui/components/form";
import { Label } from "@upzy/ui/components/label";
import { CreateMonitorDto } from "@upzy/validators/schemas/monitor";

interface MonitoringRegionsFormProps {
  form: UseFormReturn<CreateMonitorDto>;
}

export function MonitoringRegionsForm({ form }: MonitoringRegionsFormProps) {
  return (
    <Card className="bg-card w-full">
      <CardHeader className="pb-4">
        <CardTitle className="font-outfit text-lg font-medium">
          Monitoring Regions
        </CardTitle>
        <CardDescription className="text-sm">
          Select regions from which to monitor your service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="regions"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {AVAILABLE_REGIONS.map((region) => (
                  <div
                    key={region.id}
                    className="border-border hover:bg-muted/50 rounded-lg border p-3 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={region.id}
                        checked={field.value?.includes(region.id) ?? false}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value ?? [];
                          if (checked) {
                            field.onChange([...currentValue, region.id]);
                          } else {
                            field.onChange(
                              currentValue.filter((r) => r !== region.id)
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={region.id}
                        className="flex-1 cursor-pointer text-sm font-medium"
                      >
                        {region.label}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
