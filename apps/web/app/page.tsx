import { Button } from "@upzy/ui/components/button";

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Page Under Development</h1>
          <p>This page is currently being built.</p>
          <p>New features and content will be available soon.</p>
          <Button className="mt-2">Coming Soon</Button>
        </div>
        <div className="text-muted-foreground font-mono text-xs">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}
