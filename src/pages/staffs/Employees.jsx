import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BasicModal from '../../commons/Modals';
import { staffsData } from '../../redux/actions/staffs';
import StaffDetails from '../../components/Staffs/StaffDetails';
import UpdateStaffDetails from '../../components/Staffs/ChangePermission';
import { MenuItem, TextField } from '@mui/material';
import { savingsFilter } from '../../utils';
import EmployeeTable from '../../components/Table/EmployeeTable';
import * as XLSX from 'xlsx';


export default function Employees() {

  const [searchQuery, setSearchQuery] = useState("");
  const [column, setColumToQuery] = useState("");

  const dispatch = useDispatch()

  const data = useSelector((state) => state.staffs)

  const { loading, allData, count } = data

  const handleChange = (e) => {
    setColumToQuery(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openDetails, setOpenDetails] = useState(false);

  const handleDetailsClose = () => setOpenDetails(false)

  useEffect(() => {
    dispatch(staffsData(searchQuery, column))
  }, [column, dispatch, searchQuery])

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allData?.staffs)

    XLSX.utils.book_append_sheet(wb, ws,"ExcelSheet");
    XLSX.writeFile(wb, "staffs.xlsx");
  }

  return (
    <Box sx={{ width: '100%' }}>
    {loading ? 'laoding...' : (
      <Paper sx={{ width: '100%', mb: 2, p: 4 }}>
      <div className='flex justify-end'>
         <div>
           <button
             type="button"
             onClick={handleOpen}
             style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
              Add Staff
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
          {savingsFilter.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}
        </TextField>
        </div>
        </div>
        <EmployeeTable allData={allData} count={count}/>
      </Paper>
      )}
      <BasicModal open={open} onClose={handleClose} title='Staff Form' content={<StaffDetails onClose={handleClose}/>}/>
      <BasicModal open={openDetails} onClose={handleDetailsClose} title='Update Staff Details' content={<UpdateStaffDetails />}/>
    </Box>
  );
}
