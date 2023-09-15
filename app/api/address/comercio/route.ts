import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  /*
  console.log(body, "llegada a backend");
  {
  address: 'Las Frambuesas 103',
  city: 'Villa La Angostura',
  state: 'Neuquén',
  country: 'ar',
  email: "marcoscuadrado744@gmail.com",
  postcode: 'Q8407',
  'address address-search': 'L',
  }
  */
  if (
    !body.address ||
    !body.city ||
    !body.state ||
    !body.country ||
    !body.email ||
    !body.postcode
  ) {
    return new Response("Faltan campos por completar", { status: 400 });
  }
  const comercio = await prisma.usuarios.findFirst({
    where: {
      email: body.email,
    },
  });
  if (comercio) {
    return new Response("Cuenta ya creada con ese email", { status: 400 });
  }
  const newComercio = await prisma.usuarios.create({
    data: {
      direccion: body.address,
      ciudad: body.city,
      provincia: body.state,
      email: body.email,
      codigoPostal: body.postcode,
      pais: body.country,
      rol: "comercio",
    },
  });
  return new Response("Direccion y rol registradas con exito", { status: 200 });
}
