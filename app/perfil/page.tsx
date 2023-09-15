//"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SessionServer } from "@/types";
import dynamic from "next/dynamic";
const UpdateProfile = dynamic(() => import("@/components/UpdateProfile"));

export default async function Perfil() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <UpdateProfile />
    </div>
  );
}
