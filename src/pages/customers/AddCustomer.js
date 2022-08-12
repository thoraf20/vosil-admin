import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, Box } from '@mui/material'
import CustomerDetails from '../../components/Customer/CustomerDetails'
import { IoArrowBack } from "react-icons/io5"


export const AddCustomer = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 4 }}>
      <div className='cursor-pointer'>
        <IoArrowBack
          onClick={() => navigate(-1)}
        />
      </div>
        <CustomerDetails />
      </Paper>
    </Box>
  )
}