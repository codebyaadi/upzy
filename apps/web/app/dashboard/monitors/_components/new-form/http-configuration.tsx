import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { HTTP_METHODS, STATUS_CODES } from "@upzy/constants";
import { Badge } from "@upzy/ui/components/badge";
import { Button } from "@upzy/ui/components/button";
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
import { Textarea } from "@upzy/ui/components/textarea";
import { CreateMonitorDto } from "@upzy/validators/monitor";

interface HttpConfigurationFormProps {
  form: UseFormReturn<CreateMonitorDto>;
  addStatusCode: (code: number) => void;
  removeStatusCode: (code: number) => void;
}

export function HttpConfigurationForm({
  form,
  addStatusCode,
  removeStatusCode,
}: HttpConfigurationFormProps) {
  return (
    <Card className="bg-card w-full">
      <CardHeader className="pb-4">
        <CardTitle className="font-outfit text-lg font-medium">
          HTTP Configuration
        </CardTitle>
        <CardDescription className="text-sm">
          Configure HTTP-specific settings for your monitor.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="httpMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  HTTP Method
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
                    {HTTP_METHODS.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
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
            name="expectedResponseTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Expected Response Time (optional)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      className="h-10 pr-8"
                      placeholder="5000"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? parseInt(value) : undefined);
                      }}
                    />
                    <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                      ms
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="expectedStatusCodes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Expected Status Codes
              </FormLabel>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {(field.value ?? []).map((code) => (
                    <Badge
                      key={code}
                      variant="secondary"
                      className="flex items-center gap-1 pr-1"
                    >
                      {code}
                      <button
                        type="button"
                        onClick={() => removeStatusCode(code)}
                        className="hover:bg-destructive/20 ml-1 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {STATUS_CODES.filter(
                    (code) => !(field.value ?? []).includes(code)
                  ).map((code) => (
                    <Button
                      key={code}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addStatusCode(code)}
                      className="h-7 px-2 text-xs"
                    >
                      {code}
                    </Button>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="requestHeaders"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Request Headers (optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Content-Type: application/json&#10;Authorization: Bearer token"
                    className="min-h-20 resize-none"
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
                <FormLabel className="text-sm font-medium">
                  Request Body (optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='{"key": "value"}'
                    className="min-h-20 resize-none"
                    {...field}
                  />
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
