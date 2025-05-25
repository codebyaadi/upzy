import { Button } from "@upzy/ui/components/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="font-inter flex items-center justify-center">
      <section className="relative mx-auto max-w-[1888px]">
        <div className="container mx-auto flex flex-col items-center px-2 pt-36 pb-44 sm:px-5 md:pt-40 md:pb-52">
          <h1 className="font-outfit mt-5 text-center text-2xl font-medium md:mt-8 md:text-5xl">
            Never miss a beat when your site goes down
          </h1>
          <p className="text-muted-foreground mx-auto mt-2 mb-8 max-w-lg text-center text-lg md:text-xl lg:mx-0">
            Get instant alerts when your website, server, or API goes down.
          </p>
          <div>
            <Button variant="default" size="sm" className="mr-2 text-xs">
              <Link href="/signup">Start for free</Link>
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Link href="/signin">See Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
