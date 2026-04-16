import React, { useEffect, useRef, useState } from "react";
import { GameEngine, Food, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "./engine/GameEngine";
import digestiveSystemBg from "../../../assets/img/digestive.jpg";

interface DigestiveGameProps {
  className?: string;
}

export const DigestiveGame: React.FC<DigestiveGameProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      setError("Canvas ref not found");
      return;
    }

    try {
      const canvas = canvasRef.current;

      // ===== WORLD DIMENSIONS =====
      // Full image size - maintains collision accuracy
      const WORLD_WIDTH = 3457;   // Full background width
      const WORLD_HEIGHT = 6833;  // Full background height
      // ============================

      // Create engine with background image
      // The engine internally sets canvas to VIEWPORT_WIDTH x VIEWPORT_HEIGHT (800x600)
      const engine = new GameEngine(
        canvas,
        WORLD_WIDTH,
        WORLD_HEIGHT,
        digestiveSystemBg
      );
      engineRef.current = engine;

      // Add food object in center of world
      const food = new Food(700, 1400);
      food.setCollisionSystem(engine.getCollisionSystem());
      engine.addObject(food);

      // Start game
      engine.start();

      setError(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Game error: ${msg}`);
      console.error("Game error:", err);
    }

    // Cleanup
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={`digestive-game-wrapper ${className}`}>
      {error && (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#ffebee",
            border: "2px solid #ff5252",
            borderRadius: "8px",
            color: "#c62828",
            marginBottom: "10px",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={VIEWPORT_WIDTH}
        height={VIEWPORT_HEIGHT}
        style={{
          width: `${VIEWPORT_WIDTH}px`,
          height: `${VIEWPORT_HEIGHT}px`,
          border: "2px solid #00BFFF",
          borderRadius: "8px",
          display: "block",
          backgroundColor: "#E8F4F8",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      />

      <style>{`
        .digestive-game-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
        }

        canvas {
          cursor: grab;
        }

        canvas:active {
          cursor: grabbing;
        }
      `}
      </style>
    </div>
  );
};

export default DigestiveGame;
