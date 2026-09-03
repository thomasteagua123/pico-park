import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  onQREscaneado: (data: { data: string }) => void;
  onCancelar: () => void;
};

const PantallaDeEscaneoQR = ({
  onQREscaneado,
  onCancelar,
}: Props) => {
  const [permiso] = useCameraPermissions();

  if (!permiso?.granted) {
    return (
      <SafeAreaView style={estilos.pantalla}>
        <View style={estilos.mensaje}>
          <Text style={estilos.titulo}>Acceso a la cámara</Text>

          <Text style={estilos.descripcion}>
            Necesitamos acceso a la cámara para escanear el código QR.
          </Text>

          <TouchableOpacity
            style={estilos.botonCancelar}
            onPress={onCancelar}
            activeOpacity={0.8}
          >
            <Text style={estilos.textoCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.pantalla}>
      <CameraView
        style={estilos.camara}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={onQREscaneado}
      />

      <View style={estilos.superposicion}>
        <View style={estilos.zonaEscaneo}>
          <View style={estilos.marco}>
            <View style={estilos.esquinaSuperiorIzquierda} />
            <View style={estilos.esquinaSuperiorDerecha} />
            <View style={estilos.esquinaInferiorIzquierda} />
            <View style={estilos.esquinaInferiorDerecha} />
          </View>

          <View style={estilos.mensajeEscaneo}>
            <Text style={estilos.instruccion}>
              Apuntá al código QR
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={estilos.botonCancelarCamara}
          onPress={onCancelar}
          activeOpacity={0.8}
        >
          <Text style={estilos.textoCancelarCamara}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#111827",
  },

  camara: {
    flex: 1,
  },

  superposicion: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },

  zonaEscaneo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

 marco: {
  width: 200,
  height: 200,
  position: "relative",
},

  esquinaSuperiorIzquierda: {
  position: "absolute",
  top: 0,
  left: 0,
  width: 35,
  height: 35,
  borderTopWidth: 4,
  borderLeftWidth: 4,
  borderColor: "#FFFFFF",
},

esquinaSuperiorDerecha: {
  position: "absolute",
  top: 0,
  right: 0,
  width: 35,
  height: 35,
  borderTopWidth: 4,
  borderRightWidth: 4,
  borderColor: "#FFFFFF",
},

esquinaInferiorIzquierda: {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: 35,
  height: 35,
  borderBottomWidth: 4,
  borderLeftWidth: 4,
  borderColor: "#FFFFFF",
},

esquinaInferiorDerecha: {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 35,
  height: 35,
  borderBottomWidth: 4,
  borderRightWidth: 4,
  borderColor: "#FFFFFF",
},

  mensajeEscaneo: {
    marginTop: 28,
  },

  instruccion: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  botonCancelarCamara: {
    marginBottom: 30,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    minWidth: 140,
    alignItems: "center",
  },

  textoCancelarCamara: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },

  mensaje: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  titulo: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },

  descripcion: {
    color: "#6B7280",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 23,
  },

  botonCancelar: {
    paddingHorizontal: 30,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#2563EB",
  },

  textoCancelar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default PantallaDeEscaneoQR;