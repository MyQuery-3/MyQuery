import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useEffect, useContext, useState } from "react"
import { authContext } from "@/app/provider/authProvider"
import { themeContext } from "@/app/provider/themeProvider"

export default function Header() {

    return (
        <header className="bg-primary/20 w-full p-4 sm:px-10 fixed top-0 left-0 backdrop-blur-2xl items-center flex justify-between">
            <Link href={`/`} className="font-bold text-2xl text-foreground">MY
                <span className="text-primary">&lt;Query/&gt;</span>
            </Link>
            <div>
                <SwitchThemeBTN />
            </div>
        </header>
    )
}

function Navigation() {

    const { user } = useContext(authContext)

    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    return (
        <div className="flex items-center gap-2">
            <button onClick={() => setMenuOpen((prev) => !prev)} className="w-[35px] bg-primary/20 border border-primary text-primary aspect-square flex justify-center items-center rounded-lg">
                {!menuOpen ? <Menu /> : <X />}
            </button>
        </div>
    )
}

function SwitchThemeBTN() {
    const { isDark, setIsDark } = useContext(themeContext)

    return (
        <button onClick={() => setIsDark((prev) => !prev)} className="w-[35px] bg-primary/20 border border-primary text-primary aspect-square flex justify-center items-center rounded-lg">
            {isDark ? <Sun /> : <Moon />}
        </button>
    )
}