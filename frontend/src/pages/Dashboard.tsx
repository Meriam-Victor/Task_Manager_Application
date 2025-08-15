import TaskList from '../components/Tasks/TaskList'
import type { User } from '../types/types'

interface DashboardProps {
  user: User
}

function Dashboard({ user }: DashboardProps) {
  return (
    <div>
      <h1 className="title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Welcome {user?.fullName}
      </h1>
      <TaskList />
    </div>
  )
}

export default Dashboard