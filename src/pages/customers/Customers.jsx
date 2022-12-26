import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { customerData } from '../../redux/actions/customers';
import { customerFilter } from '../../utils';
import { MenuItem, TextField } from '@mui/material';
import CustomerTable from '../../components/Table/CustomerTable';
import * as XLSX from 'xlsx';


export default function Customers() {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const data = useSelector((state) => state.customers)

  const { allData, count } = data

  const [searchQuery, setSearchQuery] = useState("");
  const [column, setColumToQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const handleChange = (e) => {
    setColumToQuery(e.target.value)
  }
  
  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(customerData(searchQuery, column));
    }, 3000);

    return () => clearTimeout(getData);
  }, [searchQuery, column, dispatch])

  const handleExport = () => {
    const data = allData?.allCustomers.map((index) => {
      return {
        AccountOfficer: index.accountOfficer,
        SurName: index.surName,
        OtherNames: index.otherNames,
        Category: index.category,
        Address: index.officeAddress,
        PhoneNumber: index.phoneNumber,
        AccountNumber: index.accountNumber,
        AccountBalance: index.accountBalance,
        Date: index.date,
      }
    })
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(wb, ws,"ExcelSheet");
    XLSX.writeFile(wb, "customers.xlsx");
  }

  return (
    <Box sx={{ width: '100%' }}>
    {false ? 'loading...' : (
      <Paper sx={{ width: '100%', mb: 2, p: 4 }}>
      <div className='flex justify-end'>
         <div>
           <button
             type="button"
             onClick={() => navigate("/customers/add")}
             style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
              Add Customer
           </button>
        </div>
        </div>
        <div className='flex justify-between w-full'>
        <div>
           <button
             type="button"
             onClick={handleExport}
             style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
             className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
            >
              Export
           </button>
        </div>
        <div>
          <TextField
            id="search-bar"
            className="text"
            onChange={handleSearch}
            value={searchQuery}
            label="Search..."
            variant="outlined"
            placeholder="Search..."
            size="small"
            autoFocus={true}
          />
          <TextField
          id="outlined-select-account-type"
          select
          label="Select"
          value={column}
          onChange={handleChange}
          size='small'
          helperText="Column to search"
        >
          {customerFilter.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}
        </TextField>
        </div>
        </div>
        <CustomerTable allData={allData} count={count}/>
      </Paper>
      )}
      {/* <BasicModal open={open} onClose={handleClose} title='Customer Form' content={<CustomerDetails />}/> */}
    </Box>
  );
}
