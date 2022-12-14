import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab'
import { toast, Toaster} from 'react-hot-toast'
import { addDate, settingsData } from '../redux/actions/settings';


const Date = () => {
  const dispatch = useDispatch()
  const setting = useSelector((state) => state.settings)
  const dateUpdate = useSelector((state) => state.updateSettings)

  const { settingData, success, error } = setting
  const { loading  } = dateUpdate

  const [selectedDate, setSelecetedDate] = useState(settingData?.date)

  useEffect(() => {
    dispatch(settingsData())
  }, [dispatch])

  const handleSubmit = async () => {
    const requestData = { date: selectedDate }
    dispatch(addDate(requestData))
    dispatch(settingsData())
  }

  useEffect(() => {
    if (error) {
      notifyError()
    }
    if (success) {
      notify()
    }
  }, [success, error])

  const notify = () => toast.success(
    'Date updated successfully', { duration: 7000}
  )

  const notifyError = () => toast.error(
    `${error}`, { duration: 7000, position: 'top-right'}
  )

  return (
    <>
    <Toaster  />
    
    <div className='flex justify-between w-full'>
    {loading ? "loading..." : (
      <DatePicker
        label='Select Date'
        renderInput={(params) => <TextField {...params} />}
        value={selectedDate}
        onChange={(newValue) => {
          setSelecetedDate(newValue)
        }}
      />
    )}

      <div>
        <button
          type="button"
          onClick={handleSubmit}
          style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
          className="text-sm text-white p-4 mb-10 hover:drop-shadow-xl hover:bg-light-gray"
        >
          {loading ? 'Updating' : 'Update'}
        </button>
      </div>
      </div>
    </>
  )
}

export default Date;