import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { SessionServer } from "@/types";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
const SignInWithGoogleButton = dynamic(
  () => import("@/components/SignInWithGoogleButton")
);

export default async function Home() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  if (session) {
    redirect("/home");
  }
  return (
    <div className="h-screen flex items-center justify-center w-screen">
      <SignInWithGoogleButton />
    </div>
  );
}
