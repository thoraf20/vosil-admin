import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import moment from 'moment'

import { Header } from '../components';
import { settingsData, updateSettingsData } from '../redux/actions/settings';
import Permissions from '../components/Permissions/Permissions';
import SmallHeader from '../components/SmallHeader';
import { MenuItem } from '@mui/material';
import { staffsData, updatePermissionData } from '../redux/actions/staffs';

const Settings = () => {

  const dispatch = useDispatch()
  const setting = useSelector((state) => state.settings)
  const staffs = useSelector((state) => state.staffs)

  const { loading, success, allData} = setting

  const today = moment(allData?.date).format('yyyy-MM-DD')

  const [state, setState] = useState(today)
  const [permission, setPermission] = useState([])
  const [userId, setUserId] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({...state, [name]: value});
  };

  const handleStaffChange = (event) => {
    setUserId(event.target.value);
    setPermission(staffs?.allData?.find(el => el._id === event.target.value).permissions)
  };

  useEffect(() => {
    dispatch(settingsData())
    dispatch(staffsData())
  }, [dispatch])


  const { date } = state

  const handleSubmit = async () => {
    const requestData = { date }
    dispatch(updateSettingsData(allData?._id, requestData))
  }

  const onChange = (e, perm) => {
    if (permission.includes(perm)){
      setPermission(permission.filter(el => el !== perm))
    } 
    else{
      setPermission([...permission, perm])
    }
  }

  const handlePermissionSubmit = async () => {
    const requestData = { permission }
    dispatch(updatePermissionData(allData?._id, requestData))
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    {console.log(permission.includes('create'))}
      <Header category="Settings" title="Date" />
      {  loading ? 'loading' : (
      <TextField
        id="date"
        label="Date"
        type="date"
        value={moment(allData?.date).format('yyyy-MM-DD')}
        name='date'
        sx={{ width: 220 }}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      )}
      <div className='flex justify-end'>
        <button
          type="button"
          onClick={handleSubmit}
          style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
          className="text-sm text-white p-4 mb-10 hover:drop-shadow-xl hover:bg-light-gray"
        >
          Update
        </button>
      </div>

      <TextField
          id="outlined-select-account-type"
          select
          label="Select"
          value={userId}
          onChange={handleStaffChange}
          size='small'
          helperText="Please select staff"
          style={{width: '40%'}}
        >
          {staffs?.allData?.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.surName + ' ' + option.otherNames}
            </MenuItem>
          ))}
        </TextField>

      <Header title="Permissions" />

      <SmallHeader title="Customers" />
      <Permissions title="create" 
      onChange={(e) => onChange(e, '/v1/customer/_create')}
      defaultChecked={permission.includes('create')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, '/v1/customer/_create')}
        defaultChecked={permission.includes('updat')}
      />

      <SmallHeader title="Savings" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/v1/savings/_create')}
        defaultChecked={permission.includes('create')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, '/v1/savings/_create')}
        defaultChecked={permission.includes('update')}
      />

      <SmallHeader title="Withdrawals" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/v1/withdrawals/_create')}
        defaultChecked={permission.includes('create')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, '/v1/withdrawals/_create')}
        defaultChecked={permission.includes('update')}
      />

      <SmallHeader title="Loans" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/v1/loans/_create')}
        defaultChecked={permission.includes('create')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, '/v1/loans/_update')}
        defaultChecked={permission.includes('update')}
      />

      <SmallHeader title="Staffs" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/v1/_create_staff')}
        defaultChecked={permission.includes('update')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, '/v1/staffs/_update')}
        defaultChecked={permission.includes('update')}
      />

      <SmallHeader title="Settings" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/v1/settings/_create')}
        defaultChecked={permission.includes('create')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, '/v1/settings/_update')}
        defaultChecked={permission.includes('update')}
      />
      

      <div className='flex justify-end'>
        <button
          type="button"
          onClick={handlePermissionSubmit}
          style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
          className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Settings;

