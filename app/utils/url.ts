export function getRecipeInputUrl(entryType: Identifier, input: Identifier) {
  return `/?input=${entryType.simple};${input.full}`
}

export function getRecipeOutputUrl(entryType: Identifier, output: Identifier) {
  return `/?output=${entryType.simple};${output.full}`
}
