import React from "react";
import { StatusBar } from "expo-status-bar";

import FormularioDeConexion from "@/src/componentes/contenidos/FormularioDeConexion";
import PantallaDeEscaneoQR from "@/src/componentes/contenidos/PantallaDeEscaneoQR";
import ContenedorDeGamepad from "@/src/componentes/contenedores/ContenedorDeGamepad";

import useConexionAlServidor from "@/src/hooks/useConexionAlServidor";
import useEscanerQR from "@/src/hooks/useEscanerQR";
import useControlesDeGamepad from "@/src/hooks/useControlesDeGamepad";

const App = () => {
  const conexion = useConexionAlServidor();

  const {
    estaConectado,
    direccionIp,
    setDireccionIp,
    conectarAlServidor,
    desconectarDelServidor,
    enviarEventoDeControl,
  } = conexion;

  const conectarPorQR = (ip: string) => {
    setDireccionIp(ip);
    conectarAlServidor(ip);
  };

  const escaner = useEscanerQR(conectarPorQR);

  const {
    estaEscaneando,
    abrirEscanerQR,
    cerrarEscanerQR,
    handleQREscaneado,
  } = escaner;

  const controles = useControlesDeGamepad(
    (tecla) => enviarEventoDeControl("keydown", tecla),
    (tecla) => enviarEventoDeControl("keyup", tecla)
  );

  const {
    layoutDpad,
    layoutBotonSalto,
    layoutBotonArriba,
    layoutBotonAbajo,
    layoutBotonIzquierda,
    layoutBotonDerecha,
    capturarLayoutDeZona,
    procesarToques,
  } = controles;

  if (estaConectado) {
    return (
      <>
        <StatusBar hidden />
        <ContenedorDeGamepad
          onSalir={desconectarDelServidor}
          onProcesarToques={procesarToques}
          onCapturarLayoutDpad={capturarLayoutDeZona(layoutDpad)}
          onCapturarLayoutSalto={capturarLayoutDeZona(layoutBotonSalto)}
          onCapturarLayoutArriba={capturarLayoutDeZona(layoutBotonArriba)}
          onCapturarLayoutAbajo={capturarLayoutDeZona(layoutBotonAbajo)}
          onCapturarLayoutIzquierda={capturarLayoutDeZona(layoutBotonIzquierda)}
          onCapturarLayoutDerecha={capturarLayoutDeZona(layoutBotonDerecha)}
        />
      </>
    );
  }

  if (estaEscaneando) {
    return (
      <>
        <StatusBar hidden />
        <PantallaDeEscaneoQR
          onCancelar={cerrarEscanerQR}
          onQREscaneado={handleQREscaneado}
        />
      </>
    );
  }

  return (
    <>
      <StatusBar hidden />
      <FormularioDeConexion
        direccionIp={direccionIp}
        onCambiarIp={setDireccionIp}
        onAbrirEscanerQR={abrirEscanerQR}
        onConectarConIp={() => conectarAlServidor()}
      />
    </>
  );
};

export default App;

