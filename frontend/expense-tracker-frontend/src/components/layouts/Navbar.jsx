import React, { useState } from 'react'
import { SideMenu } from './SideMenu';
export const Navbar = ({activeMenu}) => {
    const {openSideMenu, setOpenSideMenu} = useState(false);

  return (
    <div className='Navbar-section'>
        <h2>Expense Tracker</h2>
        {setOpenSideMenu(true)}
        {openSideMenu && (
            <div>
                <SideMenu activeMenu={activeMenu} />
            </div>
        )}
    </div>
  )
}
