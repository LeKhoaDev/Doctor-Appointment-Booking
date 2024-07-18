import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { message } from 'antd'

const Doctors = () => {

    const [doctors, setDoctors] = useState([])


    // handle status doctor
    const handleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/v1/doctors/change/status/${id}`, { isApproved: 'approved' })
            window.location.reload()
        } catch (err) {
            message.err('Something Went Wrong')
        }
    }

    // handle status pending doctor
    const handleStatusPending = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/v1/doctors/pending/status/${id}`, { isApproved: 'pending' })
            window.location.reload()
        } catch (err) {
            message.err('Something Went Wrong')
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/doctors/all/doctor')
            .then(doctors => setDoctors(doctors.data.data))
            .catch(err => console.log(err))


    }, [])

    return (
        <Layout>
            <h1 className='text-center'>Doctor List</h1>
            <div className='w-100 vh-100 d-flex justify-content-center text-center'>
                <div className='ww'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Specialization
                                </th>
                                <th>
                                    Ticket Price
                                </th>
                                <th>
                                    TotalRating
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map(doctor => {
                                return (
                                    <>
                                        <tr>
                                            <td>{doctor.name}</td>
                                            <td>{doctor.email}</td>
                                            <td>{doctor.specialization}</td>
                                            <td>{doctor.ticketPrice}</td>
                                            <td>{doctor.totalRating}</td>
                                            <td >{doctor.isApproved === 'pending' ? (
                                                <button onClick={() => handleStatus(doctor._id)} className='btn btn-success'>Approved</button>
                                            ) : (
                                                <button onClick={() => handleStatusPending(doctor._id)} className='btn btn-danger'>Reject</button>
                                            )}</td>
                                        </tr>

                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Doctors
