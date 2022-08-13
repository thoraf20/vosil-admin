import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Paper, Box } from '@mui/material'
import CustomerEdit from '../../components/Customer/EditCustomer'
import { IoArrowBack } from "react-icons/io5"


export const EditCustomer = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 4 }}>
      <div className='cursor-pointer'>
        <IoArrowBack
          onClick={() => navigate(-1)}
        />
      </div>
        <CustomerEdit id={id}/>
      </Paper>
    </Box>
  )
}