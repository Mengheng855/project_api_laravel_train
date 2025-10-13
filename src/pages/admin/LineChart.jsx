"use client"

export function LineChart() {
  const points = [380, 365, 375, 360, 370, 355, 365, 350, 360, 345, 355, 340, 350, 345, 355, 350, 360, 355, 365, 360]

  const generatePath = (points) => {
    const width = 600
    const height = 120
    const max = Math.max(...points)
    const min = Math.min(...points)
    const range = max - min
    const segments = points.length - 1

    let path = `M 0 ${height - ((points[0] - min) / range) * height}`

    for (let i = 1; i < points.length; i++) {
      const x = (width / segments) * i
      const y = height - ((points[i] - min) / range) * height
      path += ` L ${x} ${y}`
    }

    return path
  }

  return (
    <div className="relative h-[140px] w-full">
      <svg className="h-full w-full" viewBox="0 0 600 140" preserveAspectRatio="none">
        <path d={generatePath(points)} fill="none" stroke="hsl(var(--chart-1))" strokeWidth="2" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 text-xs text-muted-foreground">
        <span>12 hours ago</span>
        <span>Now</span>
      </div>
    </div>
  )
}
