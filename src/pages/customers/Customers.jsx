import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import BasicModal from '../../commons/Modals';
import { customerData } from '../../redux/actions/customers';
import CustomerDetails from '../../components/Customer/CustomerDetails';
import { savingsFilter } from '../../utils';
import { MenuItem, TextField } from '@mui/material';
import CustomerTable from '../../components/Table/CustomerTable';
import * as XLSX from 'xlsx';


const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          component="div"
          style={{ fontSize: '2rem', fontWeight: 'bold' }}
        >
         Customer
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Customers() {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const data = useSelector((state) => state.customers)

  const { loading, allData } = data

  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [column, setColumToQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const handleChange = (e) => {
    setColumToQuery(e.target.value)
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  
  useEffect(() => {
    dispatch(customerData(searchQuery, column))
  }, [dispatch, searchQuery, column])

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allData?.allCustomers)

    XLSX.utils.book_append_sheet(wb, ws,"ExcelSheet");
    XLSX.writeFile(wb, "customers.xlsx");
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allData?.allCustomers?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

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
        <EnhancedTableToolbar numSelected={selected.length} />
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
        <CustomerTable allData={allData}/>
      </Paper>
      )}
      {/* <BasicModal open={open} onClose={handleClose} title='Customer Form' content={<CustomerDetails />}/> */}
    </Box>
  );
}
