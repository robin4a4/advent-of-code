const file = Bun.file("./input.txt")
const text = await file.text()
const lines = text.split("\n")

const maxRed = 12
const maxGreen = 13
const maxBlue = 14

let total = 0

for (const line of lines) {
    const split = line.split(": ")
    const id = parseInt(split[0].replace("Game ", ""))
    const nbReds = []
    const nbGreens = []
    const nbBlues = []
    const insideGames = split[1].split("; ")
    for (const insideGame of insideGames) {
        const colorNumbers = insideGame.split(", ")
        for (const colorNumber of colorNumbers) {

            const colors = colorNumber.split(" ")
            let nbRed = 0
            let nbGreen = 0
            let nbBlue = 0
            if (colors.find(x => x === "red"))
                nbRed = parseInt(colors[0])
            if (colors.find(x => x === "green"))
            nbGreen = parseInt(colors[0])
            if (colors.find(x => x === "blue"))
            nbBlue = parseInt(colors[0])
            if (nbRed > 0)
                nbReds.push(nbRed)
            if (nbGreen > 0)
                nbGreens.push(nbGreen)
            if (nbBlue > 0)
                nbBlues.push(nbBlue)
        }
    }
    const gamePossible = Math.max(...nbReds) <= maxRed && Math.max(...nbGreens) <= maxGreen && Math.max(...nbBlues) <= maxBlue
    if (gamePossible) total += id
}
console.log(total)