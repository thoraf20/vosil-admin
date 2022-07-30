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

  const { loading, success, settingData} = setting
  const {  allData } = staffs

  const today = moment(settingData?.date).format('yyyy-MM-DD')

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
    dispatch(updateSettingsData(settingData?._id, requestData))
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

    dispatch(updatePermissionData(userId, requestData))
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Settings" title="Date" />
      {  loading ? 'loading' : (
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
      <div className='flex justify-end'>
        <button
          type="button"
          onClick={handleSubmit}
          style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
          className="text-sm text-white p-4 mb-10 hover:drop-shadow-xl hover:bg-light-gray"
        >
          {loading ? 'Updating' : 'Update'}
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
      defaultChecked={permission.includes('/v1/customer/_create')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, 'update_customer')}
        defaultChecked={permission.includes('update_customer')}
      />
      <Permissions title="delete"
        onChange={(e) => onChange(e, 'delete_customer')}
        defaultChecked={permission.includes('delete_customer')}
      />

      <SmallHeader title="Savings" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/savings/_create')}
        defaultChecked={permission.includes('/savings/_create')}
      />
      <Permissions title="delete"
        onChange={(e) => onChange(e, 'delete_savings')}
        defaultChecked={permission.includes('delete_savings')}
      />

      <SmallHeader title="Withdrawals" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/withdrawals/_create')}
        defaultChecked={permission.includes('/withdrawals/_create')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, 'update_withdrawals')}
        defaultChecked={permission.includes('update_withdrawals')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, 'delete_withdrawals')}
        defaultChecked={permission.includes('delete_withdrawals')}
      />

      <SmallHeader title="Loans" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/loans/_create')}
        defaultChecked={permission.includes('/loans/_create')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, 'update_loan')}
        defaultChecked={permission.includes('update_loan')}
      />
      <Permissions title="delete"
        onChange={(e) => onChange(e, 'delete_loan')}
        defaultChecked={permission.includes('delete_loan')}
      />

      <SmallHeader title="Staffs" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/_create_staff')}
        defaultChecked={permission.includes('/_create_staff')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, 'update_permission')}
        defaultChecked={permission.includes('update_permission')}
      />

      {/* <SmallHeader title="Settings" />
      <Permissions title="create"
        onChange={(e) => onChange(e, '/v1/settings/_create')}
        defaultChecked={permission.includes('create')}
      />
      <Permissions title="update"
        onChange={(e) => onChange(e, '/v1/settings/_update')}
        defaultChecked={permission.includes('update_create')}
      /> */}
      

      <div className='flex justify-end'>
        <button
          type="button"
          onClick={handlePermissionSubmit}
          style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
          className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
        >
          {staffs?.loading ? 'Updating' : 'Update'}
        </button>
      </div>
    </div>
  );
};

export default Settings;

