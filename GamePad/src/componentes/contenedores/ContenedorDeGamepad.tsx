import React from "react";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BotonDeAccion from "../contenidos/BotonDeAccion";
import BotonParaSalir from "../contenidos/BotonParaSalir";
import DPadDeMovimiento from "../contenidos/DPadDeMovimiento";
import IndicadorDeConexion from "../contenidos/IndicadorDeConexion";

type Props = {
  onSalir: () => void;
  onCapturarLayoutDpad: (e: LayoutChangeEvent) => void;
  onCapturarLayoutArriba: (e: LayoutChangeEvent) => void;
  onCapturarLayoutAbajo: (e: LayoutChangeEvent) => void;
  onCapturarLayoutIzquierda: (e: LayoutChangeEvent) => void;
  onCapturarLayoutDerecha: (e: LayoutChangeEvent) => void;
  onCapturarLayoutSalto: (e: LayoutChangeEvent) => void;
  onProcesarToques: (e: GestureResponderEvent) => void;
};

const ContenedorDeGamepad = ({
  onSalir,
  onCapturarLayoutDpad,
  onCapturarLayoutArriba,
  onCapturarLayoutAbajo,
  onCapturarLayoutIzquierda,
  onCapturarLayoutDerecha,
  onCapturarLayoutSalto,
  onProcesarToques,
}: Props) => {
  return (
    <SafeAreaView style={estilos.pantalla}>
      <View style={estilos.encabezado}>
        <IndicadorDeConexion />
        <BotonParaSalir onSalir={onSalir} />
      </View>

      <View
        style={estilos.areaGamepad}
        onTouchStart={onProcesarToques}
        onTouchMove={onProcesarToques}
        onTouchEnd={onProcesarToques}
        onTouchCancel={onProcesarToques}
      >
        <View style={estilos.controles} pointerEvents="none">
          <DPadDeMovimiento
            onCapturarLayout={onCapturarLayoutDpad}
            onCapturarLayoutArriba={onCapturarLayoutArriba}
            onCapturarLayoutAbajo={onCapturarLayoutAbajo}
            onCapturarLayoutIzquierda={onCapturarLayoutIzquierda}
            onCapturarLayoutDerecha={onCapturarLayoutDerecha}
          />

          <BotonDeAccion onCapturarLayout={onCapturarLayoutSalto} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  encabezado: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E3E7EB",
  },

  areaGamepad: {
    flex: 1,
    position: "relative",
  },

  controles: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 45,
    paddingBottom: 10,
  },
});

export default ContenedorDeGamepad;