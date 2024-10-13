import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

export default function LoginButton() {
  return (
    <Button className="bg-white drop-shadow-sm w-full text-black space-x-2 py-6 hover:bg-slate-100">
      <FcGoogle size={24} />
    </Button>
  );
}
