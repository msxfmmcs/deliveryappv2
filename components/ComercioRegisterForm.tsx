"use client";
import { ComercioRegisterData } from "@/types";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { comercioRegisterSchema } from "@/yupSchemas";

export default function ComercioRegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const initialValues: ComercioRegisterData = {
    nombre: "",
    telefonoFijo: "",
    whatsapp: "",
    aliasMercadoPago: "",
    dias: "",
    horarios: "",
    logo: "",
    direccion: "",
  };
  const submitHandler = async (values: ComercioRegisterData) => {
    setSubmitting(true);
    values.telefonoFijo = values.telefonoFijo.toString();
    const sendData = {
      ...values,
      rol: "comercio",
    };
    await fetch(`api/register/comercio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    }).then(async (response) => {
      //console.log(response);
      if (response.status === 200) {
        Swal.fire("¡Éxito!", "Tu cuenta se ha actualizado", "success");
        router.push("/home");
      } else {
        const mensaje = await response.text();
        Swal.fire("¡ERROR!", mensaje, "error");
      }
    });
    setSubmitting(false);
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          await submitHandler(values);
          actions.setSubmitting(false);
        }}
        validationSchema={comercioRegisterSchema}
      ></Formik>
    </div>
  );
}
