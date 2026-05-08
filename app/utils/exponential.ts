export const toExponential = (num: number) => {
  const str = num.toExponential(2)
    .replace(/\.00/, '')
    .replace(/e\+/, 'e')
  return str
}
