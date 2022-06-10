import React, { useState} from 'react'
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';


const PostLoan = () => {

  // const [account, setAccount] = useState();

  // const handleChange = (event) => {
  //   setAccount(event.target.value);
  // };
  
  return (
    <div className='flex justify-center w-full'>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Account Number"
        />
        <TextField
          required
          id="outlined-required"
          label="Amount"
        />
      </div>
      <div className='flex justify-end'>
      <button
            type="button"
            onClick={'handleSubmit'}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            Submit
        </button>
      </div>
      </Box>
    </div>
  )
}

export default PostLoan