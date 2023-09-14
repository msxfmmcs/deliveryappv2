"use client";
import { buttonStyle } from "@/types";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button onClick={() => signOut()} className={buttonStyle}>
      Cerrar Sesion
    </button>
  );
}
