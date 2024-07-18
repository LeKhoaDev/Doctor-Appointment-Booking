/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { BiMenu } from 'react-icons/bi'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, token } from '../../config'
import { toast } from 'react-toastify'
import useGetProfile from '../../hooks/useFetchData'

const Tabs = ({ tab, setTab }) => {

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const { data: doctorData, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`)
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
    }

    // deleted function 
    const handleDeleted = (id) => {
        try {
            const res = fetch(`${BASE_URL}/doctors/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })

            if (!res.ok) {
                throw Error(result.message)
            }

            toast.success(result.message)
            navigate('/home')
        } catch (err) {
            toast.error(err.message)
        }
        dispatch({ type: "LOGOUT" })
    }

    return (
        <div>
            <span className='lg:hidden'><BiMenu className='w-6 h-6 cursor-pointer' /></span>
            <div className=' lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
                <button onClick={() => setTab('overview')} className={`${tab == "overview" ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>Overview</button>
                <button onClick={() => setTab('appointments')} className={`${tab == "appointments" ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>Appointments</button>
                <button onClick={() => setTab('settings')} className={`${tab == "settings" ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>Profile</button>
                <div className='mt-[100px] w-full '>
                    <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
                    <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white' onClick={() => handleDeleted(doctorData._id)}>Delete account</button>
                </div>
            </div>

        </div>
    )
}

export default Tabs
