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
        className={`hover:underline underline-offset-8 text-lg ${pathname === href ? "text-neutral-900 font-semibold underline" : "no-underline text-neutral-500"}`}
        href={href}
>
    {title}
</Link>
    )
    }
