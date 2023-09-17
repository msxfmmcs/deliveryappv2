import dynamic from "next/dynamic";
import { authOptions } from "@/lib/authOptions";
import { SessionServer } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const FormComercio2 = dynamic(() => import("@/components/FormComercio2"));
export default async function ComercioRegister() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  //solo pueden acceder los comercios que tengan datos incompletos
  if (!session) {
    redirect("/");
  } else if (session.user.rol === "comercio") {
    //definir datos que faltan por llenar para el comercio
    return <FormComercio2 />;
  } else {
    redirect("/home");
  }
}
