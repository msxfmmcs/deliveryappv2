import { buttonStyle } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const SignOut = dynamic(() => import("@/components/SignOut"));

export default function Sidebar({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <div className="flex flex-col min-[200px]:w-[20vw] min-[500px]:w-[100px] bg-black h-screen items-center">
      <Image
        src={image}
        width={90}
        height={90}
        alt="foto de perfil"
        className="min-[200px]:w-[calc(20vw-10px)] min-[200px]:h-[calc(20vw-10px)] min-[500px]:w-[90px] min-[500px]:h-[90px]"
      />

      {
        //style={@media (min-width: 200px) {width: "calc(20vw - 4px)", height: "calc(20vw - 4px)" }}
      }
      <h1 className="text-center min-[200px]:text-[4vw] min-[400px]:text-[16px]">
        {name}
      </h1>
      <button className={buttonStyle}>
        <Link href="/home">Delivery</Link>
      </button>
      <button className={buttonStyle}>
        <Link href="/perfil">Perfil</Link>
      </button>

      <SignOut />
    </div>
  );
}
