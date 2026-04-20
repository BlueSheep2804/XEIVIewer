export function getRecipeInputUrl(entryType: Identifier, input: Identifier) {
  return `/recipes?input=${entryType.simple};${input.full}`
}

export function getRecipeOutputUrl(entryType: Identifier, output: Identifier) {
  return `/recipes?output=${entryType.simple};${output.full}`
}
