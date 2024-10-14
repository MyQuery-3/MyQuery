import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("http://localhost:8888/auth/login");
  }
  return (
    <Button onClick={handleLogin} className="bg-white drop-shadow-sm w-full text-black space-x-2 py-6 hover:bg-slate-100">
      <FcGoogle size={24} />
    </Button>
  );
}
