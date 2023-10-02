import { AddressAutofill } from "@mapbox/search-js-react";
import { useState } from "react";
import { direccionesValidas } from "@/types";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
export default function RegisterFormComercio({ email }) {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [turnosLunes, setTurnosLunes] = useState([0]);
  const [turnosMartes, setTurnosMartes] = useState([0]);
  const [turnosMiercoles, setTurnosMiercoles] = useState([0]);
  const [turnosJueves, setTurnosJueves] = useState([0]);
  const [turnosViernes, setTurnosViernes] = useState([0]);
  const [turnosSabado, setTurnosSabado] = useState([0]);
  const [turnosDomingo, setTurnosDomingo] = useState([0]);
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(formData, "formData test");
    //CHECK PARTE 3 FORMULARIO
    const emptyString = "";
    if (
      formData.nombreComercio === undefined ||
      formData.whatsapp === undefined ||
      formData.aliasMercadoPago === undefined ||
      formData.nombreComercio === emptyString ||
      formData.aliasMercadoPago === emptyString
    ) {
      //console.log(formData, "test formdata");
      return Swal.fire(
        "¡ERROR!",
        "Todos los campos son obligatorios menos el de telefono fijo",
        "error"
      );
    } else {
      console.log(formData.whatsapp, "test formdata");
      formData.nombreComercio = formData.nombreComercio.trim();
      formData.aliasMercadoPago = formData.aliasMercadoPago.trim();
      formData.whatsapp = formData.whatsapp.toString();
      if (formData.telefonoFijo !== undefined) {
        formData.telefonoFijo = formData.telefonoFijo.toString();
      }
    }
    let allKeys = Object.keys(formData);
    function startsWithNumber(str) {
      return /^\d/.test(str);
    }
    allKeys = allKeys.filter((key) => startsWithNumber(key));
    //console.log(allKeys, "allKeys test");
    allKeys.sort();
    if (allKeys.length < 2) {
      return Swal.fire("¡ERROR!", "Coloca por lo menos un turno", "error");
    }
    let temp_obj = {};
    for (let i = 0; i < allKeys.length; i++) {
      temp_obj[allKeys[i]] = formData[allKeys[i]];
    }
    if (
      direccionesValidas.city.includes(formData.city) &&
      direccionesValidas.country.includes(formData.country) &&
      direccionesValidas.postcode.includes(formData.postcode) &&
      direccionesValidas.state.includes(formData.state)
    ) {
      if (formData.address === undefined || formData.address === emptyString) {
        return Swal.fire("¡ERROR!", "Coloca una direccion", "error");
      }
      const data = {
        ...formData,
        email,
        horarios: {
          lunes: [],
          martes: [],
          miercoles: [],
          jueves: [],
          viernes: [],
          sabado: [],
          domingo: [],
        },
      };
      for (const key in temp_obj) {
        if (key.endsWith("-lunes")) {
          data.horarios.lunes.push(temp_obj[key]);
        } else if (key.endsWith("-martes")) {
          data.horarios.martes.push(temp_obj[key]);
        } else if (key.endsWith("-miercoles")) {
          data.horarios.miercoles.push(temp_obj[key]);
        } else if (key.endsWith("-jueves")) {
          data.horarios.jueves.push(temp_obj[key]);
        } else if (key.endsWith("-viernes")) {
          data.horarios.viernes.push(temp_obj[key]);
        } else if (key.endsWith("-sabado")) {
          data.horarios.sabado.push(temp_obj[key]);
        } else if (key.endsWith("-domingo")) {
          data.horarios.domingo.push(temp_obj[key]);
        }
      }
      function arraySortedOrNot(arr, n) {
        if (n == 1 || n == 0) return 1;
        if (arr[n - 1] < arr[n - 2]) return 0;
        return arraySortedOrNot(arr, n - 1);
      }
      if (
        arraySortedOrNot(data.horarios.lunes, data.horarios.lunes.length) ===
          0 ||
        arraySortedOrNot(data.horarios.martes, data.horarios.martes.length) ===
          0 ||
        arraySortedOrNot(
          data.horarios.miercoles,
          data.horarios.miercoles.length
        ) === 0 ||
        arraySortedOrNot(data.horarios.jueves, data.horarios.jueves.length) ===
          0 ||
        arraySortedOrNot(
          data.horarios.viernes,
          data.horarios.viernes.length
        ) === 0 ||
        arraySortedOrNot(data.horarios.sabado, data.horarios.sabado.length) ===
          0 ||
        arraySortedOrNot(
          data.horarios.domingo,
          data.horarios.domingo.length
        ) === 0
      ) {
        Swal.fire(
          "¡ERROR!",
          "Hora de apertura mayor a la hora de cierre",
          "error"
        );
      }
      //console.log(data, "test info backend atornillar");

      if (
        data.horarios.lunes.length % 2 === 0 &&
        data.horarios.martes.length % 2 === 0 &&
        data.horarios.miercoles.length % 2 === 0 &&
        data.horarios.jueves.length % 2 === 0 &&
        data.horarios.viernes.length % 2 === 0 &&
        data.horarios.sabado.length % 2 === 0 &&
        data.horarios.domingo.length % 2 === 0
      ) {
        for (let key in data) {
          //console.log(key, "test key");
          if (startsWithNumber(key)) {
            delete data[key];
          }
        }
        const formData2 = new FormData();
        formData2.append("file", image);
        formData2.append("upload_preset", "vf2khbcr");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dkryep244/image/upload",
          {
            method: "POST",
            body: formData2,
          }
        ).then((res) => res.json());
        data.logo = response.secure_url;
        //console.log(data, "data test");
        await fetch(`api/register/comercio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(async (response) => {
          console.log(response, "respuesta backned");
          if (response.status === 200) {
            const mensaje = await response.text();
            Swal.fire("¡Éxito!", mensaje, "success");
            //redirect("/register/comercio");
            //window.location.replace(`${process.env.URL}/home`);
            router.push("/home");
          } else {
            const mensaje = await response.text();
            Swal.fire("¡ERROR!", mensaje, "error");
          }
        });
      } else {
        Swal.fire("¡ERROR!", "Turnos mal puestos, intentelo de nuevo", "error");
      }
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
      <div className="flex flex-wrap ">
        <div className="bg-[#112A46] m-1">
          <p>Lunes</p>
          <button
            className={
              turnosLunes.length === 0 ? "m-1 bg-[#ff0000]" : "m-1 bg-black"
            }
            onClick={(e) => {
              e.preventDefault();
              const obj = formData;
              for (const key in obj) {
                if (key.endsWith("-lunes")) {
                  delete obj[key];
                }
              }
              setFormData(obj);
              setTurnosLunes([]);
            }}
          >
            Cerrado
          </button>
          <br></br>
          {turnosLunes.map((counter) => {
            const counter2 = counter + 1;
            return (
              <div className="flex flex-col" key={counter}>
                Hora de apertura<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter.toString()}-lunes`}
                ></input>
                <br></br>
                Hora de cierre<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  name={`${counter2.toString()}-lunes`}
                  onChange={handleChange}
                ></input>
                <br></br>
              </div>
            );
          })}
          <div className="flex flex-col">
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosLunes((s) => {
                  if (s.length === 0) {
                    return [...s, 0];
                  } else {
                    const numero = s[s.length - 1] + 2;
                    return [...s, numero];
                  }
                });
              }}
            >
              Agregar turno
            </button>
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosLunes(turnosLunes.slice(0, -1));
              }}
            >
              Sacar turno
            </button>
          </div>
        </div>
        <div className="bg-[#61195E] m-1">
          <p>Martes</p>
          <button
            className={
              turnosMartes.length === 0 ? "m-1 bg-[#ff0000]" : "m-1 bg-black"
            }
            onClick={(e) => {
              e.preventDefault();
              const obj = formData;
              for (const key in obj) {
                if (key.endsWith("-martes")) {
                  delete obj[key];
                }
              }
              setFormData(obj);
              setTurnosMartes([]);
            }}
          >
            Cerrado
          </button>
          <br></br>
          {turnosMartes.map((counter) => {
            const counter2 = counter + 1;
            return (
              <div className="flex flex-col" key={counter}>
                Hora de apertura<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter.toString()}-martes`}
                ></input>
                <br></br>
                Hora de cierre<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter2.toString()}-martes`}
                ></input>
                <br></br>
              </div>
            );
          })}
          <div className="flex flex-col">
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosMartes((s) => {
                  if (s.length === 0) {
                    return [...s, 0];
                  } else {
                    const numero = s[s.length - 1] + 2;
                    return [...s, numero];
                  }
                });
              }}
            >
              Agregar turno
            </button>
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosMartes(turnosMartes.slice(0, -1));
              }}
            >
              Sacar turno
            </button>
          </div>
        </div>
        <div className="bg-[#112A46] m-1">
          <p>Miercoles</p>
          <button
            className={
              turnosMiercoles.length === 0 ? "m-1 bg-[#ff0000]" : "m-1 bg-black"
            }
            onClick={(e) => {
              e.preventDefault();
              const obj = formData;
              for (const key in obj) {
                if (key.endsWith("-miercoles")) {
                  delete obj[key];
                }
              }
              setFormData(obj);
              setTurnosMiercoles([]);
            }}
          >
            Cerrado
          </button>
          <br></br>
          {turnosMiercoles.map((counter) => {
            const counter2 = counter + 1;
            return (
              <div className="flex flex-col" key={counter}>
                Hora de apertura<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter.toString()}-miercoles`}
                ></input>
                <br></br>
                Hora de cierre<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter2.toString()}-miercoles`}
                ></input>
                <br></br>
              </div>
            );
          })}
          <div className="flex flex-col">
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosMiercoles((s) => {
                  if (s.length === 0) {
                    return [...s, 0];
                  } else {
                    const numero = s[s.length - 1] + 2;
                    return [...s, numero];
                  }
                });
              }}
            >
              Agregar turno
            </button>
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosMiercoles(turnosMiercoles.slice(0, -1));
              }}
            >
              Sacar turno
            </button>
          </div>
        </div>
        <div className="bg-[#61195E] m-1">
          <p>Jueves</p>
          <button
            className={
              turnosJueves.length === 0 ? "m-1 bg-[#ff0000]" : "m-1 bg-black"
            }
            onClick={(e) => {
              e.preventDefault();
              const obj = formData;
              for (const key in obj) {
                if (key.endsWith("-jueves")) {
                  delete obj[key];
                }
              }
              setFormData(obj);
              setTurnosJueves([]);
            }}
          >
            Cerrado
          </button>
          <br></br>
          {turnosJueves.map((counter) => {
            const counter2 = counter + 1;
            return (
              <div className="flex flex-col" key={counter}>
                Hora de apertura<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter.toString()}-jueves`}
                ></input>
                <br></br>
                Hora de cierre<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter2.toString()}-jueves`}
                ></input>
                <br></br>
              </div>
            );
          })}
          <div className="flex flex-col">
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosJueves((s) => {
                  if (s.length === 0) {
                    return [...s, 0];
                  } else {
                    const numero = s[s.length - 1] + 2;
                    return [...s, numero];
                  }
                });
              }}
            >
              Agregar turno
            </button>
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosJueves(turnosJueves.slice(0, -1));
              }}
            >
              Sacar turno
            </button>
          </div>
        </div>
        <br></br>
        <div className="bg-[#112A46] m-1">
          <p>Viernes</p>
          <button
            className={
              turnosViernes.length === 0 ? "m-1 bg-[#ff0000]" : "m-1 bg-black"
            }
            onClick={(e) => {
              e.preventDefault();
              const obj = formData;
              for (const key in obj) {
                if (key.endsWith("-viernes")) {
                  delete obj[key];
                }
              }
              setFormData(obj);
              setTurnosViernes([]);
            }}
          >
            Cerrado
          </button>
          <br></br>
          {turnosViernes.map((counter) => {
            const counter2 = counter + 1;
            return (
              <div className="flex flex-col" key={counter}>
                Hora de apertura<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter.toString()}-viernes`}
                ></input>
                <br></br>
                Hora de cierre<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter2.toString()}-viernes`}
                ></input>
                <br></br>
              </div>
            );
          })}
          <div className="flex flex-col">
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosViernes((s) => {
                  if (s.length === 0) {
                    return [...s, 0];
                  } else {
                    const numero = s[s.length - 1] + 2;
                    return [...s, numero];
                  }
                });
              }}
            >
              Agregar turno
            </button>
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosViernes(turnosViernes.slice(0, -1));
              }}
            >
              Sacar turno
            </button>
          </div>
        </div>
        <div className="bg-[#61195E] m-1">
          <p>Sabado</p>
          <button
            className={
              turnosSabado.length === 0 ? "m-1 bg-[#ff0000]" : "m-1 bg-black"
            }
            onClick={(e) => {
              e.preventDefault();
              const obj = formData;
              for (const key in obj) {
                if (key.endsWith("-sabado")) {
                  delete obj[key];
                }
              }
              setFormData(obj);
              setTurnosSabado([]);
            }}
          >
            Cerrado
          </button>
          <br></br>
          {turnosSabado.map((counter) => {
            const counter2 = counter + 1;
            return (
              <div className="flex flex-col" key={counter}>
                Hora de apertura<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter.toString()}-sabado`}
                ></input>
                <br></br>
                Hora de cierre<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter2.toString()}-sabado`}
                ></input>
                <br></br>
              </div>
            );
          })}
          <div className="flex flex-col">
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosSabado((s) => {
                  if (s.length === 0) {
                    return [...s, 0];
                  } else {
                    const numero = s[s.length - 1] + 2;
                    return [...s, numero];
                  }
                });
              }}
            >
              Agregar turno
            </button>
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosSabado(turnosSabado.slice(0, -1));
              }}
            >
              Sacar turno
            </button>
          </div>
        </div>
        <div className="bg-[#112A46] m-1 ">
          <p>Domingo</p>
          <button
            className={
              turnosDomingo.length === 0 ? "m-1 bg-[#ff0000]" : "m-1 bg-black"
            }
            onClick={(e) => {
              e.preventDefault();
              const obj = formData;
              for (const key in obj) {
                if (key.endsWith("-domingo")) {
                  delete obj[key];
                }
              }
              setFormData(obj);
              setTurnosDomingo([]);
            }}
          >
            Cerrado
          </button>
          <br></br>
          {turnosDomingo.map((counter) => {
            const counter2 = counter + 1;
            return (
              <div className="flex flex-col" key={counter}>
                Hora de apertura<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter.toString()}-domingo`}
                ></input>
                <br></br>
                Hora de cierre<br></br>
                <input
                  type="time"
                  className="m-1 bg-black"
                  onChange={handleChange}
                  name={`${counter2.toString()}-domingo`}
                ></input>
                <br></br>
              </div>
            );
          })}
          <div className="flex flex-col">
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosDomingo((s) => {
                  if (s.length === 0) {
                    return [...s, 0];
                  } else {
                    const numero = s[s.length - 1] + 2;
                    return [...s, numero];
                  }
                });
              }}
            >
              Agregar turno
            </button>
            <button
              className="bg-black m-1"
              onClick={(e) => {
                e.preventDefault();
                setTurnosDomingo(turnosDomingo.slice(0, -1));
              }}
            >
              Sacar turno
            </button>
          </div>
        </div>
      </div>
      <input
        type="text"
        name="nombreComercio"
        placeholder="Nombre de tu comercio"
        onChange={handleChange}
        className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
      ></input>
      <input
        type="number"
        name="telefonoFijo"
        placeholder="Teléfono fijo (opcional)"
        onChange={handleChange}
        className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
      ></input>
      <input
        type="number"
        name="whatsapp"
        placeholder="Whatsapp +5492944xxxxxx"
        onChange={handleChange}
        className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
      ></input>
      <p className="m-1">Suba el logo de su comercio</p>
      <input
        type="file"
        name="logo"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
        className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
      ></input>
      <input
        type="text"
        name="aliasMercadoPago"
        placeholder="Alias mercadopago"
        onChange={handleChange}
        className="m-1 rounded-md min-[200px]:w-[calc(76vw-10px)] min-[500px]:w-[calc(99vw-116px)] bg-[#238523]"
      ></input>
      <button
        type="submit"
        className="text-center bg-[#238523] rounded-md p-1 m-1 min-[200px]:text-[4vw] min-[400px]:text-[16px]"
      >
        Registrarse
      </button>
    </form>
  );
}
