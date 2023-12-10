const file = Bun.file("./input.txt");
const text = await file.text();
const originalLines = text.split("\n");

function getNumbersArray(stringNumber: string) {
  return stringNumber.trim().split(" ").map((strNb) => parseInt(strNb)).filter((number) => !isNaN(number))
}

function getScoreForOneCard(line: string) {
  const lineSplit = line.split(": ")
  const cardNumber = parseInt(lineSplit[0].replaceAll("Card ", ""))
  const numbers = lineSplit[1]
  const splitNumbers = numbers.split("|")
  const winningNumbers = getNumbersArray(splitNumbers[0])
  const entryNumbers = getNumbersArray(splitNumbers[1])
  
  const intersection = winningNumbers.filter(x => entryNumbers.includes(x));
  const winningCount = intersection.length
  return {
    cardNumber,
    winningCount
  }
}

const cardCount: Record<number, number> = {}

function recursiveLineCount(lines: string[]) {
  if (lines.length === 0) return
  lines.forEach((line) => {
    const {cardNumber, winningCount} = getScoreForOneCard(line)
    cardCount[cardNumber] = cardCount[cardNumber] ? cardCount[cardNumber] + 1 : 1
    
    const copies = [...originalLines].slice(cardNumber, cardNumber + winningCount)
    recursiveLineCount(copies)
  })
}

recursiveLineCount(originalLines)

console.log(Object.values(cardCount).reduce((a, b) => a + b, 0))