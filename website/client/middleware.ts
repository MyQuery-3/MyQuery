import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  try {
    if (!token) {
      throw new Error("Unauthorized");
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
    // return NextResponse.redirect("http://localhost:3000/auth/login");
  }
}

export const config = {
  matcher: ["/playground"],
};
