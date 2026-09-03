import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type Props = {
  onSalir: () => void;
};

const BotonParaSalir = ({ onSalir }: Props) => {
  return (
    <TouchableOpacity
      style={estilos.boton}
      onPress={onSalir}
      activeOpacity={0.75}
    >
      <Text style={estilos.texto}>Salir</Text>
    </TouchableOpacity>
  );
};

const estilos = StyleSheet.create({
  boton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  texto: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default BotonParaSalir;