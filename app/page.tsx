"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import Lenis from "lenis"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Github, Copy, Download, Terminal, FileText, Sparkles, Code } from "lucide-react"
import { MatrixDisplay } from "@/components/matrix-display"
import { ScriptTerminal } from "@/components/script-terminal"
import { textToMatrix } from "@/lib/matrix-generator"

export default function Home() {
  const [text, setText] = useState("MATRIX")
  const [spacing, setSpacing] = useState(1)
  const [matrix, setMatrix] = useState("")

  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
   
      smoothWheel: true,
     
    
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Initial animations
    const tl = gsap.timeline()

    tl.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    }).from(
      contentRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    )

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const newMatrix = textToMatrix(text, spacing, 1)
    setMatrix(newMatrix)
  }, [text, spacing])

  const copyMatrix = () => {
    navigator.clipboard.writeText(matrix)
    gsap.to(".copy-button", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    })
  }

  const downloadMatrix = () => {
    const blob = new Blob([matrix], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "github-matrix.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6E9D9] via-[#F6E9D9] to-[#043222]/10 text-[#043222] font-['Inter',sans-serif]">
      {/* Glassmorphic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#043222]/5 via-transparent to-[#043222]/10" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Floating glass orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#043222]/10 rounded-full blur-xl" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-[#043222]/5 rounded-full blur-2xl" />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-[#043222]/8 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div ref={heroRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-[#043222]/10 backdrop-blur-md border border-[#043222]/20">
              <Github className="w-10 h-10 text-[#043222]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#043222] via-[#065a3a] to-[#043222] bg-clip-text text-transparent tracking-tight">
              MATRIX
            </h1>
            <div className="p-3 rounded-2xl bg-[#043222]/10 backdrop-blur-md border border-[#043222]/20">
              <Sparkles className="w-10 h-10 text-[#043222]" />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-[#043222]/70 max-w-3xl mx-auto font-medium leading-relaxed">
            Transform your GitHub contribution graph into stunning pixel art. Create custom patterns, words, and designs
            that showcase your creativity.
          </p>
        </div>

        <div ref={contentRef} className="max-w-7xl mx-auto space-y-12">
          {/* Generator Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls */}
            <Card className="p-8 bg-[#F6E9D9]/40 backdrop-blur-xl border border-[#043222]/20 shadow-2xl shadow-[#043222]/10 rounded-3xl">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <Code className="w-6 h-6 text-[#043222]" />
                  <h2 className="text-2xl font-bold text-[#043222]">Generator</h2>
                </div>

                <div>
                  <Label htmlFor="text" className="text-lg font-semibold mb-3 block text-[#043222]">
                    Text to Generate
                  </Label>
                  <Input
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value.toUpperCase())}
                    placeholder="Enter your text..."
                    className="text-lg bg-[#F6E9D9]/60 backdrop-blur-md border-[#043222]/30 focus:border-[#043222] focus:ring-[#043222]/20 rounded-2xl h-14 px-6"
                  />
                  <p className="text-sm mt-2 text-[#043222]/60 font-medium">
                    Supports A-Z, 0-9, symbols, and special characters
                  </p>
                </div>

                <div>
                  <Label className="text-lg font-semibold mb-4 block text-[#043222]">Letter Spacing: {spacing}</Label>
                  <div className="px-4">
                    <Slider
                      value={[spacing]}
                      onValueChange={(value) => setSpacing(value[0])}
                      max={5}
                      min={0}
                      step={1}
                      className="w-full [&_[role=slider]]:bg-[#043222] [&_[role=slider]]:border-[#043222] [&_[role=slider]]:shadow-lg [&_[role=slider]]:backdrop-blur-md"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={copyMatrix}
                    className="copy-button flex-1 bg-[#043222]/90 hover:bg-[#043222] text-[#F6E9D9] backdrop-blur-md border border-[#043222]/20 rounded-2xl h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Copy className="w-5 h-5 mr-3" />
                    Copy Matrix
                  </Button>
                  <Button
                    onClick={downloadMatrix}
                    className="bg-[#F6E9D9]/60 hover:bg-[#F6E9D9]/80 text-[#043222] backdrop-blur-md border border-[#043222]/30 rounded-2xl h-14 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Matrix Display */}
            <MatrixDisplay matrix={matrix} />
          </div>

          {/* Script Generator Section */}
          <Card className="p-8 bg-[#F6E9D9]/40 backdrop-blur-xl border border-[#043222]/20 shadow-2xl shadow-[#043222]/10 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="w-6 h-6 text-[#043222]" />
              <h2 className="text-2xl font-bold text-[#043222]">GitHub Commit Script</h2>
            </div>
            <ScriptTerminal matrix={matrix} />
          </Card>

          {/* Documentation Section */}
          <Card className="p-8 bg-[#F6E9D9]/40 backdrop-blur-xl border border-[#043222]/20 shadow-2xl shadow-[#043222]/10 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-6 h-6 text-[#043222]" />
              <h2 className="text-2xl font-bold text-[#043222]">Documentation</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#043222] mb-4">🎯 How It Works</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#043222] text-[#F6E9D9] flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-[#043222]">Create Your Design</p>
                        <p className="text-[#043222]/70 text-sm">Enter text to generate pixel art patterns</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#043222] text-[#F6E9D9] flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-[#043222]">Generate Script</p>
                        <p className="text-[#043222]/70 text-sm">Copy the Python script with your matrix embedded</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#043222] text-[#F6E9D9] flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-[#043222]">Run & Push</p>
                        <p className="text-[#043222]/70 text-sm">Execute script in your repo and push to GitHub</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#043222] text-[#F6E9D9] flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div>
                        <p className="font-semibold text-[#043222]">Enjoy Your Art</p>
                        <p className="text-[#043222]/70 text-sm">Watch your contribution graph transform!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#043222] mb-4">⚠️ Important Notes</h3>
                  <div className="space-y-2 text-[#043222]/80">
                    <p className="text-sm">• Use responsibly - don't abuse for fake contributions</p>
                    <p className="text-sm">• Create a dedicated repository for your art</p>
                    <p className="text-sm">• Respect GitHub's Terms of Service</p>
                    <p className="text-sm">• Keep it creative and fun!</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#043222] mb-4">✨ Features</h3>
                  <div className="space-y-2 text-[#043222]/80">
                    <p className="text-sm">• 60+ character support (A-Z, 0-9, symbols)</p>
                    <p className="text-sm">• Adjustable letter spacing</p>
                    <p className="text-sm">• Real-time GitHub-style preview</p>
                    <p className="text-sm">• Auto-generated Python scripts</p>
                    <p className="text-sm">• Copy/download functionality</p>
                    <p className="text-sm">• Smooth scrolling experience</p>
                    <p className="text-sm">• Responsive glassmorphic design</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#043222] mb-4">🎨 Examples</h3>
                  <div className="space-y-2 text-[#043222]/80">
                    <p className="text-sm">• Your name or username</p>
                    <p className="text-sm">• "CODE", "DEV", "HELLO WORLD"</p>
                    <p className="text-sm">• Year numbers like "2024"</p>
                    <p className="text-sm">• Symbols and patterns</p>
                    <p className="text-sm">• Company logos or brands</p>
                    <p className="text-sm">• Motivational words</p>
                  </div>
                </div>

                <div className="p-6 bg-[#043222]/5 backdrop-blur-md rounded-2xl border border-[#043222]/10">
                  <h4 className="font-bold text-[#043222] mb-2">💡 Pro Tip</h4>
                  <p className="text-sm text-[#043222]/70">
                    The GitHub contribution graph is a 52×7 pixel canvas. Design accordingly for best results! Try
                    shorter words for better visibility.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Examples Section */}
          <Card className="p-8 bg-[#F6E9D9]/40 backdrop-blur-xl border border-[#043222]/20 shadow-2xl shadow-[#043222]/10 rounded-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-[#043222]" />
              <h2 className="text-2xl font-bold text-[#043222]">Popular Patterns</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F6E9D9]/30 backdrop-blur-md rounded-2xl border border-[#043222]/10 hover:bg-[#F6E9D9]/50 transition-all duration-300 cursor-pointer">
                <h4 className="font-bold text-[#043222] mb-2">Names & Usernames</h4>
                <p className="text-[#043222]/70 text-sm mb-3">Perfect for personalizing your profile</p>
                <div className="font-mono text-xs text-[#043222]/60">JOHN, ALEX, @DEV123</div>
              </div>

              <div className="p-6 bg-[#F6E9D9]/30 backdrop-blur-md rounded-2xl border border-[#043222]/10 hover:bg-[#F6E9D9]/50 transition-all duration-300 cursor-pointer">
                <h4 className="font-bold text-[#043222] mb-2">Tech Terms</h4>
                <p className="text-[#043222]/70 text-sm mb-3">Show your developer spirit</p>
                <div className="font-mono text-xs text-[#043222]/60">CODE, DEV, API, JS</div>
              </div>

              <div className="p-6 bg-[#F6E9D9]/30 backdrop-blur-md rounded-2xl border border-[#043222]/10 hover:bg-[#F6E9D9]/50 transition-all duration-300 cursor-pointer">
                <h4 className="font-bold text-[#043222] mb-2">Years & Dates</h4>
                <p className="text-[#043222]/70 text-sm mb-3">Mark special moments</p>
                <div className="font-mono text-xs text-[#043222]/60">2024, 2025, EST.2020</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-[#043222]/20 text-[#043222]/60">
          <p className="text-lg font-medium">AFJAL HUSSEIN</p>
          <p className="text-sm mt-2 text-[#043222]/50">GITHUB-INSANE0777</p>
        </div>
      </div>
    </div>
  )
}
