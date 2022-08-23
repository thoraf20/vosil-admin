import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import { toast, Toaster} from 'react-hot-toast'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


import { Header } from '../components';
import Permissions from '../components/Permissions/Permissions';
import SmallHeader from '../components/SmallHeader';
import { MenuItem } from '@mui/material';
import { staffsData, updatePermissionData } from '../redux/actions/staffs';
import Date from '../components/Date';
import moment from 'moment';

const Settings = () => {

  const dispatch = useDispatch()
  const staffs = useSelector((state) => state.staffs)
  const permissions = useSelector((state) => state.updatePermission)
  
  const { allData } = staffs
  const { loading, success, error, permissionData } = permissions

  const [permission, setPermission] = useState([])
  const [userId, setUserId] = useState('')

  const newDate = moment().format('DD/MM/YY')
  const [date, setDate] = useState(newDate);


  const handleStaffChange = (event) => {
    setUserId(event.target.value);
    setPermission(allData?.staffs?.find(el => el._id === event.target.value).permissions)
  };

  useEffect(() => {
    dispatch(staffsData(","))
  }, [dispatch])

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
    dispatch(staffsData())
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
    `${permissionData.msg}`, { duration: 7000}
  )

  const notifyError = () => toast.error(
    `${error}`, { duration: 7000, position: 'top-right'}
  )

  // const handleDate = () => {
  //   setStartDate()
  // }

  return (
    <>
    <Toaster  />
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Settings" title="Date" />
      <Date />

      {/* <DatePicker 
      selected={date} 
      onChange={date => setDate(date)}
      style={{border: "2px solid black"}}
      /> */}

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
          {allData?.map((option) => (
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

      <div className='flex justify-end'>
        <button
          type="button"
          onClick={handlePermissionSubmit}
          style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
          className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
        >
          {loading ? 'Updating' : 'Update'}
        </button>
      </div>
    </div>
    </>
  );
};

export default Settings;

