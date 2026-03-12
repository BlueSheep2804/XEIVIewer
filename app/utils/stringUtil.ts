export function firstUppercase(input: string): string {
  if (input.length === 1) {
    return input.toUpperCase()
  }
  return input.charAt(0).toUpperCase() + input.substring(1)
}
