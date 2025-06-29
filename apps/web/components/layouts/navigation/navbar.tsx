"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@upzy/ui/components/button";
import { authClient } from "@upzy/auth/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@upzy/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@upzy/ui/components/avatar";
import { UpzyLogo } from "@upzy/ui/components/upzy-logo";
import { NavMenu } from "@/components/layouts/navigation/nav-menu";
import { MobileMenu } from "./mobile-menu";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex justify-center before:absolute before:inset-0 before:-z-10 before:backdrop-blur-2xl">
      <nav className="mx-5 flex h-[52px] max-w-[1110px] grow justify-between border-b border-[#727DA1]/15 text-[13px] leading-[100%] text-[#C9D3EE]">
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="">
            <UpzyLogo scale={2} />
          </Link>
          <NavMenu />
        </div>
        <div className="font-inter flex items-center justify-center gap-2 font-normal">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar>
                  <AvatarImage src={session.user.image || ""} />
                  <AvatarFallback>{session.user.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-outfit w-42 rounded">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleSignOut}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" className="text-xs">
                <Link href="/signin">Log In</Link>
              </Button>
              <Button variant="default" size="sm" className="text-xs">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
