import * as yup from "yup";

export const comercioRegisterSchema = yup.object({
  nombre: yup.string().required("El nombre es requerido"),
  email: yup
    .string()
    .email("Debes colocar un mail válido")
    .required("La dirección de correo electrónico es requerida"),
  telefono: yup
    .number()
    .typeError("El telefono debe ser un número")
    .integer("El telefono debe ser un número entero")
    // .min(10, "El teléfono debe tener al menos 10 dígitos")
    // .max(10, "El teléfono debe tener como máximo 10 dígitos")
    .required("El teléfono es requerido"),
  password: yup.string().required("La contraseña es requerida"),
  idNumber: yup
    .number()
    .typeError("La identificación debe ser un número")
    .required("El número de documento es requerido")
    .integer("La identificación debe ser un número entero"),
  idType: yup.string().required("El tipo de documento es requerido"),
  ciudad: yup.string().required("La ciudad es requerida"),
});
