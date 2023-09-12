import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SessionServer } from "@/types";
import { redirect } from "next/navigation";
const SignInWithGoogleButton = dynamic(
  () => import("@/components/SignInWithGoogleButton")
);

export default async function Home() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  if (session) {
    redirect("/home");
  }
  return <SignInWithGoogleButton />;
}
