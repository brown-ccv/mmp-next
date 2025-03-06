"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface HeaderLinkProps {
  href: string;
  title: string;
}
export const HeaderLink: React.FC<HeaderLinkProps> = ({ href, title }) => {
  const pathName = usePathname();
  return (
    <Link
      className={`hover:underline underline-offset-8 text-lg ${
        pathName === `/mmp${href}`
          ? "text-neutral-900 font-semibold underline"
          : "no-underline text-neutral-500"
      }`}
      href={`/mmp${href}`}
    >
      {title}
    </Link>
  );
};
