import { authOptions } from "@/lib/authOptions";
import { SessionServer } from "@/types";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const SelectRegisterType = dynamic(
  () => import("@/components/SelectRegisterType")
);
export default async function Register() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  if (!session) {
    redirect("/");
  } else if (session.user.rol === undefined) {
    return <SelectRegisterType email={session.user.email} />;
  } else {
    redirect("/home");
  }
}
