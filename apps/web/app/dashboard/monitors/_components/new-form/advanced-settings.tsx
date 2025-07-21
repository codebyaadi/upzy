import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
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
import { Switch } from "@upzy/ui/components/switch";
import { CreateMonitorDto } from "@upzy/validators/monitor";

interface AdvancedSettingsFormProps {
  form: UseFormReturn<CreateMonitorDto>;
  watchedType: string | undefined;
  currentTag: string;
  setCurrentTag: Dispatch<SetStateAction<string>>;
  addTag: () => void;
  removeTag: (tagToRemove: string) => void;
}

export function AdvancedSettingsForm({
  form,
  watchedType,
  currentTag,
  setCurrentTag,
  addTag,
  removeTag,
}: AdvancedSettingsFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Card className="bg-card w-full">
      <CardHeader className="pb-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex w-full items-center justify-between text-left"
        >
          <div>
            <CardTitle className="font-outfit text-lg font-medium">
              Advanced Settings
            </CardTitle>
            <CardDescription className="text-sm">
              Additional configuration options and settings.
            </CardDescription>
          </div>
          {showAdvanced ? (
            <ChevronUp className="text-muted-foreground h-5 w-5" />
          ) : (
            <ChevronDown className="text-muted-foreground h-5 w-5" />
          )}
        </button>
      </CardHeader>
      {showAdvanced && (
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="retryCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Retry Count
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      className="h-10"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sslExpiryThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    SSL Expiry Threshold
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min="1"
                        max="365"
                        className="h-10 pr-12"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                      <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                        days
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedType === "heartbeat" && (
              <FormField
                control={form.control}
                name="heartbeatGracePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Grace Period
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          min="60"
                          className="h-10 pr-16"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
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
            )}
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="followRedirects"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-3">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          Follow Redirects
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="verifySSL"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-3">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          Verify SSL Certificate
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="sslCheckEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-3">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          Enable SSL Expiry Check
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Tags</FormLabel>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a tag"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      className="h-10"
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      variant="outline"
                      size="sm"
                      className="h-10 px-3"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(field.value ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(field.value ?? []).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:bg-destructive/20 ml-1 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      )}
    </Card>
  );
}
