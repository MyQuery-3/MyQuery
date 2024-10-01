'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col space-y-2 items-center justify-center content-center min-h-screen">
        <p className="text-[#E35205] text-[5rem] text-center font-bold scale-up-center">Query Mind</p>
        <Link href={"/playground"} className="bg-[#2D569E] text-[1.5rem] text-white p-2 rounded-md self-center">Start Learning</Link>
      </div>
    </main>
  );
}
