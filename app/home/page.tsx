"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SessionServer } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect } from "react";
const SignOut = dynamic(() => import("@/components/SignOut"));

export default function Home() {
  //const session = (await getServerSession(authOptions)) as SessionServer;
  //if (!session) {
  //redirect("/");
  //}
  //let result = "no result";
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 2000,
    };
    const successCallback = (position: any) => {
      if (position.coords.accuracy > 10) {
        alert("The GPS accuracy isn't good enough");
      } else {
        alert(
          position.coords.latitude +
            "latitud" +
            position.coords.longitude +
            "longitud"
        );
      }
    };

    const errorCallback = (error: any) => {
      console.log(error, "error navigator");
    };
    navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );
    //const id = navigator.geolocation.watchPosition(
    //successCallback,
    //errorCallback
    //);
    //console.log(id, "test ID");
  });
  //console.log(session);
  /*
  <Image
        src={session.user.image}
        alt="foto de perfil"
        width={50}
        height={50}
        className="m-3"
      />
  */
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>
        {
          //session.user.name
        }
      </h1>
      <SignOut />
    </div>
  );
}
