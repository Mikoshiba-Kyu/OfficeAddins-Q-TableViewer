// ---------------------- Dev Settings ----------------------
const isLogging = true
const moduleName = 'useCompactMode.ts'

// ---------------------- Import ----------------------
import { useState } from "react"

// ---------------------- Logic ----------------------
export const useCompactMode = () => {
  const [isCompact, setIsCompact] = useState(false)

  return {isCompact, setIsCompact}
}