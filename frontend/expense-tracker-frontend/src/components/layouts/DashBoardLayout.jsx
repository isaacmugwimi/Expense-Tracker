import React from 'react'

import { SideMenu } from './SideMenu'
import { Navbar } from './Navbar'
export default function DashBoardLayout({activeMenu}) {
  return (
    <div className='dashboard' >
        
        <Navbar activeMenu={activeMenu} />
        <div className="">
            <div className="">
                <SideMenu/>
            </div>
            <div className=""></div>
        </div>
    </div>
  )
}
