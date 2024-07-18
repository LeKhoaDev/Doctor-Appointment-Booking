import React from 'react'
import '../Styles/LayoutStyles.css'
import { adminMenu } from '../Data/data'
import { Link, useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
    const location = useLocation()

    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>Doctor Appointment</h6>
                            <hr />
                        </div>
                        <div className="menu">
                            {adminMenu.map(menu => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && 'active'}`}>
                                            <i className={menu.icon}></i>
                                            <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <h1 className='text-center'>Doctor Appointment Admin</h1>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout