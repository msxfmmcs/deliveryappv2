//"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SessionServer } from "@/types";
import dynamic from "next/dynamic";
const SignOut = dynamic(() => import("@/components/SignOut"));

export default async function Home() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  if (!session) {
    redirect("/");
  }
  //console.log(session);
  return (
    <div>
      <h1>{session.user.name}</h1>
      <img src={session.user.image}></img>
      <SignOut />
    </div>
  );
}
