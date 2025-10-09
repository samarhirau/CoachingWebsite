"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const gridSize = 20
const cellSize = 20

export default function NotFoundPage() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 5, y: 5 })
  const [direction, setDirection] = useState("RIGHT")
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(150)
  const [gameStarted, setGameStarted] = useState(false)
  const gameInterval = useRef<NodeJS.Timeout | null>(null)

  const randomPosition = () => ({
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  })

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake]
      const head = { ...newSnake[0] }

      if (direction === "UP") head.y -= 1
      if (direction === "DOWN") head.y += 1
      if (direction === "LEFT") head.x -= 1
      if (direction === "RIGHT") head.x += 1

      // Check collision with wall
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setIsGameOver(true)
        return prevSnake
      }

      // Check collision with itself
      for (let part of newSnake) {
        if (part.x === head.x && part.y === head.y) {
          setIsGameOver(true)
          return prevSnake
        }
      }

      newSnake.unshift(head)

      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        setFood(randomPosition())
        setScore((s) => s + 1)
        setSpeed((sp) => Math.max(80, sp - 5))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }

  useEffect(() => {
    if (isGameOver) {
      if (gameInterval.current) clearInterval(gameInterval.current)
      return
    }

    if (gameStarted) {
      gameInterval.current = setInterval(moveSnake, speed)
      return () => clearInterval(gameInterval.current!)
    }
  }, [direction, gameStarted, speed])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) setGameStarted(true)
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP")
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN")
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT")
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [direction, gameStarted])

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood(randomPosition())
    setDirection("RIGHT")
    setIsGameOver(false)
    setScore(0)
    setSpeed(150)
    setGameStarted(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white text-center">
      <motion.h1
        className="text-7xl font-extrabold text-green-600 mb-2"
        initial={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        404
      </motion.h1>
      <p className="text-gray-600 mb-4 text-lg">
        Oops! You’re lost. Try playing Snake 🐍 while you’re here.
      </p>

      <div
        className="relative bg-gray-100 border border-gray-300 rounded-lg shadow-inner"
        style={{
          width: gridSize * cellSize,
          height: gridSize * cellSize,
        }}
      >
        {/* Snake */}
        {snake.map((part, index) => (
          <div
            key={index}
            className="absolute bg-green-500 rounded-sm"
            style={{
              left: part.x * cellSize,
              top: part.y * cellSize,
              width: cellSize - 2,
              height: cellSize - 2,
            }}
          ></div>
        ))}

        {/* Food */}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: food.x * cellSize + 3,
            top: food.y * cellSize + 3,
            width: cellSize - 6,
            height: cellSize - 6,
          }}
        ></div>

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-red-600 mb-2">Game Over 💀</p>
            <Button onClick={restartGame}>Restart</Button>
          </div>
        )}
      </div>

      <p className="mt-4 text-gray-500 text-sm">
        Score: <span className="font-semibold text-green-700">{score}</span>
      </p>

      <div className="mt-4">
        <a href="/" className="text-green-600 underline text-sm">
          Go Home
        </a>
      </div>
    </div>
  )
}
