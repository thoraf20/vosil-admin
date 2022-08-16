import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const DeleteItem = () => {

  return (
    <div className='item-center mt-4'>
      <div className='flex justify-between'>
         <button
            type="button"
            onClick={'handleSubmit'}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white px-10 py-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            Confirm
        </button>
        <button
            type="button"
            onClick={'handleSubmit'}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white px-10 hover:drop-shadow-xl hover:bg-light-gray"
          >
            Cancel
        </button> 
      </div>
    </div>
  )
}

export default DeleteItem