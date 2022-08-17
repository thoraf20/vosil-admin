import axios from 'axios';
import * as React from 'react';
import { baseUrl } from '../../api/baseUrl';
import { toast, Toaster} from 'react-hot-toast'


const DeleteWithdrawal = ({onClose, id}) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  const config = {
    headers: {
      Authorization: `Bearer ${userToken.token}`,
    },
  }

  const handleDelete = async () => {
    const response = await axios.delete(`${baseUrl}/withdrawals/${id}`, config);
    toast.success(
      `${response?.data.msg}`, { duration: 7000}
    )
    setTimeout(() => {
      onClose()
    }, 4000);
  }

  return (
    <React.Fragment>
    <Toaster  />
    <div className='item-center mt-4'>
      <div className='flex justify-between'>
        <button
        type="button"
        onClick={handleDelete}
        style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
        className="text-sm text-white px-10 py-4 hover:drop-shadow-xl hover:bg-light-gray"
        >
          Confirm
      </button>
      <button
        type="button"
        onClick={onClose}
        style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
        className="text-sm text-white px-10 hover:drop-shadow-xl hover:bg-light-gray"
        >
          Cancel
      </button> 
      </div>
    </div>
    </React.Fragment>
  )
}

export default DeleteWithdrawal