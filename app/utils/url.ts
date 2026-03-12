export function getRecipeInputUrl(input: Identifier) {
  return `/recipes?input_id=${input.full}`
}

export function getRecipeOutputUrl(output: Identifier) {
  return `/recipes?output_id=${output.full}`
}
