import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "./providers";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/Sidebar"));
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { SessionServer } from "@/types";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeliveryappV2",
  description: "testeo de app de delivery",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as SessionServer;
  //console.log(session, "session xD");
  //min-[200px]:ml-[20vw] min-[500px]:ml-[100px]
  return (
    <html lang="es">
      <body className={poppins.className}>
        <NextAuthProvider>
          <div className="flex">
            <Sidebar {...session} />
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
