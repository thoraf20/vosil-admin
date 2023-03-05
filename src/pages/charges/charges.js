import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { chargesFilter } from '../../utils';
import { MenuItem, TextField } from '@mui/material';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { chargesData } from '../../redux/actions/charges';
import ChargesTable from '../../components/Table/chargesTable';


export default function Savingscharges() {
  const dispatch = useDispatch()

  const data = useSelector((state) => state.charges)

  const { allData, count } = data

  const [searchQuery, setSearchQuery] = useState("");
  const [column, setColumToQuery] = useState("");
  
  const handleChange = (e) => {
    setColumToQuery(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(chargesData(searchQuery, column));
    }, 1000);

    return () => clearTimeout(getData);
  }, [searchQuery, column, dispatch])

  const handleExport = () => {
    const data = allData.map((index) => {
      return {
        PageNo: index.pageNo,
        AccountNumber: index.accountNumber,
        Amount: index.amount,
        Date: moment(index.date).format('DD/MM/YY'),
      }
    })
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(wb, ws,"ExcelSheet");
    XLSX.writeFile(wb, "excess.xlsx");
  }

  return (
    <Box sx={{ width: '100%' }}>
    {false ? 'loading...' : (
      <Paper sx={{ width: '100%', mb: 2, p: 4 }}>  
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
          {chargesFilter.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}
        </TextField>
        </div>
        </div>
        <ChargesTable allData={allData} count={count}/>
      </Paper>
      )}
    </Box>
  );
}
