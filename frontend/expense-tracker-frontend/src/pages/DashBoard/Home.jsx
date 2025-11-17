import React from 'react'
import DashBoardLayout from '../../components/layouts/DashBoardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'

function Home() {
  useUserAuth()
  return (
   <DashBoardLayout activeMenu={"Dashboard"}>
    <div className="dashboard-section">
      Home
    </div>
   </DashBoardLayout>
  )
}

export default Home   