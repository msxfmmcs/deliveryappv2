"use client";

import { useState } from "react";
import { CurrentRol, RolTypes } from "@/types";
import dynamic from "next/dynamic";
const AddressFormComercio = dynamic(
  () => import("@/components/AddressFormComercio")
);
export default function SelectTypeUser({ email }: { email: string }) {
  const [currentRol, setCurrentRol] = useState<CurrentRol>("");
  const handleChangeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value as CurrentRol;
    setCurrentRol(val);
  };
  console.log(email, "props de email xD");
  return (
    <div>
      <select
        value={currentRol}
        onChange={handleChangeState}
        className="min-[200px]:w-[77vw] min-[500px]:w-[calc(99vw-104px)] min-[200px]:text-[4vw] min-[400px]:text-[16px] bg-black m-1 rounded-md p-1"
      >
        {RolTypes.map((rol, index) => (
          <option
            key={`Rol_${index}`}
            value={rol.value}
            className="min-[200px]:text-[4vw] min-[400px]:text-[16px]"
          >
            {rol.text}
          </option>
        ))}
      </select>
      {currentRol == "comercio" && <AddressFormComercio email={email} />}
    </div>
  );
}
