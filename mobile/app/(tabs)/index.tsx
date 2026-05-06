import { useRef, useState } from "react";
import {
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";

export default function Index() {
  const socket = useRef<WebSocket | null>(null);
  const [ip, setIp] = useState("");
  const [connected, setConnected] = useState(false);
  const [playerId, setPlayerId] = useState<number | null>(null);

  // usamos ref para inputs para evitar stale closures en los PanResponders
  const inputsRef = useRef({ left: false, right: false, jump: false });
  const [inputsDisplay, setInputsDisplay] = useState({ left: false, right: false, jump: false });

  const sendInputs = (newInputs: typeof inputsRef.current) => {
    inputsRef.current = newInputs;
    setInputsDisplay({ ...newInputs });
    if (playerId === null) return;
    socket.current?.send(JSON.stringify({ ...newInputs, playerId }));
  };

  const connect = () => {
    if (!ip) return;
    socket.current = new WebSocket(`ws://${ip}:3000`);

    socket.current.onopen = () => {

  console.log("CONECTADO");

  setConnected(true);

  socket.current?.send(
    JSON.stringify({
      type: "join"
    })
  );
};

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "assigned") setPlayerId(data.playerId);
    };

    socket.current.onclose = () => {
      setConnected(false);
      setPlayerId(null);
    };
  };

  // ===== PAN RESPONDERS (multitouch) =====

  const leftResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        sendInputs({ ...inputsRef.current, left: true });
      },
      onPanResponderRelease: () => {
        sendInputs({ ...inputsRef.current, left: false });
      },
      onPanResponderTerminate: () => {
        sendInputs({ ...inputsRef.current, left: false });
      },
    })
  ).current;

  const rightResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        sendInputs({ ...inputsRef.current, right: true });
      },
      onPanResponderRelease: () => {
        sendInputs({ ...inputsRef.current, right: false });
      },
      onPanResponderTerminate: () => {
        sendInputs({ ...inputsRef.current, right: false });
      },
    })
  ).current;

  const jumpResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        sendInputs({ ...inputsRef.current, jump: true });
      },
      onPanResponderRelease: () => {
        sendInputs({ ...inputsRef.current, jump: false });
      },
      onPanResponderTerminate: () => {
        sendInputs({ ...inputsRef.current, jump: false });
      },
    })
  ).current;

  // ===== PANTALLA DE CONEXIÓN =====

  if (!connected) {
    return (
      <View style={styles.connectScreen}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>PICO</Text>
          <Text style={styles.logoSub}>PARK</Text>
        </View>

        <View style={styles.connectBox}>
          <Text style={styles.label}>IP DEL HOST</Text>
          <TextInput
            placeholder="192.168.x.x"
            placeholderTextColor="#444"
            value={ip}
            onChangeText={setIp}
            style={styles.input}
            keyboardType="numbers-and-punctuation"
          />
          <Pressable style={styles.connectButton} onPress={connect}>
            <Text style={styles.connectButtonText}>CONECTAR</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ===== GAMEPAD =====

  return (
    <View style={styles.gamepad}>

      {/* PLAYER BADGE */}
      <View style={[
        styles.badge,
        { backgroundColor: playerId === 1 ? "#ff4d4d" : "#4d9cff" }
      ]}>
        <Text style={styles.badgeText}>P{playerId}</Text>
      </View>

      {/* DPAD */}
      <View style={styles.dpad}>

        <View style={styles.dpadRow}>
          <View style={styles.dpadEmpty} />
          <View style={[styles.dpadBtn, styles.dpadBtnDisabled]}>
            <Text style={styles.dpadArrow}>▲</Text>
          </View>
          <View style={styles.dpadEmpty} />
        </View>

        <View style={styles.dpadRow}>

          {/* IZQUIERDA */}
          <View
            {...leftResponder.panHandlers}
            style={[
              styles.dpadBtn,
              inputsDisplay.left && styles.dpadBtnActive,
            ]}
          >
            <Text style={styles.dpadArrow}>◀</Text>
          </View>

          <View style={styles.dpadCenter} />

          {/* DERECHA */}
          <View
            {...rightResponder.panHandlers}
            style={[
              styles.dpadBtn,
              inputsDisplay.right && styles.dpadBtnActive,
            ]}
          >
            <Text style={styles.dpadArrow}>▶</Text>
          </View>

        </View>

        <View style={styles.dpadRow}>
          <View style={styles.dpadEmpty} />
          <View style={[styles.dpadBtn, styles.dpadBtnDisabled]}>
            <Text style={styles.dpadArrow}>▼</Text>
          </View>
          <View style={styles.dpadEmpty} />
        </View>

      </View>

      {/* BOTÓN SALTAR */}
      <View
        {...jumpResponder.panHandlers}
        style={[
          styles.jumpBtn,
          inputsDisplay.jump && styles.jumpBtnActive,
        ]}
      >
        <Text style={styles.jumpLabel}>A</Text>
        <Text style={styles.jumpSub}>SALTAR</Text>
      </View>

    </View>
  );
}

const DPAD_BTN = 72;

const styles = StyleSheet.create({
  connectScreen: {
    flex: 1,
    backgroundColor: "#0d0d1a",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 48,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 64,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 12,
  },
  logoSub: {
    fontSize: 28,
    fontWeight: "300",
    color: "#4d9cff",
    letterSpacing: 20,
    marginTop: -8,
  },
  connectBox: {
    width: "100%",
    gap: 16,
  },
  label: {
    color: "#555",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 4,
  },
  input: {
    backgroundColor: "#1a1a2e",
    color: "#ffffff",
    fontSize: 22,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2a2a40",
    letterSpacing: 2,
  },
  connectButton: {
    backgroundColor: "#4d9cff",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
  },
  connectButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 4,
  },
  gamepad: {
    flex: 1,
    backgroundColor: "#0d0d1a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  badge: {
    position: "absolute",
    top: 24,
    left: "50%",
    marginLeft: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 18,
  },
  dpad: {
    gap: 4,
  },
  dpadRow: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  dpadEmpty: {
    width: DPAD_BTN,
    height: DPAD_BTN,
  },
  dpadBtn: {
    width: DPAD_BTN,
    height: DPAD_BTN,
    backgroundColor: "#1e1e35",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2a2a50",
  },
  dpadBtnActive: {
    backgroundColor: "#2e2e55",
    borderColor: "#4d9cff",
  },
  dpadBtnDisabled: {
    opacity: 0.2,
  },
  dpadCenter: {
    width: DPAD_BTN,
    height: DPAD_BTN,
    backgroundColor: "#141428",
    borderRadius: 8,
  },
  dpadArrow: {
    color: "#8888bb",
    fontSize: 28,
  },
  jumpBtn: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ff4d4d22",
    borderWidth: 2,
    borderColor: "#ff4d4d55",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  jumpBtnActive: {
    backgroundColor: "#ff4d4d44",
    borderColor: "#ff4d4d",
  },
  jumpLabel: {
    color: "#ff4d4d",
    fontSize: 36,
    fontWeight: "900",
  },
  jumpSub: {
    color: "#ff4d4d88",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 3,
  },
});