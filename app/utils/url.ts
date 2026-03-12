export function recipeInputUrl(input: Identifier) {
  return `/recipes?input_id=${input.full}`
}

export function recipeOutputUrl(output: Identifier) {
  return `/recipes?output_id=${output.full}`
}
