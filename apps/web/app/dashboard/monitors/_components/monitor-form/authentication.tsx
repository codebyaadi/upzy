import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AUTH_TYPES } from "@upzy/constants";
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

interface AuthenticationFormProps {
  form: UseFormReturn<CreateMonitorDto>;
  watchedAuthType: string | undefined;
}

export function AuthenticationForm({
  form,
  watchedAuthType,
}: AuthenticationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showToken, setShowToken] = useState(false);

  return (
    <Card className="bg-card w-full">
      <CardHeader className="pb-4">
        <CardTitle className="font-outfit text-lg font-medium">
          Authentication
        </CardTitle>
        <CardDescription className="text-sm">
          Configure authentication if your endpoint requires it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <FormField
          control={form.control}
          name="authType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Authentication Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AUTH_TYPES.map((auth) => (
                    <SelectItem key={auth.value} value={auth.value}>
                      {auth.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {(watchedAuthType === "basic" || watchedAuthType === "digest") && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="authUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="username" className="h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className="h-10 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {(watchedAuthType === "bearer" || watchedAuthType === "api_key") && (
          <FormField
            control={form.control}
            name="authToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  {watchedAuthType === "bearer" ? "Bearer Token" : "API Key"}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showToken ? "text" : "password"}
                      placeholder={
                        watchedAuthType === "bearer"
                          ? "your-bearer-token"
                          : "your-api-key"
                      }
                      className="h-10 pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    >
                      {showToken ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
