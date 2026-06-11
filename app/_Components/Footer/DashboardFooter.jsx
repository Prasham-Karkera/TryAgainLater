import Link from "next/link";

export const DashboardFooter = () => {
    return (
        <footer className="bg-muted/50 border-t border-border relative bottom-0 w-full mt-24">
            <div className="max-w-6xl mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        © 2026 TRYAGAINLATER. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}