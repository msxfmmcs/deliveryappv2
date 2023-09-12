"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-black text-white rounded-md p-1"
    >
      Cerrar Sesion
    </button>
  );
}
