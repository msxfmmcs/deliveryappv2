"use client";
import { FormComercio2Data } from "@/types";
import { comercio2RegisterSchema } from "@/yupSchemas";
import { Form, Formik } from "formik";
import { useState } from "react";

export default function FormComercio2() {
  const inputArr = [
    {
      type: "time",
      value: "",
      id: 1,
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = (e: any) => {
    e.preventDefault();
    setArr((s: any) => {
      return [
        ...s,
        {
          type: "time",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e: any) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };
  return (
    <form>
      <h1>Horarios</h1>
      <h2>Lunes</h2>
      <h3>Hora de apertura</h3>
      {arr.map((item, i) => {
        return (
          <input
            onChange={handleChange}
            value={item.value}
            id={i}
            type={item.type}
            size={40}
          />
        );
      })}
      <h3>Hora de cierre</h3>
      {arr.map((item, i) => {
        return (
          <input
            onChange={handleChange}
            value={item.value}
            id={i}
            type={item.type}
            size={40}
          />
        );
      })}
      <button onClick={addInput}>Agregar turno</button>
    </form>
  );
}
