"use client";
import { signIn } from "next-auth/react";

export default function SignInWithGoogleButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-black text-white rounded-md p-1 w-5"
    >
      Ingresar con Google
    </button>
  );
}
