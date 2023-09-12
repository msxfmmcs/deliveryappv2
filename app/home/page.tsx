//"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SessionServer } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
const SignOut = dynamic(() => import("@/components/SignOut"));

export default async function Home() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  if (!session) {
    redirect("/");
  }
  //console.log(session);
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>{session.user.name}</h1>
      <Image
        src={session.user.image}
        alt="foto de perfil"
        width={50}
        height={50}
        className="m-3"
      />
      <SignOut />
    </div>
  );
}
