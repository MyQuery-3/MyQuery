import Link from "next/link"

export default function Logo({ className } : { className?: string }) {
    return (
        <Link href={`/`} className={`font-bold text-foreground ${className}`}>MY
            <span className="text-primary">&lt;Query/&gt;</span>
        </Link>
    )
}