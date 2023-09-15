//"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SessionServer } from "@/types";
//import dynamic from "next/dynamic";
//import Image from "next/image";
//import { useEffect, useState } from "react";

//0)order bookmarks
//reverse-geocoding API and geocoding (convertir direccion en latitud y latitud en direccion)
//1)reverse-geocoding its gonna be used to get the delivery-man position (only do it in case of
//dispute)
//2)write the relation between long,lat = address so i avoid doing the same consultations over and
//over again
//3)address form, reverse geocoding y geocoding would be all the necesary
//MAPBOX, 100.000 REQUEST GEOCODING/MONTLY/FREE, ADDRESS FORM 1000 SESIONES PER MONTH FREE
//4)idea: at the beggining i could do all the maps API by myself and later contract mapbox or
//positionstack when we expand to another cities
//5)make register of all:make it in a postgresql base (supabase)
//-all streets names
//-height in meters of streets
//6)use free api request in positionstack and mapbox, record every answer so i dont have to do it again
//7)idea: work only with cash until we are able to pay taxes for use mercadopago
//8)idea: use mapbox and positionstack with smurfs accounts (mapbox requires debit card)
//9)only use request when user wants to add new address
export default async function Home() {
  const session = (await getServerSession(authOptions)) as SessionServer;
  if (!session) {
    redirect("/");
  } else if (session.user.rol === undefined) {
    redirect("/register");
  }
  //let result = "no result";
  //const [location, setLocation] = useState("");
  //useEffect(() => {
  //const options = {
  //enableHighAccuracy: true,
  //timeout: 5000,
  //maximumAge: 2000,
  //};
  //const successCallback = (position: any) => {
  //if (position.coords.accuracy > 10) {
  //setLocation("The GPS accuracy isn't good enough");
  //} else {
  //setLocation(
  //position.coords.latitude +
  //" latitud, " +
  //position.coords.longitude +
  //" longitud"
  //);
  //}
  //};

  //const errorCallback = (error: any) => {
  //console.log(error, "error navigator");
  //};
  //navigator.geolocation.watchPosition(
  //successCallback,
  //errorCallback,
  //options
  //);
  //const id = navigator.geolocation.watchPosition(
  //successCallback,
  //errorCallback
  //);
  //console.log(id, "test ID");
  //});

  /*
  <Image
        src={session.user.image}
        alt="foto de perfil"
        width={50}
        height={50}
        className="m-3"
      />
  */
  console.log(session, "session xD");
  return (
    <div>
      <h1>Restaurantes</h1>
    </div>
  );
}
