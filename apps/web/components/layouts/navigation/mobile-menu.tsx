"use client";

import { features, resources, solutions } from "@/config/menu";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@upzy/ui/components/accordion";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-muted-foreground p-2 pr-0 focus:outline-none"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="bg-background absolute top-12 right-0 left-0 z-50 flex h-screen flex-col gap-2 p-4 shadow-md">
          <Accordion type="multiple" className="w-full">
            <MobileAccordion title="Solutions" items={solutions} />
            <MobileAccordion title="Features" items={features} />
            <MobileAccordion title="Resources" items={resources} />
          </Accordion>
          <Link
            href="/docs"
            className="text-muted-foreground pt-2 text-xs font-semibold uppercase hover:underline"
          >
            Documentation
          </Link>
        </div>
      )}
    </div>
  );
}

function MobileAccordion({
  title,
  items,
}: {
  title: string;
  items: { title: string; href: string }[];
}) {
  return (
    <AccordionItem value={title.toLowerCase().replace(/\s+/g, "-")}>
      <AccordionTrigger className="text-muted-foreground text-xs font-semibold uppercase">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-1 py-1">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="text-foreground block text-sm hover:underline"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
