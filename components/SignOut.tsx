"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button onClick={() => signOut()} className="bg-black rounded-md p-1">
      Cerrar Sesion
    </button>
  );
}
