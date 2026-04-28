import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react';

import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

export default function ManageBooking() {

  const { currency, axios } = useAppContext()

  const [bookings, setBookings] = useState([])



  const fetchownerbooking = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner')

      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', {
        booking_id: bookingId,
        status
      })

      if (data.success) {
        toast.success(data.message)
        fetchownerbooking()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchownerbooking()
  }, [])




  return (
    <div className='px-4 md:px-10 pt-14 w-full overflow-hidden'>

      <Title title="Manage Bookings" subtitle="Track all customer booking, aprove or cancel request and manage booking status" />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-slate-300 mt-6'>

        <table className='w-full border-collapse text-left text-sm text-white'>
          <motion.thead
            initial={{ x: -50, opacity: 0, }}
            whileInView={{ x: 0, opacity: 1, }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <tr>
              <th className='font-medium p-3'>Cars</th>
              <th className='font-medium p-3 max-md:hidden'>Date-Range</th>
              <th className='font-medium p-3'>Total</th>
              <th className='font-medium p-3 max-md:hidden'>payment</th>
              <th className='font-medium p-3'>Actions</th>
            </tr>
          </motion.thead>
          <tbody>
            {bookings.map((booking, index) => (
              <motion.tr
                initial={{ x: -120, opacity: 0, scale: 0.8 }}
                whileInView={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                key={index} className='border-t border-slate-500'>

                <td className='p-3 gap-3 items-center flex'>

                  <img src={booking.car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />

                  <p className='font-medium max-md:hidden text-white/90'>
                    {booking.car.brand}  {booking.car.model}
                  </p>

                </td>

                <td className='p-3 max-md:hidden text-white/70'>

                  {booking.pickupDate.split('T')[0]} to  {booking.returnDate.split('T')[0]}

                </td>

                <td className='p-3 font-semibold'>
                  {currency}  {booking.price}
                </td>

                <td className='p-3 max-md:hidden'>

                  <span className='px-3 py-1 rounded-full text-xs bg-white/30'>
                    Offline
                  </span>

                </td>

                <td>
                  {booking.status === 'pending' ? (
                    <select onChange={e => changeBookingStatus(booking._id, e.target.value)} value={booking.status} className='px-1.5 py-1.5 mt-1 rounded-full  bg-white/30 outline-none border border-slate-600'>
                      <option value="pending" className='text-black'>pending</option>
                      <option value="cancelled" className='text-black'>cancelled</option>
                      <option value="confirmed" className='text-black'>confirmed</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-400/15 text-green-500' : 'bg-red-200 text-red-500'}`}>
                      {booking.status}
                    </span>
                  )}
                </td>

              </motion.tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}
