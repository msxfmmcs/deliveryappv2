"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="text-center bg-[#238523] rounded-md p-1 min-[200px]:w-[calc(20vw-3px)] m-1 min-[500px]:w-[90px] min-[200px]:text-[4vw] min-[400px]:text-[16px]"
    >
      Cerrar Sesion
    </button>
  );
}
