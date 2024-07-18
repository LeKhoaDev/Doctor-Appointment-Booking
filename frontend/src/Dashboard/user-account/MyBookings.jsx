/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { BASE_URL, token } from '../../config'
import DoctorCard from '../../components/Doctors/DoctorCard'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import useFetchData from '../../hooks/useFetchData'
import { toast } from 'react-toastify'

const MyBookings = () => {

    const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`)


    return (
        <div>
            {/* Loading */}
            {loading && !error && <Loading />}

            {/* Error  */}
            {error && !loading && <Error errMessage={error} />}

            {!loading && !error && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {
                        appointments.map(doctor => <DoctorCard doctor={doctor} key={doctor._id} />)
                    }
                </div>
            )}

            {!loading && !error && appointments.length === 0 && (
                <h2 className='mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor'>You did not book any doctor yet!</h2>
            )}
        </div>
    )
}

export default MyBookings
