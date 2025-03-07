"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

interface HeaderLinkProps {
  href: string;
  title: string;
}
export const HeaderLink: React.FC<HeaderLinkProps> = ({ href, title }) => {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <Link
      className={`hover:underline underline-offset-8 text-lg ${
        pathName === `/${router.query.project}${href}`
          ? "text-neutral-900 font-semibold underline"
          : "no-underline text-neutral-500"
      }`}
      href={`/mmp${href}`}
    >
      {title}
    </Link>
  );
};
