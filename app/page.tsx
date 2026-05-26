"use client";

import { useState, useEffect, CSSProperties } from "react";

type Bebidas = {
  freskito: number;
  chupito: number;
  vino: number;
  cerveza: number;
};

type HistorialItem = {
  tipo: string;
  puntos: number;
  fecha: string;
};

const initialBebidas: Bebidas = {
  freskito: 0,
  chupito: 0,
  vino: 0,
  cerveza: 0,
};

export default function App() {
  const [score, setScore] = useState(0);

  const [bebidas, setBebidas] =
    useState<Bebidas>(initialBebidas);

  const [historial, setHistorial] =
    useState<HistorialItem[]>([]);

  const [showHistorial, setShowHistorial] =
    useState(false);

  // CARGAR DATOS
  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    const savedBebidas = localStorage.getItem("bebidas");
    const savedHistorial = localStorage.getItem("historial");

    if (savedScore) {
      setScore(parseInt(savedScore));
    }

    if (savedBebidas) {
      setBebidas(JSON.parse(savedBebidas));
    }

    if (savedHistorial) {
      setHistorial(JSON.parse(savedHistorial));
    }
  }, []);

  // NIVELES
  const getNivel = (score: number) => {
    if (score < 10) return "🍼 Novato";
    if (score < 25) return "😎 Entonado";
    if (score < 50) return "🔥 Máquina";
    if (score < 75) return "🍻 Bestia";
    return "☠️ Leyenda";
  };

  // EMOJIS
  const getEmoji = (tipo: string) => {
    switch (tipo) {
      case "freskito":
        return "🍸";

      case "chupito":
        return "🥃";

      case "vino":
        return "🍷";

      case "cerveza":
        return "🍺";

      case "vomito":
        return "🤢";

      default:
        return "🍹";
    }
  };

  // SUMAR PUNTOS
  const updateScore = (
    points: number,
    tipo: keyof Bebidas
  ) => {
    const newScore = score + points;

    const newBebidas = {
      ...bebidas,
      [tipo]: bebidas[tipo] + 1,
    };

    // NUEVO EVENTO
    const nuevoEvento: HistorialItem = {
      tipo,
      puntos: points,
      fecha: new Date().toLocaleString(),
    };

    const nuevoHistorial = [
      nuevoEvento,
      ...historial,
    ];

    setScore(newScore);
    setBebidas(newBebidas);
    setHistorial(nuevoHistorial);

    localStorage.setItem(
      "score",
      newScore.toString()
    );

    localStorage.setItem(
      "bebidas",
      JSON.stringify(newBebidas)
    );

    localStorage.setItem(
      "historial",
      JSON.stringify(nuevoHistorial)
    );
  };

  // VOMITAR
  const penalize = (points: number) => {
    const newScore = Math.max(0, score + points);

    // NUEVO EVENTO HISTORIAL
    const nuevoEvento: HistorialItem = {
      tipo: "vomito",
      puntos: points,
      fecha: new Date().toLocaleString(),
    };

    const nuevoHistorial = [
      nuevoEvento,
      ...historial,
    ];

    setScore(newScore);
    setHistorial(nuevoHistorial);

    localStorage.setItem(
      "score",
      newScore.toString()
    );

    localStorage.setItem(
      "historial",
      JSON.stringify(nuevoHistorial)
    );
  };

  // RESET
  const resetGame = () => {
    setScore(0);
    setBebidas(initialBebidas);
    setHistorial([]);

    localStorage.removeItem("score");
    localStorage.removeItem("bebidas");
    localStorage.removeItem("historial");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        🍹 SCORE DE CACHARROS
      </h1>

      <p style={styles.score}>
        🔥 Puntuación: {score}
      </p>

      <p style={styles.level}>
        {getNivel(score)}
      </p>

      {/* CONTADOR */}
      <div style={styles.contadorContainer}>
        <span style={styles.contador}>
          🍸 {bebidas.freskito}
        </span>

        <span style={styles.contador}>
          🥃 {bebidas.chupito}
        </span>

        <span style={styles.contador}>
          🍷 {bebidas.vino}
        </span>

        <span style={styles.contador}>
          🍺 {bebidas.cerveza}
        </span>
      </div>

      {/* BOTONES */}
      <div style={styles.buttonsContainer}>
        <button
          style={{
            ...styles.button,
            ...styles.copa,
          }}
          onClick={() =>
            updateScore(5, "freskito")
          }
        >
          🍸 Freskito (+5)
        </button>

        <button
          style={{
            ...styles.button,
            ...styles.chupito,
          }}
          onClick={() =>
            updateScore(3, "chupito")
          }
        >
          🥃 Chupo (+3)
        </button>

        <button
          style={{
            ...styles.button,
            ...styles.vino,
          }}
          onClick={() =>
            updateScore(2, "vino")
          }
        >
          🍷 Vino (+2)
        </button>

        <button
          style={{
            ...styles.button,
            ...styles.cerveza,
          }}
          onClick={() =>
            updateScore(1, "cerveza")
          }
        >
          🍺 Rubia (+1)
        </button>

        <button
          style={{
            ...styles.button,
            ...styles.vomito,
          }}
          onClick={() => penalize(-15)}
        >
          🤢 Vomitar (-15)
        </button>

        {/* RESET */}
        <button
          style={{
            ...styles.button,
            ...styles.reset,
          }}
          onClick={resetGame}
        >
          🔄 Reiniciar partida
        </button>

        {/* HISTORIAL */}
        <button
          style={{
            ...styles.button,
            ...styles.historial,
          }}
          onClick={() =>
            setShowHistorial(!showHistorial)
          }
        >
          📜 Historial
        </button>
      </div>

      {/* PANEL HISTORIAL */}
      {showHistorial && (
        <div style={styles.historialContainer}>
          <h2 style={styles.historialTitle}>
            📜 Historial
          </h2>

          {historial.length === 0 ? (
            <p style={{ color: "#ccc" }}>
              No hay consumiciones todavía.
            </p>
          ) : (
            historial.map((item, index) => (
              <div
                key={index}
                style={styles.historialItem}
              >
                <span>
                  {getEmoji(item.tipo)}{" "}
                  {item.tipo} ({item.puntos > 0 ? "+" : ""}
                  {item.puntos})
                </span>

                <span
                  style={{
                    fontSize: 12,
                    opacity: 0.7,
                  }}
                >
                  {item.fecha}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #1E1E2E, #2A2A40)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    color: "#FFD700",
    marginBottom: 10,
    textAlign: "center",
  },

  score: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 5,
    fontWeight: "bold",
  },

  level: {
    fontSize: 22,
    color: "#FFD166",
    marginBottom: 20,
    fontWeight: "600",
  },

  contadorContainer: {
    display: "flex",
    gap: 20,
    marginBottom: 30,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  contador: {
    fontSize: 18,
    color: "#ccc",
    backgroundColor: "#2E2E3E",
    padding: "8px 14px",
    borderRadius: 8,
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    maxWidth: 400,
  },

  button: {
    padding: 15,
    borderRadius: 12,
    border: "none",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    fontWeight: "600",
  },

  copa: {
    backgroundColor: "#E63946",
  },

  chupito: {
    backgroundColor: "#F77F00",
  },

  vino: {
    backgroundColor: "#6A0572",
  },

  cerveza: {
    backgroundColor: "#2A9D8F",
  },

  vomito: {
    backgroundColor: "#8B0000",
  },

  reset: {
    backgroundColor: "#555",
  },

  historial: {
    backgroundColor: "#3A3A55",
  },

  historialContainer: {
    marginTop: 30,
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#2E2E3E",
    borderRadius: 12,
    padding: 15,
    color: "#fff",
  },

  historialTitle: {
    marginBottom: 15,
    textAlign: "center",
  },

  historialItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom:
      "1px solid rgba(255,255,255,0.1)",
  },
};