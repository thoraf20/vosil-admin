import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import moment from 'moment'
import { toast, Toaster} from 'react-hot-toast'

import { settingsData, updateSettingsData } from '../redux/actions/settings';


const Date = () => {
  const dispatch = useDispatch()
  const setting = useSelector((state) => state.settings)
  const dateUpdate = useSelector((state) => state.updateSettings)

  const { settingData} = setting
  const { loading, success, error, updateDate } = dateUpdate

  const today = moment(settingData?.date).format('yyyy-MM-DD')

  const [state, setState] = useState(today)

  const { date } = state

  useEffect(() => {
    dispatch(settingsData())
  }, [dispatch])

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({...state, [name]: value});
  };

  const handleSubmit = async () => {
    const requestData = { date }
    dispatch(updateSettingsData(settingData?._id, requestData))
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
    `${updateDate.msg}`, { duration: 7000}
  )

  const notifyError = () => toast.error(
    `${error}`, { duration: 7000, position: 'top-right'}
  )

  return (
    <>
    <Toaster  />
    <div className='flex justify-between w-full'>
    {loading ? "loading..." : (
      <TextField
        id="date"
        label="Date"
        type="date"
        value={moment(settingData?.date).format('yyyy-MM-DD')}
        name='date'
        sx={{ width: 220 }}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
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