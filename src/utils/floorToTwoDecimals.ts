export function floorToTwoDecimals(num: number): string {
  return (Math.floor(num * 100) / 100).toFixed(2)
}
