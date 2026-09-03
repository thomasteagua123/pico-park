import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  direccionIp: string;
  onCambiarIp: (ip: string) => void;
  onConectarConIp: () => void;
  onAbrirEscanerQR: () => void;
};

const FormularioDeConexion = ({
  direccionIp,
  onCambiarIp,
  onConectarConIp,
  onAbrirEscanerQR,
}: Props) => {
  return (
    <View style={estilos.pantalla}>
      <View style={estilos.tarjeta}>
        <Text style={estilos.titulo}>Vincular GamePad</Text>

        <Text style={estilos.descripcion}>
          Conectá el control con la dirección IP del servidor
        </Text>

        <TextInput
          style={estilos.input}
          placeholder="192.168.1.39:3000"
          placeholderTextColor="#9CA3AF"
          value={direccionIp}
          onChangeText={onCambiarIp}
          keyboardType="default"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={estilos.botonPrincipal}
          onPress={onConectarConIp}
          activeOpacity={0.8}
        >
          <Text style={estilos.textoPrincipal}>
            Vincular con IP
          </Text>
        </TouchableOpacity>

        <View style={estilos.separador}>
          <View style={estilos.linea} />
          <Text style={estilos.o}>o</Text>
          <View style={estilos.linea} />
        </View>

        <TouchableOpacity
          style={estilos.botonSecundario}
          onPress={onAbrirEscanerQR}
          activeOpacity={0.8}
        >
          <Text style={estilos.textoSecundario}>
            Escanear código QR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  tarjeta: {
    width: "100%",
    maxWidth: 520,
    padding: 32,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  titulo: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },

  descripcion: {
    marginTop: 8,
    marginBottom: 28,
    color: "#6B7280",
    fontSize: 15,
    textAlign: "center",
  },

  input: {
    height: 54,
    width: "100%",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    color: "#111827",
    fontSize: 16,
  },

  botonPrincipal: {
    marginTop: 14,
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
  },

  textoPrincipal: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  separador: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  linea: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  o: {
    marginHorizontal: 12,
    color: "#9CA3AF",
    fontSize: 14,
  },

  botonSecundario: {
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  textoSecundario: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default FormularioDeConexion;