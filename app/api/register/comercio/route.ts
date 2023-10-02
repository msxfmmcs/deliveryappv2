import prisma from "@/lib/prisma";
/*
{
  //address: 'Las Frambuesas 103',
  //state: 'Neuquén',
  //city: 'Villa La Angostura',
  //country: 'ar',
  //postcode: 'Q8407',
  nombreComercio: 'Puerto Pirata',
  telefonoFijo: '44825800',
  //whatsapp: '5492944558711',
  aliasMercadoPago: 'puerto.pirata',
  //email: 'marcoscuadrado744@gmail.com',
  lunes: [ '12:00', '16:00', '20:00', '23:30' ],
  martes: [],
  miercoles: [ '12:00', '16:00', '20:00', '23:30' ],
  jueves: [ '12:00', '16:00', '20:00', '23:30' ],
  viernes: [ '12:00', '16:00', '20:00', '23:30' ],
  sabado: [ '12:00', '16:00', '20:00', '23:30' ],
  domingo: [ '12:00', '16:00', '20:00', '23:30' ],
  logo: urlstring
}
*/
export async function POST(request: Request) {
  const body = await request.json();

  //console.log(body, "body backend");
  const newComercio = await prisma.usuarios.create({
    data: {
      direccion: body.address,
      ciudad: body.city,
      provincia: body.state,
      email: body.email,
      codigoPostal: body.postcode,
      pais: body.country,
      rol: "comercio",
      whatsapp: body.whatsapp,
      telefonoFijo: body.telefonoFijo,
      nombreComercio: body.nombreComercio,
      logo: body.logo,
      aliasMercadoPago: body.aliasMercadoPago,
      horarios: body.horarios,
    },
  });
  return new Response("Comercio registrado con exito", { status: 200 });
}
