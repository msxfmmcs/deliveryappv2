import { SessionServer, buttonStyle } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const SignOut = dynamic(() => import("@/components/SignOut"));

export default function Sidebar({ user }: SessionServer) {
  //console.log(user, "session que llega a sidebar");
  if (user) {
    return (
      <div className="flex flex-col min-[200px]:w-[20vw] min-[500px]:w-[100px] bg-black h-screen items-center">
        <Image
          src={user.image}
          width={90}
          height={90}
          priority
          alt="foto de perfil"
          className="min-[200px]:w-[calc(20vw-10px)] min-[200px]:h-[calc(20vw-10px)] min-[500px]:w-[90px] min-[500px]:h-[90px]"
        />
        <h1 className="text-center min-[200px]:text-[4vw] min-[400px]:text-[16px]">
          {user.name}
        </h1>

        <Link
          href="/home"
          className="text-center bg-[#238523] rounded-md p-1 min-[200px]:w-[calc(20vw-3px)] m-1 min-[500px]:w-[90px] min-[200px]:text-[4vw] min-[400px]:text-[16px]"
        >
          Delivery
        </Link>
        <Link
          href="/perfil"
          className="text-center bg-[#238523] rounded-md p-1 min-[200px]:w-[calc(20vw-10px)] m-1 min-[500px]:w-[90px] min-[200px]:text-[4vw] min-[400px]:text-[16px]"
        >
          Perfil
        </Link>
        <SignOut />
      </div>
    );
  } else {
    return false;
  }
}
