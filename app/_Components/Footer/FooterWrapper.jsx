"use client";

import { usePathname } from "next/navigation";
import { DashboardFooter } from "./DashboardFooter";
import { Footer } from "./Footer"

export default function FooterWrapper() {
    const pathname = usePathname();

    if (pathname.startsWith("/dashboard")) {
        return <DashboardFooter />;
    }

    return <Footer />;
}