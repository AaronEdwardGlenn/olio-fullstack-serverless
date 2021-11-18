export const randomNumber = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const pickFromArray = <T>(list: Array<T>): T => {
  return list[randomNumber(0, list.length - 1)]
}