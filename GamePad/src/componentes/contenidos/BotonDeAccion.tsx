import React from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onCapturarLayout: (evento: LayoutChangeEvent) => void;
};

const BotonDeAccion = ({ onCapturarLayout }: Props) => {
  return (
    <View style={estilos.contenedor} onLayout={onCapturarLayout}>
      <View style={estilos.boton}>
        <Text style={estilos.texto}>Jump</Text>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
  },

  boton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 7,
  },

  texto: {
    color: "#2563EB",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});

export default BotonDeAccion;