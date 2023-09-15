import { authOptions } from "@/lib/authOptions";
import { SessionServer } from "@/types";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const SelectTypeUser = dynamic(() => import("@/components/SelectTypeUser"));
export default async function Register() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  if (!session) {
    redirect("/");
  } else if (session.user.rol === undefined) {
    return <SelectTypeUser email={session.user.email} />;
  }
}
