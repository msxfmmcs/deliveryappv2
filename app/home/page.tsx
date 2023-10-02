import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SessionServer } from "@/types";

export default async function Home() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  if (!session) {
    redirect("/");
  } else if (session.user.rol === undefined) {
    redirect("/register");
  }
  //console.log(session, "session xD");
  return (
    <div className="min-[200px]:ml-[20vw] min-[500px]:ml-[100px]">
      <h1>Restaurantes</h1>
    </div>
  );
}
