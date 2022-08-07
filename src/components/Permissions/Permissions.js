import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';


const Permissions = ({title, onChange, defaultChecked}) => {
 const [checked, setChecked] = useState(defaultChecked)
 const change = (e) =>{
  onChange(e)
  setChecked(e.target.checked)
 }
 useEffect(()=>{
  setChecked(defaultChecked)
 },[defaultChecked])
  return (
    <div>
      <div className='flex justify-between'>
        <Typography>
          {title}
        </Typography>
        <Checkbox checked={checked} onChange={change}/>
      </div>
    </div>
  )
}

export default Permissions;