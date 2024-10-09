import Link from "next/link"
import Image from "next/image"
import Playground from "../../public/images/landing/playground.webp"
import "./landing.css";

export default function Page(){

    const landingData = {
        th : {
            description : "My Query คือเว็บไซต์สำหรับการเรียนรู้ Query Language ของ MYSQL โดยได้รับแรงบัลดาลใจจาก DB Learn Web Application ของคณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง"
        }
    }

    return (
        <>
        <div className="w-full h-screen max-h-screen overflow-hidden pt-36">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-7xl font-bold mb-6">
                    MY
                    <span className="text-primary">&lt;Query/&gt;</span>
                </h1>
                <div className="max-w-3xl mx-auto mb-16">
                    <p className="text-center text-foreground/60 mb-6">
                        {landingData.th.description}
                    </p>
                    <div className="flex gap-4 justify-center items-center">
                        <Link href={"/playground"} className="py-2 px-6 bg-primary hover:bg-primary/80 rounded-full font-bold text-white">Try Playground</Link>
                        <div className="py-2 px-6 bg-primary/40 cursor-not-allowed rounded-full font-bold text-white">Enter Course</div>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-b from-background to-primary/50 pb-28">
                <div className="max-w-4xl mx-auto relative">
                    <Image src={Playground} alt="ตัวอย่าง Playground | MyQuery" className="rounded-xl img-shadow" />
                </div>
            </div>
        </div>
        </>
    )
}