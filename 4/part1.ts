const file = Bun.file("./input.txt");
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

let total = 0
for (const line of lines) {
  const numbers = line.split(": ")[1]
  const splitNumbers = numbers.split("|")
  const winningNumbers = getNumbersArray(splitNumbers[0])
  const entryNumbers = getNumbersArray(splitNumbers[1])
  
  const intersection = winningNumbers.filter(x => entryNumbers.includes(x));
  const winningCount = intersection.length
  const lineWinningCount = getScoreForWinningCount(winningCount)
  total += lineWinningCount
}
console.log(total)