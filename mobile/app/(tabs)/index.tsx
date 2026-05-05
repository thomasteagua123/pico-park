import { useRef, useState } from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";

export default function App() {
  const [connected, setConnected] =
  useState(false);

const [status, setStatus] =
  useState("DESCONECTADO");
  const socket = useRef<WebSocket | null>(null);

  const [ip, setIp] = useState("192.168.1.3");

  const connectToServer  = () => {

  console.log("IP ->", ip);

  const ws = new WebSocket(
    `ws://${ip}:3000`
  );

  ws.onopen = () => {

    console.log("CONECTADO");

    ws.send(JSON.stringify({
      type: "join"
    }));
  };
};


  const [inputs, setInputs] = useState({
    left: false,
    right: false,
    jump: false
  });
  const ws = new WebSocket(
  `ws://${ip}:3000`
);

ws.onopen = () => {

  console.log("CONECTADO");

  ws.send(JSON.stringify({
    type: "join"
  }));
};

  // ===== ENVIAR INPUTS =====

  const sendInputs = (
    newInputs: typeof inputs
  ) => {

    setInputs(newInputs);

    if (
      socket.current &&
      connected
    ) {

      socket.current.send(
        JSON.stringify(newInputs)
      );
    }
  };

  // ===== CONECTAR =====

  const connect = () => {

    try {

      setStatus("CONECTANDO...");

      console.log(
        `INTENTANDO -> ws://${ip}:3000`
      );

      socket.current = new WebSocket(
        `ws://${ip}:3000`
      );

      socket.current.onopen = () => {

        console.log("CONECTADO");

        setConnected(true);

        setStatus("CONECTADO");
      };

      socket.current.onclose = () => {

        console.log("DESCONECTADO");

        setConnected(false);

        setStatus("DESCONECTADO");
      };

      socket.current.onerror = (error) => {

        console.log("ERROR WS", error);

        setStatus("ERROR");

        Alert.alert(
          "ERROR",
          "No se pudo conectar al host"
        );
      };

    } catch (err) {

      console.log(err);

      setStatus("ERROR");
    }
  };

  return (
    <View style={styles.container}>

      {/* TITLE */}

      <Text style={styles.title}>
        PICO PARK GAMEPAD
      </Text>

      {/* INPUT */}

      <TextInput
        placeholder="192.168.1.3"
        placeholderTextColor="#999"
        value={ip}
        onChangeText={setIp}
        style={styles.input}
      />

      {/* BUTTON */}

      <Pressable
        style={styles.connectButton}
       onPress={connectToServer}
      >
        <Text style={styles.buttonText}>
          CONECTAR
        </Text>
      </Pressable>

      {/* STATUS */}

      <Text style={styles.statusText}>
        {status}
      </Text>

      {/* CONTROLS */}

      <View style={styles.controls}>

        {/* LEFT */}

        <Pressable
          style={styles.moveButton}
          onPressIn={() =>
            sendInputs({
              ...inputs,
              left: true
            })
          }
          onPressOut={() =>
            sendInputs({
              ...inputs,
              left: false
            })
          }
        >
          <Text style={styles.buttonText}>
            ◀
          </Text>
        </Pressable>

        {/* RIGHT */}

        <Pressable
          style={styles.moveButton}
          onPressIn={() =>
            sendInputs({
              ...inputs,
              right: true
            })
          }
          onPressOut={() =>
            sendInputs({
              ...inputs,
              right: false
            })
          }
        >
          <Text style={styles.buttonText}>
            ▶
          </Text>
        </Pressable>

        {/* JUMP */}

        <Pressable
          style={styles.jumpButton}
          onPress={() =>
            sendInputs({
              ...inputs,
              jump: true
            })
          }
        >
          <Text style={styles.buttonText}>
            A
          </Text>
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
    padding: 20
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30
  },

  input: {
    width: "100%",
    backgroundColor: "#1e1e2f",
    color: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 18
  },

  connectButton: {
    backgroundColor: "#4d9cff",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  controls: {
    marginTop: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  moveButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#303040",
    alignItems: "center",
    justifyContent: "center"
  },

  jumpButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#ff4d4d",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold"
  },

  statusText: {
    color: "white",
    fontSize: 18,
    marginTop: 10
  }
});