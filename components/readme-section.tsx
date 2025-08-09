"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, Star, GitFork } from "lucide-react"
import { useState } from "react"

export function ReadmeSection() {
  const [copied, setCopied] = useState(false)

  const readmeContent = `# GitHub Matrix Art 🎨

Create pixel-style artwork in your GitHub contribution graph using a lightweight Python script.

---

## 📌 Overview

### 💡 Why This Project Exists

Because it's fun! In the developer world, many take pride in their wall of green squares on GitHub.
So why not use that as a creative canvas?

The GitHub contributions grid is a **52 x 7 pixel canvas** — perfect for making your profile stand out with shapes, patterns, or even words.
This project lets you turn your commit history into art.

### ⚙️ How It Works

You design a **matrix** where:
- \`#\` = make a commit (pixel filled)
- \`.\` = leave blank (pixel empty)

The script creates commits that correspond to your design, which then shows up in your GitHub contribution chart.

---

## 🖼 Example Pixel Art

Here's a simple "GITHUB" example:

\`\`\`
..####...######..########.##....##.##....##.########.
.##..##.....##.........##.##....##.##....##.##.....##
.##.........##.........##.##....##.##....##.##.....##
.##..####...##.........##.########.##....##.########.
.##....##...##.........##.##....##.##....##.##.....##
.##....##...##.........##.##....##.##....##.##.....##
..######....##.........##.##....##..######..########.
\`\`\`

---

## 🚀 Usage

1. **Fork This Repo**
   Click **Fork** to copy this repository to your own GitHub account.

2. **Clone the Repo**
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/github-matrix-art.git
   cd github-matrix-art
   \`\`\`

3. **Design Your Pixel Art**
   Use the web generator or manually edit the matrix in the script.

4. **Run the Script**
   \`\`\`bash
   python generate_commits.py
   \`\`\`

5. **Push to GitHub**
   \`\`\`bash
   git push origin main
   \`\`\`

✅ Your custom design will now appear on your GitHub profile's contribution graph.

---

## 📦 Requirements

- Python 3.x
- Git configured with your GitHub account

---

## ⚠️ Disclaimer

This project is for **educational and creative purposes only**.

- Do not abuse it to artificially inflate commit counts
- This can violate GitHub's Terms of Service if misused
- Keep it fun, responsible, and artistic

---

## 🎨 Examples Gallery

### Text Examples
- **HELLO**: Simple greeting
- **CODE**: Perfect for developers
- **2024**: Year displays
- **YOUR NAME**: Personalize your profile

### Pattern Examples
- **Hearts**: ♥ Show some love
- **Stars**: ⭐ Stellar patterns
- **Arrows**: → Directional designs
- **Logos**: Brand representations

---

## 🛠 Advanced Usage

### Custom Date Ranges
Modify the \`start_date\` in the script to target specific time periods:

\`\`\`python
# Start from a specific date
start_date = date(2024, 1, 1)
\`\`\`

### Multiple Patterns
Create different patterns for different time periods by running the script multiple times with different matrices.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

---

## 📄 License

Licensed under the Apache-2.0 License.
See the [LICENSE](LICENSE) file for details.

---

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐ star on GitHub!

---

**Made with ❤️ for the GitHub community**
`

  const copyReadme = () => {
    navigator.clipboard.writeText(readmeContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadReadme = () => {
    const blob = new Blob([readmeContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "README.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-[#F6E9D9]/80 border-[#043222]/20 backdrop-blur-sm shadow-lg shadow-[#043222]/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#043222]">📖 Project Documentation</h2>
          <div className="flex gap-2">
            <Button onClick={copyReadme} className="bg-[#043222] hover:bg-[#065a3a] text-[#F6E9D9]" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy README"}
            </Button>
            <Button
              onClick={downloadReadme}
              variant="outline"
              className="border-[#043222]/30 text-[#043222] hover:bg-[#043222]/10 bg-transparent"
              size="sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          <div className="bg-[#043222] text-[#F6E9D9] p-6 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap">
            {readmeContent}
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-[#F6E9D9]/80 border-[#043222]/20 backdrop-blur-sm shadow-lg shadow-[#043222]/10">
          <h3 className="text-lg font-semibold mb-4 text-[#043222] flex items-center gap-2">
            <Star className="w-5 h-5" />
            Features
          </h3>
          <ul className="space-y-2 text-[#043222]/80">
            <li>• Web-based matrix generator</li>
            <li>• Custom font support (5x7 pixel font)</li>
            <li>• Adjustable spacing and scaling</li>
            <li>• Python and Bash script generation</li>
            <li>• Real-time preview</li>
            <li>• Export options (copy/download)</li>
            <li>• Responsive design</li>
            <li>• Clean, minimalistic interface</li>
          </ul>
        </Card>

        <Card className="p-6 bg-[#F6E9D9]/80 border-[#043222]/20 backdrop-blur-sm shadow-lg shadow-[#043222]/10">
          <h3 className="text-lg font-semibold mb-4 text-[#043222] flex items-center gap-2">
            <GitFork className="w-5 h-5" />
            Getting Started
          </h3>
          <div className="space-y-3 text-[#043222]/80">
            <div className="flex items-start gap-2">
              <span className="bg-[#043222] text-[#F6E9D9] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                1
              </span>
              <p className="text-sm">Generate your matrix using the web tool</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-[#043222] text-[#F6E9D9] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                2
              </span>
              <p className="text-sm">Copy the generated Python script</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-[#043222] text-[#F6E9D9] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                3
              </span>
              <p className="text-sm">Run the script in your repository</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-[#043222] text-[#F6E9D9] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                4
              </span>
              <p className="text-sm">Push to GitHub and enjoy your art!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
