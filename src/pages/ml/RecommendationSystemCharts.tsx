import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LogarithmicScale,
  Tooltip,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LogarithmicScale, BarElement, ArcElement, Tooltip, Legend)

const axis = '#64748b'
const grid = 'rgba(15, 23, 42, 0.06)'
/** Site accent palette (pink · red · orange · yellow). */
const brandPink = '#E9A8E5'
const brandRed = '#F44B2F'
const brandOrange = '#F38300'
const brandYellow = '#FFDA24'
/** Bar chart: Users → Historical. */
const bars = [brandPink, brandRed, brandOrange, brandYellow]
/** Donut: Champion · Challenger — two accents from the same palette. */
const routingDonut = [brandOrange, brandPink]

export function RecommendationScaleChart() {
  return (
    <div className="h-[280px] w-full min-h-[240px]">
      <Bar
        data={{
          labels: ['Users', 'Products', 'Recent interactions', 'Historical interactions'],
          datasets: [
            {
              label: 'Count (log scale)',
              data: [50, 80, 251, 10186],
              backgroundColor: bars,
              borderRadius: 6,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${Number(ctx.parsed.y).toLocaleString()}`,
              },
            },
          },
          scales: {
            x: {
              ticks: { color: axis, font: { size: 11 } },
              grid: { display: false },
            },
            y: {
              type: 'logarithmic',
              min: 40,
              ticks: {
                color: axis,
                callback: (raw) => {
                  const v = Number(raw)
                  return Number.isInteger(Math.log10(v)) ? v.toLocaleString() : ''
                },
              },
              grid: { color: grid },
            },
          },
        }}
      />
    </div>
  )
}

export function RecommendationTrafficDonut() {
  return (
    <div className="mx-auto h-[260px] w-full max-w-[320px] min-h-[220px]">
      <Doughnut
        data={{
          labels: ['Champion (configured)', 'Challenger (configured)'],
          datasets: [
            {
              data: [90, 10],
              backgroundColor: routingDonut,
              borderWidth: 2,
              borderColor: '#ffffff',
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: axis, font: { size: 11 }, padding: 16 },
            },
          },
        }}
      />
    </div>
  )
}
