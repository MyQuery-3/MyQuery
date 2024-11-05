import Logo from "@/components/Logo"
import Link from "next/link"
import { FaGoogle } from "react-icons/fa" 

export default function Page(){
    return(
        <div className="h-screen bg-background p-4 flex items-center justify-center content-center">
            <div className="bg-primary/10 p-4 py-6 shadow-md shadow-primary/50 rounded-md w-full max-w-[400px] flex flex-wrap">
                <Logo className="text-2xl w-full text-center mb-6" />
                <Link href="/" className="flex items-center justify-center gap-1 w-full bg-background p-2 text-center rounded-md font-bold hover:bg-primary/20 border hover:border-primary border-background">
                    <FaGoogle size={'1.2em'} />
                    Continue with Google
                </Link>
            </div>
        </div>
    )
}