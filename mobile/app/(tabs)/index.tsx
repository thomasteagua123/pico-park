import { useRef, useState } from "react";

import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const socket = useRef<WebSocket | null>(null);

  const [ip, setIp] = useState("");

  const [connected, setConnected] = useState(false);

  const [inputs, setInputs] = useState({
    left: false,
    right: false,
    jump: false,
  });

  // ===== ENVIAR INPUTS =====

  const sendInputs = (newInputs: typeof inputs) => {
    setInputs(newInputs);

    socket.current?.send(JSON.stringify(newInputs));
  };

  // ===== CONECTAR =====

  const connect = () => {
    socket.current = new WebSocket(`ws://${ip}:3000`);

    socket.current.onopen = () => {
      console.log("CONECTADO");

      setConnected(true);
    };

    socket.current.onclose = () => {
      console.log("DESCONECTADO");

      setConnected(false);
    };
  };

  return (
    <View style={styles.container}>
      {/* ===== TITLE ===== */}

      <Text style={styles.title}>PICO PARK GAMEPAD</Text>

      {/* ===== INPUT IP ===== */}

      <TextInput
        placeholder="192.168.x.x"
        placeholderTextColor="#999"
        value={ip}
        onChangeText={setIp}
        style={styles.input}
      />

      {/* ===== CONNECT ===== */}

      <Pressable style={styles.connectButton} onPress={connect}>
        <Text style={styles.buttonText}>CONECTAR</Text>
      </Pressable>

      {/* ===== STATUS ===== */}

      <View
        style={[
          styles.status,
          {
            backgroundColor: connected ? "#00c853" : "#ff4d4d",
          },
        ]}
      />

      {/* ===== CONTROLES ===== */}

      <View style={styles.controls}>
        {/* IZQUIERDA */}

        <Pressable
          style={styles.moveButton}
          onPressIn={() =>
            sendInputs({
              ...inputs,
              left: true,
            })
          }
          onPressOut={() =>
            sendInputs({
              ...inputs,
              left: false,
            })
          }
        >
          <Text style={styles.buttonText}>◀</Text>
        </Pressable>

        {/* DERECHA */}

        <Pressable
          style={styles.moveButton}
          onPressIn={() =>
            sendInputs({
              ...inputs,
              right: true,
            })
          }
          onPressOut={() =>
            sendInputs({
              ...inputs,
              right: false,
            })
          }
        >
          <Text style={styles.buttonText}>▶</Text>
        </Pressable>

        {/* SALTO */}

        <Pressable
          style={styles.jumpButton}
          onPress={() =>
            sendInputs({
              ...inputs,
              jump: true,
            })
          }
        >
          <Text style={styles.buttonText}>A</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101018",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    backgroundColor: "#1e1e2f",
    color: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 18,
  },

  connectButton: {
    backgroundColor: "#4d9cff",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  controls: {
    marginTop: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  moveButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#303040",
    alignItems: "center",
    justifyContent: "center",
  },

  jumpButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#ff4d4d",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
  },

  status: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});
