export type Props = {
  children?: React.ReactNode;
};
export const direccionesValidas = {
  city: ["Villa La Angostura"],
  country: ["ar"],
  postcode: ["Q8407"],
  state: ["Neuquén"],
};
export interface SessionServer {
  user: {
    rol?: string;
    name: string;
    email: string;
    image: string;
    direccion?: string;
    ciudad?: string;
    provincia?: string;
    pais?: string;
    id?: string;
  };
  expires?: string;
}
export interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
}

export type ComercioRegisterData = {
  nombre: "";
  telefonoFijo: "" | string;
  whatsapp: "";
  aliasMercadoPago: "";
  dias: "";
  horarios: "";
  logo: "";
  address: "";
};

export type CurrentRol = "" | "comercio" | "repartidor" | "cliente";
export const RolTypes = [
  {
    value: "",
    text: "Seleccione su tipo de cuenta",
  },
  {
    value: "comercio",
    text: "Soy un Comercio",
  },
  {
    value: "repartidor",
    text: "Soy un Repartidor",
  },
  {
    value: "cliente",
    text: "Soy un Cliente",
  },
];
