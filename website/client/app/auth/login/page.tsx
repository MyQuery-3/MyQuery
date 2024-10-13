'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginButton from "@/components/LoginButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            ล็อกอินเพื่อเข้าใช้งานระบบ playgorund
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginButton />
        </CardContent>
      </Card>
    </div>
  );
}
