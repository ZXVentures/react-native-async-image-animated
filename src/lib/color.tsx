
// https://css-tricks.com/snippets/javascript/lighten-darken-color/

/* tslint:disable no-bitwise */
export const lightenColor = (color: string, amount: number) => {
  if (color [0] === '#') color = color.slice(1)

  const colorValue = parseInt(color, 16)

  let red = (colorValue >> 16) + amount

  if (red > 255) red = 255
  else if  (red < 0) red = 0

  let blue = ((colorValue >> 8) & 0x00FF) + amount

  if (blue > 255) blue = 255
  else if  (blue < 0) blue = 0

  let green = (colorValue & 0x0000FF) + amount

  if (green > 255) green = 255
  else if (green < 0) green = 0

  return `#${(green | (blue << 8) | (red << 16)).toString(16)}`
}
