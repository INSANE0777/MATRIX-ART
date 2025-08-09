"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Download, Play } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ScriptGeneratorProps {
  matrix: string
}

export function ScriptGenerator({ matrix }: ScriptGeneratorProps) {
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

  const generateBashScript = () => {
    return `#!/bin/bash

# GitHub Matrix Art Generator
# Make sure you have git installed and configured

TODAY=$(date +%Y-%m-%d)
START_DATE=$(date -d "$TODAY -365 days" +%Y-%m-%d)

# Your generated matrix
MATRIX="${matrix.replace(/\n/g, "\\n")}"

# Clean up
rm -rf .git
rm -f delta.txt

# Initialize git
git init

# Function to write delta file
write_delta() {
    echo "$1" > delta.txt
}

# Initial commit
git add -A
git commit -m "Initial commit"

# Generate commits
COUNTER=0
echo "$MATRIX" | while IFS= read -r line; do
    for (( i=0; i<\${#line}; i++ )); do
        CHAR="\${line:$i:1}"
        COUNTER=$((COUNTER + 1))
        
        if [ "$CHAR" = "#" ]; then
            COMMIT_DATE=$(date -d "$START_DATE +$COUNTER days" --iso-8601)
            write_delta $COUNTER
            git add -A
            git commit --date="$COMMIT_DATE" -m "Commit $COUNTER"
        fi
    done
done

echo "✅ Matrix commits generated successfully!"
echo "📤 Push to GitHub with: git push origin main"
`
  }

  const copyScript = (script: string) => {
    navigator.clipboard.writeText(script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadScript = (script: string, filename: string) => {
    const blob = new Blob([script], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const pythonScript = generatePythonScript()
  const bashScript = generateBashScript()

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-[#F6E9D9]/80 border-[#043222]/20 backdrop-blur-sm shadow-lg shadow-[#043222]/10">
        <div className="flex items-center gap-3 mb-4">
          <Play className="w-5 h-5 text-[#043222]" />
          <h2 className="text-2xl font-bold text-[#043222]">GitHub Commit Script</h2>
        </div>
        <p className="text-[#043222]/70 mb-6">
          Use this script to generate commits that will create your pixel art in your GitHub contribution graph.
        </p>

        <Tabs defaultValue="python" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#043222]/10">
            <TabsTrigger value="python" className="data-[state=active]:bg-[#043222] data-[state=active]:text-[#F6E9D9]">
              Python Script
            </TabsTrigger>
            <TabsTrigger value="bash" className="data-[state=active]:bg-[#043222] data-[state=active]:text-[#F6E9D9]">
              Bash Script
            </TabsTrigger>
          </TabsList>

          <TabsContent value="python" className="mt-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  onClick={() => copyScript(pythonScript)}
                  className="bg-[#043222] hover:bg-[#065a3a] text-[#F6E9D9]"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Copied!" : "Copy Script"}
                </Button>
                <Button
                  onClick={() => downloadScript(pythonScript, "generate_commits.py")}
                  variant="outline"
                  className="border-[#043222]/30 text-[#043222] hover:bg-[#043222]/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download .py
                </Button>
              </div>
              <pre className="bg-[#043222] text-[#F6E9D9] p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {pythonScript}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="bash" className="mt-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  onClick={() => copyScript(bashScript)}
                  className="bg-[#043222] hover:bg-[#065a3a] text-[#F6E9D9]"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Copied!" : "Copy Script"}
                </Button>
                <Button
                  onClick={() => downloadScript(bashScript, "generate_commits.sh")}
                  variant="outline"
                  className="border-[#043222]/30 text-[#043222] hover:bg-[#043222]/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download .sh
                </Button>
              </div>
              <pre className="bg-[#043222] text-[#F6E9D9] p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {bashScript}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6 bg-[#F6E9D9]/80 border-[#043222]/20 backdrop-blur-sm shadow-lg shadow-[#043222]/10">
        <h3 className="text-lg font-semibold mb-4 text-[#043222]">📋 How to Use</h3>
        <div className="space-y-4 text-[#043222]/80">
          <div className="flex gap-3">
            <span className="bg-[#043222] text-[#F6E9D9] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              1
            </span>
            <div>
              <p className="font-semibold">Create a new repository</p>
              <p className="text-sm">Create a new repository on GitHub (can be private)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="bg-[#043222] text-[#F6E9D9] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              2
            </span>
            <div>
              <p className="font-semibold">Clone and run script</p>
              <p className="text-sm">Clone the repo locally and run the generated script</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="bg-[#043222] text-[#F6E9D9] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              3
            </span>
            <div>
              <p className="font-semibold">Push to GitHub</p>
              <p className="text-sm">Push the commits: `git push origin main`</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="bg-[#043222] text-[#F6E9D9] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              4
            </span>
            <div>
              <p className="font-semibold">View your art</p>
              <p className="text-sm">Check your GitHub profile to see the pixel art!</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
