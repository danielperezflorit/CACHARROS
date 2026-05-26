/*"use client";
import { useState, useEffect, CSSProperties } from 'react';

export default function App() {
  const [score, setScore] = useState(0);

  // Cargar datos
  useEffect(() => {
    const saved = localStorage.getItem('score');
    if (saved) {
      setScore(parseInt(saved));
    }
  }, []);

  // Guardar + actualizar
  const updateScore = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    localStorage.setItem('score', newScore.toString());
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍹 SCORE DE CACHARROS</h1>

      <p style={styles.score}>Puntuación: {score}</p>

      <div style={styles.buttonsContainer}>
        <button style={{ ...styles.button, ...styles.copa }} onClick={() => updateScore(5)}>
          🍸 Freskito (+5)
        </button>

        <button style={{ ...styles.button, ...styles.chupito }} onClick={() => updateScore(3)}>
          🥃 Chupo (+3)
        </button>

        <button style={{ ...styles.button, ...styles.vino }} onClick={() => updateScore(2)}>
          🍷 Vino (+2)
        </button>

        <button style={{ ...styles.button, ...styles.cerveza }} onClick={() => updateScore(1)}>
          🍺 Rubia (+1)
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1E1E2E',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },

  score: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
  },

  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },

  button: {
    padding: 15,
    borderRadius: 12,
    border: 'none',
    color: '#fff',
    fontSize: 18,
    cursor: 'pointer',
    fontWeight: '600',
  },

  copa: { backgroundColor: '#E63946' },
  chupito: { backgroundColor: '#F77F00' },
  vino: { backgroundColor: '#6A0572' },
  cerveza: { backgroundColor: '#2A9D8F' },
};*/


"use client";
import { useState, useEffect, CSSProperties } from 'react';
type Bebidas = {
  freskito: number;
  chupito: number;
  vino: number;
  cerveza: number;
};
const initialBebidas: Bebidas = {
  freskito: 0,
  chupito: 0,
  vino: 0,
  cerveza: 0,
};
export default function App() {
  const [score, setScore] = useState(0);
  const [bebidas, setBebidas] = useState<Bebidas>(initialBebidas);
  // Cargar datos
  useEffect(() => {
    const savedScore = localStorage.getItem('score');
    const savedBebidas = localStorage.getItem('bebidas');
    
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
    if (savedBebidas) {
      setBebidas(JSON.parse(savedBebidas));
    }
  }, []);
  // Guardar + actualizar
  const updateScore = (points: number, tipo: keyof Bebidas) => {
    const newScore = score + points;
    const newBebidas = { ...bebidas, [tipo]: bebidas[tipo] + 1 };
    
    setScore(newScore);
    setBebidas(newBebidas);
    
    localStorage.setItem('score', newScore.toString());
    localStorage.setItem('bebidas', JSON.stringify(newBebidas));
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍹 SCORE DE CACHARROS</h1>
      <p style={styles.score}>Puntuación: {score}</p>
      {/* Contador de bebidas */}
      <div style={styles.contadorContainer}>
        <span style={styles.contador}>🍸 {bebidas.freskito}</span>
        <span style={styles.contador}>🥃 {bebidas.chupito}</span>
        <span style={styles.contador}>🍷 {bebidas.vino}</span>
        <span style={styles.contador}>🍺 {bebidas.cerveza}</span>
      </div>
      <div style={styles.buttonsContainer}>
        <button style={{ ...styles.button, ...styles.copa }} onClick={() => updateScore(5, 'freskito')}>
          🍸 Freskito (+5)
        </button>
        <button style={{ ...styles.button, ...styles.chupito }} onClick={() => updateScore(3, 'chupito')}>
          🥃 Chupo (+3)
        </button>
        <button style={{ ...styles.button, ...styles.vino }} onClick={() => updateScore(2, 'vino')}>
          🍷 Vino (+2)
        </button>
        <button style={{ ...styles.button, ...styles.cerveza }} onClick={() => updateScore(1, 'cerveza')}>
          🍺 Rubia (+1)
        </button>
      </div>
    </div>
  );
}
const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1E1E2E',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  score: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  contadorContainer: {
    display: 'flex',
    gap: 20,
    marginBottom: 30,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contador: {
    fontSize: 18,
    color: '#ccc',
    backgroundColor: '#2E2E3E',
    padding: '8px 14px',
    borderRadius: 8,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },
  button: {
    padding: 15,
    borderRadius: 12,
    border: 'none',
    color: '#fff',
    fontSize: 18,
    cursor: 'pointer',
    fontWeight: '600',
  },
  copa: { backgroundColor: '#E63946' },
  chupito: { backgroundColor: '#F77F00' },
  vino: { backgroundColor: '#6A0572' },
  cerveza: { backgroundColor: '#2A9D8F' },
};