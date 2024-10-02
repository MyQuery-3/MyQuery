"use client";

import Link from "next/link";
import "./style.css";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col space-y-2 items-center justify-center content-center min-h-screen">
        <p className="text-[#E35205] text-[5rem] text-center font-bold scale-up-center max-[470px]:text-[3rem] ">
          Query Mind
        </p>
        <Button asChild size={"lg"} variant={"default"}>
          <Link href={"/playground"}>Start Learning</Link>
        </Button>
      </div>
      <div className=" absolute rounded-full w-5 h-5 bg-slate-600 top-[50%] left-[50%] scale-up-fade"></div>
    </main>
  );
}
