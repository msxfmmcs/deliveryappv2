"use client";
import { FormComercio2Data } from "@/types";
import { comercio2RegisterSchema } from "@/yupSchemas";
import { Form, Formik } from "formik";
import { useState } from "react";

export default function FormComercio2() {
//test ssh  
  const inputArr = [
    {
      type: "time",
      value: "",
      id: 1,
    },
  ];
const inputArr2 = [
    {
      type: "time",
      value: "",
      id: 2,
    },
  ];
  const [arr, setArr] = useState(inputArr);
const [arr2, setArr2] = useState(inputArr2);
  const addInput = (e) => {
    e.preventDefault();
    //console.log(s[-1]["id"] + 2, "test id")
    setArr((s) => {
      //console.log(s[s.length - 1]["id"] + 2, "test id2")
      return [
        ...s,
        {
          type: "time",
          value: "",
          id: s[s.length - 1]["id"] + 2
        },
      ];
    });
    setArr2((s) => {
      //console.log(s, "test id2")
      return [
        ...s,
        {
          type: "time",
          value: "",
          id: s[s.length - 1]["id"] + 2
        },
      ];
    });
  };

  const addInput2 = (e) => {
    e.preventDefault();
    
    
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };
  
  const handleChange2 = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr2((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };
  //console.log(arr, "array1")
  //console.log(arr2, "array2")
  return (
    <form>
      <h1>Horarios</h1>
      <button className="bg-red">Lunes</button>
      <h3>Hora de apertura</h3>
      {arr.map((item, i) => {
        //console.log(item, "valor item")
        return (
          <input
            onChange={handleChange}
            value={item.value}
            id={item.id}
            type={item.type}
            size={40}
          />
        );
      })}
      <h3>Hora de cierre</h3>
      {arr2.map((item, i) => {
        return (
          <input
            onChange={handleChange2}
            value={item.value}
            id={item.id}
            type={item.type}
            size={40}
          />
        );
      })}
      <button onClick={addInput}>Agregar turno</button>
    </form>
  );
}
