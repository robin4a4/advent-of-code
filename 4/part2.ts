const file = Bun.file("./test.txt");
const text = await file.text();
const lines = text.split("\n");

function getNumbersArray(stringNumber: string) {
  return stringNumber.trim().split(" ").map((strNb) => parseInt(strNb)).filter((number) => !isNaN(number))
}

function getScoreForWinningCount(count: number) {
  if (count <= 1) return count
  let result = 1
  for (let i = 1; i < count; i++) {
    result = result * 2
  }
  return result
}

function getScoreForOneCard(line: string) {
  const numbers = line.split(": ")[1]
  const splitNumbers = numbers.split("|")
  const winningNumbers = getNumbersArray(splitNumbers[0])
  const entryNumbers = getNumbersArray(splitNumbers[1])
  
  const intersection = winningNumbers.filter(x => entryNumbers.includes(x));
  const winningCount = intersection.length
  const lineWinningCount = getScoreForWinningCount(winningCount)
  return [winningCount, lineWinningCount]
}

const cardCount: Record<number, number> = {}

function recursiveLineCount(lines: string[]) {
  if (lines.length === 0) return
  lines.forEach((line, lineIndex) => {
    const [winningCount,] = getScoreForOneCard(line)
    const copies = [...lines].splice(lineIndex + 1, lineIndex + winningCount)
    if (winningCount > 0) {
      cardCount[lineIndex + 1] = cardCount[lineIndex + 1] + 1 ?? 1
    }
    recursiveLineCount(copies)
  })
}

recursiveLineCount(lines)

console.log(cardCount)