import { useRef, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useCMS } from './CMSContext'
import { Edit } from 'lucide-react'
import { EditPlacementsModal } from './CMSModals'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement
)

export default function Placements() {
  const { placementsList, isAuthenticated } = useCMS()
  const barRef = useRef<any>(null)
  const doughnutRef = useRef<any>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const [barData, setBarData] = useState<ChartData<'bar'>>({
    labels: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
    datasets: [
      {
        label: 'Placement Rate (%)',
        data: [95, 97, 88, 90, 86],
        backgroundColor: '#7b3ed6',
        borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
        borderSkipped: false,
        maxBarThickness: 40,
      },
    ],
  })

  const [doughnutData, setDoughnutData] = useState<ChartData<'doughnut'>>({
    labels: ['Placed', 'Remaining'],
    datasets: [
      {
        data: [86, 14],
        backgroundColor: ['#ec0a78', 'rgba(255, 255, 255, 0.08)'],
        borderWidth: 0,
      },
    ],
  })

  useEffect(() => {
    if (!placementsList || placementsList.length === 0) return

    const years = placementsList.map(p => `${p.year - 1}-${String(p.year).slice(2)}`)
    const rates = placementsList.map(p => p.placement_percentage)

    const barChart = barRef.current
    let gradient: any = '#7b3ed6'
    let hoverGradient: any = '#ec0a78'

    if (barChart) {
      const ctx = barChart.ctx
      gradient = ctx.createLinearGradient(0, 0, 0, 240)
      gradient.addColorStop(0, '#ec0a78')
      gradient.addColorStop(1, '#7b3ed6')

      hoverGradient = ctx.createLinearGradient(0, 0, 0, 240)
      hoverGradient.addColorStop(0, '#f15a24')
      hoverGradient.addColorStop(1, '#ec0a78')
    }

    setBarData({
      labels: years,
      datasets: [
        {
          label: 'Placement Rate (%)',
          data: rates,
          backgroundColor: gradient,
          hoverBackgroundColor: hoverGradient,
          borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
          borderSkipped: false,
          maxBarThickness: 40,
        }
      ]
    })

    const latestPlacement = placementsList[placementsList.length - 1] || { placement_percentage: 86 }
    const latestRate = latestPlacement.placement_percentage

    const doughnutChart = doughnutRef.current
    let dGradient: any = '#ec0a78'
    if (doughnutChart) {
      const ctx = doughnutChart.ctx
      dGradient = ctx.createLinearGradient(0, 0, 200, 200)
      dGradient.addColorStop(0, '#ec0a78')
      dGradient.addColorStop(1, '#7b3ed6')
    }

    setDoughnutData({
      labels: ['Placed', 'Remaining'],
      datasets: [
        {
          data: [latestRate, 100 - latestRate],
          backgroundColor: [dGradient, 'rgba(255, 255, 255, 0.08)'],
          hoverBackgroundColor: [dGradient, 'rgba(255, 255, 255, 0.12)'],
          borderWidth: 0,
        }
      ]
    })
  }, [placementsList])

  const latestPlacement = placementsList[placementsList.length - 1] || { placement_percentage: 86 }
  const latestRate = latestPlacement.placement_percentage

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(9, 14, 27, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        titleFont: { family: 'Outfit', size: 12, weight: 'bold' },
        bodyFont: { family: 'Outfit', size: 12 },
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'bar'>) => ` Placement Rate: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.65)',
          font: { family: 'Outfit', size: 12, weight: 500 },
        },
        border: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.07)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: { family: 'Outfit', size: 11 },
          stepSize: 20,
          callback: (value: string | number) => `${value}%`,
        },
        border: {
          dash: [5, 5],
          display: false,
        },
      },
    },
  }

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(9, 14, 27, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        titleFont: { family: 'Outfit', size: 12, weight: 'bold' },
        bodyFont: { family: 'Outfit', size: 12 },
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => ` ${context.label}: ${context.raw}%`,
        },
      },
    },
  }

  return (
    <section className="placements reveal-section" id="placements">
      <div className="placement-copy" style={{ position: 'relative' }}>
        <h2>Outcomes presented with motion, evidence, and recruiter momentum.</h2>
        <p>Interactive analytical tools, company partnerships, student achievements, and placement metrics powered by live statistics.</p>
        {isAuthenticated && (
          <button
            onClick={() => setShowEditModal(true)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 10,
              background: 'rgba(6, 24, 70, 0.08)',
              border: '1px solid rgba(6, 24, 70, 0.15)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              padding: '8px 16px',
              color: '#061846',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Edit size={14} /> Edit Placement Statistics
          </button>
        )}
      </div>

      <div className="chart-grid">
        <div className="chart-panel" aria-label="Placement rate trend">
          <div className="chart-header">
            <h3>PLACEMENT TREND</h3>
            <span>ANNUAL SUCCESS RATE (%)</span>
          </div>
          <div className="chart-canvas-wrapper">
            <Bar ref={barRef} data={barData} options={barOptions} />
          </div>
        </div>

        <div className="chart-panel doughnut-panel">
          <div className="chart-header">
            <h3>BATCH STATUS</h3>
            <span>CURRENT RECRUITMENT RATE</span>
          </div>
          <div className="doughnut-chart-wrapper">
            <div className="chart-canvas-wrapper">
              <Doughnut ref={doughnutRef} data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="doughnut-center-label">
              <strong>{latestRate}%</strong>
              <span>Placed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recruiter-strip">
        {['Infosys', 'TCS', 'Zoho', 'Amazon', 'Bosch', 'Accenture', 'Wipro', 'Cognizant'].map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>

      {showEditModal && <EditPlacementsModal onClose={() => setShowEditModal(false)} />}
    </section>
  )
}
