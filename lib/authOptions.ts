import { SessionServer } from "@/types";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session }: any) => {
      //console.log("Session Callback", session);
      /*
      session = {
  user: {
    name: 'Marcos Cuadrado',
    email: 'marcoscuadrado744@gmail.com',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocJAfxbonm-F9EKIThdhoaapUB9mOkv5C_RNK1O2O-1y=s96-c'
  },
  expires: '2023-10-14T22:15:11.338Z'
}
      */
      const usuario = await prisma.usuarios.findUnique({
        where: {
          email: session.user.email,
        },
      });
      console.log(usuario, "callback usuario test");
      return {
        ...session,
        user: {
          ...session.user,
          direccion: usuario?.direccion,
          ciudad: usuario?.ciudad,
          provincia: usuario?.provincia,
          pais: usuario?.pais,
          rol: usuario?.rol,
          id: usuario?.id,
          //HACER UNA LLAMADA A SUPABASE PARA QUE CONSULTE INFO
        },
      };
    },
  },
};
