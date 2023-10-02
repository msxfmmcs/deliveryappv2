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
    horarios?: {
      lunes: Array<string>;
      martes: Array<string>;
      miercoles: Array<string>;
      jueves: Array<string>;
      viernes: Array<string>;
      sabado: Array<string>;
      domingo: Array<string>;
    };
    nombreComercio?: string;
  };
  expires?: string;
}

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
