import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useEffect, useContext, useState , Dispatch , SetStateAction } from "react"
import { authContext } from "@/app/provider/authProvider"
import { themeContext } from "@/app/provider/themeProvider"

export default function Header() {

    const { isMenuOpen , setIsMenuOpen } = useContext(themeContext)
    return (
    <>  
        {isMenuOpen && (<MobileNavigation />)}
        <header className="bg-primary/20 w-full p-4 sm:px-10 fixed top-0 left-0 backdrop-blur-2xl items-center flex justify-between">
            
            <Link href={`/`} className="font-bold text-2xl text-foreground">MY
                <span className="text-primary">&lt;Query/&gt;</span>
            </Link>
            <div className="flex gap-4">
                <SwitchThemeBTN />
                <NavigationBTN />
            </div>
        </header>
    </>
    )
}

function NavigationBTN() {

    const { user } = useContext(authContext)
    const { isMenuOpen , setIsMenuOpen } = useContext(themeContext)

    return (
        <div className="flex items-center gap-2">
            <button onClick={() => setIsMenuOpen((prev) => !prev)} className="w-[35px] bg-primary/20 border border-primary text-primary aspect-square flex justify-center items-center rounded-lg">
                {!isMenuOpen ? <Menu /> : <X />}
            </button>
        </div>
    )
}

function MobileNavigation() {

    const { user } = useContext(authContext)

    return (
        <div className="w-full fixed top-0 gap-4 left-0 h-full bg-background/80 backdrop-blur-md p-4 z-10 flex flex-col">
            <div className="flex justify-between items-center">
                <SwitchThemeBTN />
                <NavigationBTN />
            </div>
            <div className="w-full flex-auto flex flex-col justify-center gap-6 items-center content-center">
                <NavItem href="/">หน้าหลัก</NavItem>
                <NavItem href="/" disable>บทเรียน</NavItem>
                <NavItem href="/playground">Playground</NavItem>
                <NavItem href="/" disable>วิธีใช้งาน</NavItem>
                <Link className="bg-primary text-white text-xl px-4 py-2 rounded-md font-bold" href={"/login"}>เข้าสู่ระบบ</Link>
            </div>
        </div>
    )
}

function NavItem({ href, disable, children }: { href: string; disable?: boolean; children: React.ReactNode }) {
    return (
        disable ? 
        <div className="text-primary/60 inline w-fit font-bold text-xl">{children}</div> :
        <Link href={href} className="text-primary inline w-fit font-bold text-xl">{children}</Link>
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