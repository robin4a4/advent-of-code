const file = Bun.file("./input.txt");
const text = await file.text();
const lines = text.split("\n");

type Data = {
  lineIndex: number;
  value: string;
  startIndex: number;
  endIndex: number;
};

const numbers: Data[] = [];
const symbols: Data[] = [];

function populateDataArrays(lineIndex: number, matches: RegExpMatchArray[], array: Data[]) {
  matches.forEach((match) => {
    const matchValue = match[0]  
    const index = match.index ?? 0
    array.push({
      lineIndex,
      value: matchValue,
      startIndex: index,
      endIndex: index + matchValue.length - 1,
    });
  });
}

lines.forEach((line, lineIndex) => {
  const num = /\d+/g;
  const numMatches = [...line.matchAll(num)]
  populateDataArrays(lineIndex, numMatches, numbers)

  const symbol = /[*]/g;
  const symbolMatches = [...line.matchAll(symbol)]
  populateDataArrays(lineIndex, symbolMatches, symbols)
});

let total = 0
for (const symbol of symbols) {
    let numberOfAdgacent = 0
    const adgacents: number[] = []
    for (const number of numbers) {
        const validLineIndex =
          number.lineIndex == symbol.lineIndex ||
          number.lineIndex + 1 == symbol.lineIndex ||
          number.lineIndex - 1 == symbol.lineIndex;
        const validColumnIndex = symbol.startIndex >= number.startIndex - 1 && symbol.endIndex <= number.endIndex + 1;

        if (validLineIndex && validColumnIndex) {
            numberOfAdgacent +=1;
            adgacents.push(parseInt(number.value))
        }
    }
  if (numberOfAdgacent == 2) {
    total += adgacents[0] * adgacents[1]
  }
}

console.log(total)