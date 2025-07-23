export const formatDateInput = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  let formatted = ''

  if (numbers.length <= 2) {
    formatted = numbers
  } else if (numbers.length <= 4) {
    formatted = numbers.slice(0, 2) + '.' + numbers.slice(2)
  } else if (numbers.length <= 8) {
    formatted = numbers.slice(0, 2) + '.' + numbers.slice(2, 4) + '.' + numbers.slice(4, 8)
  } else {
    formatted = numbers.slice(0, 2) + '.' + numbers.slice(2, 4) + '.' + numbers.slice(4, 8)
  }

  return formatted
}
