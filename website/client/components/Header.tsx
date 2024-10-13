import Link from "next/link"
import { Menu , X } from "lucide-react"
import { useEffect , useContext } from "react"
import { authContext } from "@/app/provider/authProvider"

export default function Header() {

    const [user] = useContext(authContext)

    return (
        <header className="bg-primary/20 w-full p-4 fixed top-0 left-0 backdrop-blur-2xl items-center flex justify-between">
            <Link href={`/`} className="font-bold text-2xl text-foreground">MY
                <span className="text-primary">&lt;Query/&gt;</span>
            </Link>
            <div>
                {switchThemeBTN()}
            </div>
        </header>
    )
}

function switchThemeBTN() {
    return (
        <button className="flex items-center gap-2">
            <div className="w-[35px]">
                <Menu />
                <X />
            </div>
        </button>
    )
}