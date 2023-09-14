"use client";

import { CurrentRol, RolTypes } from "@/types";
import { useState } from "react";
import dynamic from "next/dynamic";
const ComercioRegisterForm = dynamic(
  () => import("@/components/ComercioRegisterForm")
);
export default function UpdateProfile() {
  const [currentRol, setCurrentRol] = useState<CurrentRol>("");
  const handleChangeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value as CurrentRol;
    setCurrentRol(val);
  };
  return (
    <div>
      <select
        value={currentRol}
        onChange={handleChangeState}
        className="min-[200px]:w-[80vw] min-[500px]:w-[calc(99vw-100px)] min-[200px]:text-[4vw] min-[400px]:text-[16px] bg-black m-1 rounded-md p-1"
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
      {currentRol == "comercio" && <ComercioRegisterForm />}
    </div>
  );
}
