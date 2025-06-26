import type { jugador } from "../../../../types/types";

export function handleAgregarJugador(
  nombreJugador: string,
  apellido: string,
  cedula: string,
  nroCamiseta: string | number,
  carrera: string,
  titular: boolean,
  setMensajeError: React.Dispatch<React.SetStateAction<string>>,
  setNombreJugador: React.Dispatch<React.SetStateAction<string>>,
  setApellido: React.Dispatch<React.SetStateAction<string>>,
  setNroCamiseta: React.Dispatch<React.SetStateAction<string | number>>,
  setCarrera: React.Dispatch<React.SetStateAction<string>>,
  setCedula: React.Dispatch<React.SetStateAction<string>>,
  setTitular: React.Dispatch<React.SetStateAction<boolean>>,
  onSubmit: (jugador: jugador) => void
): void {
  // validando que los campos no esten vacios
  if (
    nombreJugador === "" ||
    apellido === "" ||
    cedula === "" ||
    nroCamiseta === "" ||
    carrera === ""
  ) {
    setMensajeError("⚠️ No se pueden dejar campos vacíos.");

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setMensajeError("");
    }, 1000);

    return;
  }

  // Limpiar error si estaba
  setMensajeError("");

  // Agregar jugador
  onSubmit({
    nombre: nombreJugador,
    apellido,
    cedula,
    nroCamiseta,
    carrera,
    titular,
    amarilla: 0,
    roja: 0,
    goles: 0,
  });

  // Limpiar campos
  setNombreJugador("");
  setApellido("");
  setNroCamiseta("");
  setCarrera("");
  setCedula("");
  setTitular(true);
}
