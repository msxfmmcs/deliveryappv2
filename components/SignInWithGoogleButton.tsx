"use client";
import { signIn } from "next-auth/react";

export default function SignInWithGoogleButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-black rounded-md p-1"
    >
      Ingresar con Google
    </button>
  );
}
