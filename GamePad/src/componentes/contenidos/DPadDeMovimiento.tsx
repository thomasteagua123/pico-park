import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  onCapturarLayout: (evento: LayoutChangeEvent) => void;
  onCapturarLayoutArriba: (evento: LayoutChangeEvent) => void;
  onCapturarLayoutAbajo: (evento: LayoutChangeEvent) => void;
  onCapturarLayoutIzquierda: (evento: LayoutChangeEvent) => void;
  onCapturarLayoutDerecha: (evento: LayoutChangeEvent) => void;
};

const DPadDeMovimiento = ({
  onCapturarLayout,
  onCapturarLayoutArriba,
  onCapturarLayoutAbajo,
  onCapturarLayoutIzquierda,
  onCapturarLayoutDerecha,
}: Props) => {
  return (
    <View style={estilos.dpad} onLayout={onCapturarLayout}>
      <View style={estilos.filaSuperior}>
        <View
          style={estilos.botonDireccion}
          onLayout={onCapturarLayoutArriba}
        >
          <Feather name="chevron-up" size={34} color="#1F2937" />
        </View>
      </View>

      <View style={estilos.filaCentral}>
        <View
          style={estilos.botonDireccion}
          onLayout={onCapturarLayoutIzquierda}
        >
          <Feather name="chevron-left" size={34} color="#1F2937" />
        </View>

        <View style={estilos.centro} />

        <View
          style={estilos.botonDireccion}
          onLayout={onCapturarLayoutDerecha}
        >
          <Feather name="chevron-right" size={34} color="#1F2937" />
        </View>
      </View>

      <View style={estilos.filaInferior}>
        <View
          style={estilos.botonDireccion}
          onLayout={onCapturarLayoutAbajo}
        >
          <Feather name="chevron-down" size={34} color="#1F2937" />
        </View>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  dpad: {
    justifyContent: "center",
    alignItems: "center",
  },

  filaSuperior: {
    flexDirection: "row",
    justifyContent: "center",
  },

  filaCentral: {
    flexDirection: "row",
    alignItems: "center",
  },

  filaInferior: {
    flexDirection: "row",
    justifyContent: "center",
  },

  botonDireccion: {
    width: 70,
    height: 70,
    margin: 3,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8DEE5",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },

  centro: {
    width: 70,
    height: 70,
    margin: 3,
  },
});

export default DPadDeMovimiento;