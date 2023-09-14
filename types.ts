export type Props = {
  children?: React.ReactNode;
};
export type SessionServer = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};
export type ComercioRegisterData = {
  nombre: "";
  telefonoFijo: "" | string;
  whatsapp: "";
  aliasMercadoPago: "";
  dias: "";
  horarios: "";
  logo: "";
  direccion: "";
};

export const buttonStyle =
  "bg-[#238523] rounded-md p-1 min-[200px]:w-[calc(20vw-10px)] m-1 min-[500px]:w-[90px] min-[200px]:text-[4vw] min-[400px]:text-[16px]";
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
