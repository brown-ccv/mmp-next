"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

interface HeaderLinkProps {
  href: string;
  children?: React.ReactNode;
}

export const HeaderLink = ({ href, ...props }: HeaderLinkProps) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link
        href={href}
        className={`hover:underline underline-offset-8 text-lg ${
          isActive
            ? "text-neutral-900 font-semibold underline"
            : "no-underline text-neutral-500"
        }`}
        {...props}
      />
    </NavigationMenu.Link>
  );
};
