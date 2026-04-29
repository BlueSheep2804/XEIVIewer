export function getRecipeInputUrl(entryType: string, input: Identifier) {
  return `/?input=${entryType};${input.full}`
}

export function getRecipeOutputUrl(entryType: string, output: Identifier) {
  return `/?output=${entryType};${output.full}`
}
