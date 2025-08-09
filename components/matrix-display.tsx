"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card } from "@/components/ui/card"

interface MatrixDisplayProps {
  matrix: string
}

export function MatrixDisplay({ matrix }: MatrixDisplayProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gridRef.current) {
      const cells = gridRef.current.querySelectorAll(".matrix-cell")

      gsap.fromTo(
        cells,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.05,
          stagger: {
            amount: 0.8,
            from: "start",
          },
          ease: "back.out(1.7)",
        },
      )
    }
  }, [matrix])

  const lines = matrix.split("\n").filter((line) => line.length > 0)
  const maxWidth = Math.max(...lines.map((line) => line.length))

  const getCellColor = (char: string) => {
    if (char === "#") {
      return "bg-[#216e39] border border-[#30a14e]/30" // GitHub's green colors
    }
    return "bg-[#ebedf0] border border-[#e1e4e8]" // GitHub's light gray
  }

  const getPreviewChar = (char: string) => (char === "#" ? "█" : " ")

  return (
    <div className="space-y-8">
      {/* GitHub-style Grid */}
      <Card className="p-8 bg-[#F6E9D9]/40 backdrop-blur-xl border border-[#043222]/20 shadow-2xl shadow-[#043222]/10 rounded-3xl">
        <h3 className="text-xl font-bold mb-6 text-[#043222]">GitHub Contribution Preview</h3>
        <div className="p-6 bg-white/50 backdrop-blur-md rounded-2xl border border-[#043222]/10">
          <div
            ref={gridRef}
            className="grid gap-[3px] justify-center"
            style={{
              gridTemplateColumns: `repeat(${maxWidth}, minmax(0, 1fr))`,
            }}
          >
            {lines.map((line, rowIndex) =>
              Array.from({ length: maxWidth }, (_, colIndex) => {
                const char = line[colIndex] || "."
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`matrix-cell w-[11px] h-[11px] rounded-[2px] transition-all duration-300 hover:scale-110 ${getCellColor(char)}`}
                    title={char === "#" ? "Contribution" : "No contribution"}
                  />
                )
              }),
            )}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-[11px] h-[11px] bg-[#ebedf0] border border-[#e1e4e8] rounded-[2px]"></div>
              <div className="w-[11px] h-[11px] bg-[#9be9a8] border border-[#30a14e]/30 rounded-[2px]"></div>
              <div className="w-[11px] h-[11px] bg-[#40c463] border border-[#30a14e]/30 rounded-[2px]"></div>
              <div className="w-[11px] h-[11px] bg-[#30a14e] border border-[#30a14e]/30 rounded-[2px]"></div>
              <div className="w-[11px] h-[11px] bg-[#216e39] border border-[#30a14e]/30 rounded-[2px]"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </Card>

      {/* ASCII Preview */}
      <Card className="p-8 bg-[#F6E9D9]/40 backdrop-blur-xl border border-[#043222]/20 shadow-2xl shadow-[#043222]/10 rounded-3xl">
        <h3 className="text-xl font-bold mb-6 text-[#043222]">ASCII Preview</h3>
        <div className="p-6 bg-[#043222]/5 backdrop-blur-md rounded-2xl border border-[#043222]/10 font-mono text-sm leading-none overflow-x-auto text-[#043222]">
          {lines.map((line, index) => (
            <div key={index} className="whitespace-pre">
              {line.split("").map((char, charIndex) => (
                <span key={charIndex} className="text-[#043222]">
                  {getPreviewChar(char)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
