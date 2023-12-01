const file = Bun.file("./input.txt")
const text = await file.text()


function getFirstAndLastNumber(string: string) {
    let firstNumber = null
    let lastNumber = null
    let count = 0
    let firstIndex: number = 0
    let lastIndex: number = 0
    for (const char of string) {
        const int = parseInt(char)
        if (!firstNumber && !isNaN(int)) {
            firstNumber = int 
            firstIndex = count
        }
        if (!isNaN(int)){
            lastNumber = int
            lastIndex = count
        }
        count+=1
    }
    return {
        firstNumber,
        lastNumber,
        firstIndex,
        lastIndex
    }
}

const map = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}  

const lines = text.split("\n")

let count = 0
for (const line of lines) {
    let replacedLines = []
    for (const [key, value] of Object.entries(map)) {
        const replacedNumber = key.slice(0, -1) + String(value);
        replacedLines.push(line.replaceAll(key, replacedNumber))
    }
    const replacedLinesExclusive = [...new Set(replacedLines)]
    const replacedLinesWithInfo = replacedLinesExclusive.map((replacedLine) => {
        return getFirstAndLastNumber(replacedLine) 
    }).filter((line) => line.firstNumber && line.lastNumber)
    let storedFirstNumber = 0
    let storedLastNumber = 0
    let storedFirstIndex = line.length
    let storedLastIndex = 0
    for (const {firstNumber, lastNumber, firstIndex, lastIndex} of replacedLinesWithInfo) {
        if (firstNumber && firstIndex <= storedFirstIndex) {
            storedFirstIndex = firstIndex
            storedFirstNumber = firstNumber
        }
        if (lastNumber && lastIndex >= storedLastIndex){
            storedLastIndex = lastIndex
            storedLastNumber = lastNumber
        }  
    }
    let total = 0
    if (storedFirstNumber && storedLastNumber)
        total = parseInt(String(storedFirstNumber) + String(storedLastNumber))
    console.log(line, storedFirstNumber, storedLastNumber, total)
    count+=total
}

console.log(count)