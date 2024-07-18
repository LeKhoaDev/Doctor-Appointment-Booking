/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL, token } from '../../config'
import '../../Styles/LayoutStyles.css'
const Users = () => {
    const [users, setUsers] = useState([])


    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/users/')
            .then(users => setUsers(users.data.data))
            .catch(err => console.log(err))

    }, [])

    // antd table col


    return (
        <Layout>
            <h1 className='text-center'>User List</h1>
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
                                    Gender
                                </th>
                                <th>
                                    Blood Type
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                return (
                                    <>
                                        <tr>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.bloodType}</td>
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

export default Users
