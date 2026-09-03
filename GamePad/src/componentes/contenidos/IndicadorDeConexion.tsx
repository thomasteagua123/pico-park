import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

const IndicadorDeConexion = () => {
  return (
    <View style={estilos.contenedor}>
      <View style={estilos.indicador} />
      <Text style={estilos.texto}>Conectado</Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: "#ECFDF3",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  indicador: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 7,
    backgroundColor: "#22C55E",
  },

  texto: {
    color: "#15803D",
    fontSize: 13,
    fontWeight: "700",
  },
});

export default IndicadorDeConexion;