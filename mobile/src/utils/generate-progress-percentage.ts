export function generateProgressPercentage(total: number, completed: number) {
  const percentage = total > 0 ? Math.round((total / completed) * 100) : 0

  return percentage
}
