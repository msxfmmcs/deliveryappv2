"use client";
import { signIn } from "next-auth/react";

export default function SignInWithGoogleButton() {
  return <button onClick={() => signIn("google")}>Ingresar con Google</button>;
}
