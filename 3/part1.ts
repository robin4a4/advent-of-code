const file = Bun.file("./test.txt");
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

lines.forEach((line, lineIndex) => {
  const num = /\d+/g;
  line.match(num)?.forEach((match) => {
    numbers.push({
      lineIndex,
      value: match,
      startIndex: line.indexOf(match),
      endIndex: line.indexOf(match) + match.length - 1,
    });
  });
  const symbol = /[^a-zA-Z0-9.]/g;
  line.match(symbol)?.forEach((match) => {
    symbols.push({
      lineIndex,
      value: match,
      startIndex: line.indexOf(match),
      endIndex: line.indexOf(match) + match.length - 1,
    });
  });
});
console.log(numbers, symbols)
let adjacents = 0;
for (const number of numbers) {
    let hasAdgacent = false
    for (const symbol of symbols) {
        const validLineIndex =
          number.lineIndex == symbol.lineIndex ||
          number.lineIndex + 1 == symbol.lineIndex ||
          number.lineIndex - 1 == symbol.lineIndex;
        const validColumnIndex =
          number.endIndex + 1 == symbol.startIndex ||
          number.startIndex - 1 == symbol.startIndex ||
          (symbol.startIndex >= number.startIndex && symbol.endIndex <= number.endIndex);
        console.log(number.value, symbol.value, validLineIndex && validColumnIndex, validLineIndex, number.endIndex + 1 == symbol.startIndex, number.startIndex - 1 == symbol.startIndex, (symbol.startIndex >= number.startIndex && symbol.endIndex <= number.endIndex))
        if (validLineIndex && validColumnIndex) {
            hasAdgacent = true;
            break
        }
    }
  if (hasAdgacent) {
        console.log(parseInt(number.value))
      adjacents += parseInt(number.value)
  }
}

console.log(adjacents)