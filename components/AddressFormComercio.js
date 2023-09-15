import { AddressAutofill } from "@mapbox/search-js-react";
//import { InputField } from "@/components/InputField";
import { useState } from "react";
//import { dotenv } from "dotenv";
import { direccionesValidas } from "@/types";
import Swal from "sweetalert2";
export default function AddressFormComercio({ email }) {
  //RECORDATORIO: RESTRINGIR ESTE FORMULARIO PARA NO GASTAR DEMASIADAS SESIONES
  //const env = dotenv.config().parsed;
  //const [address, setAddress] = useState("");
  //const [apartment, setApartment] = useState("");
  //const [city, setCity] = useState("");
  //const [state, setState] = useState("");
  //const [country, setCountry] = useState("");
  //const [postcode, setPostCode] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(formData, "test si funciona");
    if (
      direccionesValidas.city.includes(formData.city) &&
      direccionesValidas.country.includes(formData.country) &&
      direccionesValidas.postcode.includes(formData.postcode) &&
      direccionesValidas.state.includes(formData.state)
    ) {
      const data = { ...formData, email };
      console.log(data, "test info backend atornillar");

      await fetch(`api/address/comercio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async (response) => {
        console.log(response, "respuesta backned");
        if (response.status === 200) {
          Swal.fire("¡Éxito!", "Ciudad disponible", "success");
          //router.push("/");
        } else {
          const mensaje = await response.text();
          Swal.fire("¡ERROR!", mensaje, "error");
        }
      });
    } else {
      Swal.fire("¡ERROR!", "Ciudad no disponible", "error");
    }
  };
  //console.log(dotenv, "check .env");
  return (
    <form
      onSubmit={handleSubmit}
      className="min-[200px]:w-[76vw] min-[500px]:w-[calc(99vw-104px)] min-[200px]:text-[4vw] min-[400px]:text-[16px] bg-black m-1 rounded-md p-1"
    >
      <AddressAutofill accessToken={process.env.TOKEN_MAPBOX}>
        <input
          className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
          name="address"
          placeholder="Calle y altura"
          type="text"
          autoComplete="address-line1"
          onChange={handleChange}
        />
        <br></br>
      </AddressAutofill>
      <input
        className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
        name="city"
        placeholder="Ciudad"
        type="text"
        autoComplete="address-level2"
        onChange={handleChange}
        readOnly
      />
      <br></br>
      <input
        className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
        name="state"
        placeholder="Provincia"
        type="text"
        autoComplete="address-level1"
        onChange={handleChange}
        readOnly
      />
      <br></br>
      <input
        className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
        name="country"
        placeholder="Pais"
        type="text"
        autoComplete="country"
        onChange={handleChange}
        readOnly
      />
      <br></br>
      <input
        className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
        name="postcode"
        placeholder="Codigo Postal"
        type="text"
        autoComplete="postal-code"
        onChange={handleChange}
        readOnly
      />
      <br></br>
      <button
        type="submit"
        className="text-center bg-[#238523] rounded-md p-1 m-1 min-[200px]:text-[4vw] min-[400px]:text-[16px]"
      >
        Ver disponibilidad
      </button>
    </form>
  );
}
