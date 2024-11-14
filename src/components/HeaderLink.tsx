"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react";

interface HeaderLinkProps {
    href: string
    title: string
    }
export const HeaderLink: React.FC<HeaderLinkProps> = ({href, title}) => {
    const pathname = usePathname()
    return (
<Link
        className={`hover:underline underline-offset-8 ${pathname === href ? "text-neutral-900 font-semibold underline" : "no-underline"}`}
        href={href}
>
    {title}
</Link>
    )
    }
