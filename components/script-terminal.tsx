"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Download, Terminal } from "lucide-react"

interface ScriptTerminalProps {
  matrix: string
}

export function ScriptTerminal({ matrix }: ScriptTerminalProps) {
  const [copied, setCopied] = useState(false)

  const generatePythonScript = () => {
    return `from datetime import date, timedelta
from time import sleep
from subprocess import call

today = date.today()
start_date = today - timedelta(days=today.weekday() + 2, weeks=52)

# Your generated matrix
matrix = """${matrix}"""

lines = matrix.strip().split("\\n")
columns = zip(*lines)
counter = 0

# Clean up existing git repository
call(['rmdir', '/s', '/q', '.git'], shell=True)  # Windows
# call(['rm', '-rf', '.git'], shell=True)  # Linux/Mac
call(['del', '/f', 'delta.txt'], shell=True)  # Windows
# call(['rm', '-f', 'delta.txt'], shell=True)  # Linux/Mac

# Initialize new git repository
call(['git', 'init'])

def write_delta(d):
    with open('delta.txt', 'w') as f:
        f.write(str(d))

# Initial commit
call(['git', 'add', '-A'])
call(['git', 'commit', '-am', 'Initial commit'])

# Generate commits for each filled pixel
for c in columns:
    for d in c:
        counter += 1
        if d != "#":
            continue
        
        write_delta(counter)
        call(['git', 'add', '-A'])
        call(['git', 'commit', '--date', (start_date + timedelta(days=counter)).ctime(), '-am', str(counter)])

print("✅ Matrix commits generated successfully!")
print("📤 Push to GitHub with: git push origin main")
`
  }

  const copyScript = () => {
    navigator.clipboard.writeText(generatePythonScript())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadScript = () => {
    const script = generatePythonScript()
    const blob = new Blob([script], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "generate_commits.py"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[#043222]/70 text-lg">
          Copy this Python script and run it in your GitHub repository to generate the commit pattern.
        </p>
        <div className="flex gap-3">
          <Button
            onClick={copyScript}
            className="bg-[#043222]/90 hover:bg-[#043222] text-[#F6E9D9] backdrop-blur-md border border-[#043222]/20 rounded-2xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? "Copied!" : "Copy Script"}
          </Button>
          <Button
            onClick={downloadScript}
            className="bg-[#F6E9D9]/60 hover:bg-[#F6E9D9]/80 text-[#043222] backdrop-blur-md border border-[#043222]/30 rounded-2xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Terminal-like display */}
      <div className="bg-[#043222] rounded-2xl overflow-hidden shadow-2xl border border-[#043222]/20">
        {/* Terminal header */}
        <div className="bg-[#043222]/90 backdrop-blur-md px-6 py-4 border-b border-[#F6E9D9]/10 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 text-[#F6E9D9]/80">
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-mono">generate_commits.py</span>
          </div>
        </div>

        {/* Terminal content */}
        <div className="p-6 bg-[#043222] text-[#F6E9D9] font-mono text-sm leading-relaxed overflow-x-auto">
          <pre className="whitespace-pre-wrap">{generatePythonScript()}</pre>
        </div>
      </div>

      {/* Usage instructions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#F6E9D9]/30 backdrop-blur-md rounded-2xl border border-[#043222]/10">
          <div className="w-10 h-10 rounded-full bg-[#043222] text-[#F6E9D9] flex items-center justify-center text-lg font-bold mb-4">
            1
          </div>
          <h4 className="font-bold text-[#043222] mb-2">Create Repository</h4>
          <p className="text-[#043222]/70 text-sm">Create a new GitHub repository for your matrix art project.</p>
        </div>

        <div className="p-6 bg-[#F6E9D9]/30 backdrop-blur-md rounded-2xl border border-[#043222]/10">
          <div className="w-10 h-10 rounded-full bg-[#043222] text-[#F6E9D9] flex items-center justify-center text-lg font-bold mb-4">
            2
          </div>
          <h4 className="font-bold text-[#043222] mb-2">Run Script</h4>
          <p className="text-[#043222]/70 text-sm">Clone the repo locally and execute the Python script.</p>
        </div>

        <div className="p-6 bg-[#F6E9D9]/30 backdrop-blur-md rounded-2xl border border-[#043222]/10">
          <div className="w-10 h-10 rounded-full bg-[#043222] text-[#F6E9D9] flex items-center justify-center text-lg font-bold mb-4">
            3
          </div>
          <h4 className="font-bold text-[#043222] mb-2">Push & Enjoy</h4>
          <p className="text-[#043222]/70 text-sm">Push commits to GitHub and watch your contribution graph!</p>
        </div>
      </div>
    </div>
  )
}
