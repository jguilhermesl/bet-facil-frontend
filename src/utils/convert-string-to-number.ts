export const convertStringToNumber = (value: string) => {
  value = value.replaceAll(",", ".")
  const number = Number(value)
  return number
}