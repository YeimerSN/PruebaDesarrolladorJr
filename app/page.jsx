"use client"
import { useEffect, useState } from 'react';
import { obtenerDatos } from '../lib/postgraphile';

export default function Datos() {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      const datos = await obtenerDatos();
      setDepartamentos(datos);
    }

    cargarDatos();
  }, []);

  return (
    <div>
      <h1>Prueba Desarrollador de Software Jr</h1>
      <div>
        Esta prueba la desarrollo Yeimer Serrano, en el github se encuentra el codigo <br />

        Permite crear las diferentes etidades, listarlas y eliminarlas <br />

        Es recomendable usar el menú que se ecnuentra en la parte izquierda.
      </div>
    </div>
  );
}