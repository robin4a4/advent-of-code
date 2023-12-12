const file = Bun.file("./input.txt");
const text = await file.text();
const entries = text.split("\n\n");
const [seedsString, ...restEntries] = entries

function splitAndClean(string: string) {
  return string.split(" ").map((subString) => parseInt(subString))
}

const seeds = splitAndClean(seedsString.split("seeds: ")[1])

const locations: number[] = []

for (const seed of seeds) {
  let input = seed
  for (const entry of restEntries) {
    console.log(input)

    const [, ...lines] = entry.split("\n");
    let localInput = null
    for (const lineString of lines) {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = splitAndClean(lineString)
      if (input >= sourceRangeStart && input < sourceRangeStart + rangeLength) {
        const diff = input - sourceRangeStart
        localInput = destinationRangeStart + diff
      }
    }
    if (localInput) input = localInput
  }

  console.log("----")
  if (input)
    locations.push(input)
} 

console.log(locations, Math.min(...locations))