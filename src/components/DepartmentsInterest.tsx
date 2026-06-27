import React from 'react'
import { 
  Laptop, 
  Cpu, 
  Zap, 
  Settings, 
  Building, 
  Brain, 
  Database, 
  Briefcase, 
  Network
} from 'lucide-react'

interface DepartmentItem {
  name: string
  key: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
}

const RIT_DEPARTMENTS: DepartmentItem[] = [
  {
    name: 'B.Tech AI & Data Science',
    key: 'departments-aids',
    icon: Database,
    color: '#ec4899', // Pink
    bgColor: 'rgba(236, 72, 153, 0.12)'
  },
  {
    name: 'CSE (AI & ML)',
    key: 'departments-aiml',
    icon: Brain,
    color: '#a855f7', // Purple
    bgColor: 'rgba(168, 85, 247, 0.12)'
  },
  {
    name: 'Computer Science & Engg',
    key: 'departments-cse',
    icon: Laptop,
    color: '#2dd4bf', // Teal
    bgColor: 'rgba(45, 212, 191, 0.12)'
  },
  {
    name: 'Electronics & Communication Engg',
    key: 'departments-ece',
    icon: Cpu,
    color: '#f59e0b', // Amber
    bgColor: 'rgba(245, 158, 11, 0.12)'
  },
  {
    name: 'Electrical & Electronics Engg',
    key: 'departments-eee',
    icon: Zap,
    color: '#3b82f6', // Blue
    bgColor: 'rgba(59, 130, 246, 0.12)'
  },
  {
    name: 'Mechanical Engineering',
    key: 'departments-mech',
    icon: Settings,
    color: '#ef4444', // Red
    bgColor: 'rgba(239, 68, 68, 0.12)'
  },
  {
    name: 'Civil Engineering',
    key: 'departments-civil',
    icon: Building,
    color: '#10b981', // Green
    bgColor: 'rgba(16, 185, 129, 0.12)'
  },
  {
    name: 'B.Tech CS & Business Systems',
    key: 'departments-csbs',
    icon: Briefcase,
    color: '#06b6d4', // Cyan
    bgColor: 'rgba(6, 182, 212, 0.12)'
  },
  {
    name: 'B.Tech Information Technology',
    key: 'departments-it',
    icon: Network,
    color: '#6366f1', // Indigo
    bgColor: 'rgba(99, 102, 241, 0.12)'
  }
]

interface DepartmentsInterestProps {
  onSelectPage: (key: string) => void
}

export default function DepartmentsInterest({ onSelectPage }: DepartmentsInterestProps) {
  return (
    <section className="interests-section reveal-section" id="interests">
      <div className="interests-container">
        <div className="interests-header-row">
          <h2 className="interests-title">WHAT'S YOUR INTEREST?</h2>
        </div>

        <div className="interests-grid">
          {RIT_DEPARTMENTS.map((dept) => {
            const IconComponent = dept.icon
            return (
              <div 
                key={dept.key} 
                className="interest-card"
                onClick={() => onSelectPage(dept.key)}
              >
                <div 
                  className="interest-icon-box"
                  style={{ 
                    backgroundColor: dept.bgColor,
                    color: dept.color 
                  }}
                >
                  <IconComponent size={24} strokeWidth={2} />
                </div>
                <span className="interest-name">{dept.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
