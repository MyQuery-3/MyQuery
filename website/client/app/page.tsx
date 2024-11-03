import Link from "next/link"
import Image from "next/image"
import Playground from "@/public/images/landing/playground.webp"
import "./landing.css";
import { BugPlay , GraduationCap } from "lucide-react"

export default function Page(){

    const landingData = {
        th : {
            description : "My Query คือเว็บไซต์สำหรับการเรียนรู้ Query Language ของ MYSQL โดยได้รับแรงบัลดาลใจจาก DB Learn Web Application ของคณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง"
        }
    }

    return (
        <>
        <div className="w-full h-screen max-h-screen overflow-hidden pt-36 flex flex-col justify-between">
            <div className="max-w-7xl mx-auto p-4 lg:p-0 flex-auto flex justify-center items-center">
                <div>
                    <h1 className="text-center text-5xl md:text-7xl font-bold mb-6">
                        MY
                        <span className="text-primary">&lt;Query/&gt;</span>
                    </h1>
                    <div className="max-w-3xl mx-auto mb-16">
                        <p className="text-center text-foreground/60 mb-6">
                            {landingData.th.description}
                        </p>
                        <div className="flex gap-4 justify-center items-center flex-wrap">
                            <Link href={"/playground"} className="flex items-center gap-1 py-2 px-6 bg-primary hover:bg-primary/80 rounded-full font-bold text-white"> <BugPlay /> Try Playground</Link>
                            <div className="flex items-center gap-1 py-2 px-6 bg-primary/40 cursor-not-allowed rounded-full font-bold text-white"><GraduationCap />Enter Course</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-b from-background to-primary/50 pb-28 p-4 lg:p-0">
                <div className="max-w-4xl mx-auto relative mb-[50px]">
                    <Image src={Playground} alt="ตัวอย่าง Playground | MyQuery" className="rounded-lg img-shadow" />
                </div>
            </div>
        </div>
        </>
    )
}