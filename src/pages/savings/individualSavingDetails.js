import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { SavingsHeadCells } from '../../data/dummy';
import { singleSavingsChargeData, singleSavingsData } from '../../redux/actions/savings';
import { IoArrowBack } from "react-icons/io5";
import { customerSavings } from '../../redux/actions/customers';
import { formatCurrency } from '../../utils';
import moment from 'moment';
import BalanceCard from '../../components/balanceCard';
import * as XLSX from 'xlsx';
import AdminChargeTable from '../../components/Table/AdminTable';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {SavingsHeadCells.map((headCell) => (
          <TableCell
            key={headCell._id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell._id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell._id}
              direction={orderBy === headCell._d ? order : 'asc'}
              onClick={createSortHandler(headCell._id)}
            >
              {headCell.label}
              {orderBy === headCell._id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const deletearray = selectedId => {
  console.log(selectedId);
  debugger;
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, selectedId } = props;

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
          {''}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={() => deletearray(selectedId)}/>
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

export default function IndividualSavings() {
  const { acc } = useParams();
  const navigate = useNavigate()

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('pageNo');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const dispatch = useDispatch()

  const data = useSelector((state) => state.singleSaving)
  const userSavings = useSelector((state) => state.customerSavings)
  const charges = useSelector((state) => state.savingCharge)

  const { loading, allData } = data;
  const { savingsData } = userSavings;
  const { chargesData } = charges;

  useEffect(() => {
    dispatch(singleSavingsData(acc))
    dispatch(customerSavings(acc))
    dispatch(singleSavingsChargeData(acc))

  }, [acc, dispatch])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allData?.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allData?.length) : 0;

    const handleExport = () => {
      const data = allData.map((index) => {
        return {
          PageNo: index.pageNo,
          Name: index.name,
          AccountNumber: index.accountNumber,
          Amount: index.amount,
          PostedBy: index.postedBy,
          AccountOfficer: index.accountOfficer,
          Date: moment(index.date).format('DD/MM/YY'),
        }
      })
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data)
  
      XLSX.utils.book_append_sheet(wb, ws,"ExcelSheet");
      XLSX.writeFile(wb, "savings.xlsx");
    }

  return (
    <Box sx={{ width: '100%' }}>
    {loading ? 'laoding...' : (
      <Paper sx={{ width: '100%', mb: 2, p: 4, }}>
        <div className='cursor-pointer'>
          <IoArrowBack
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-between">
          <div>
            <BalanceCard 
              title="Total Savings" 
              data={formatCurrency(savingsData?.totalSavings)} 
              count={savingsData?.totalNoOfSavings}
            />
            <BalanceCard 
              title="Current Month Savings" 
              data={formatCurrency(savingsData?.currentMonthSavings)}
              count={savingsData?.totalNoOfmonthSavings}
            />

            <BalanceCard 
              title="Total Loans" 
              data={formatCurrency(savingsData?.totalLoans)}
            />

            <BalanceCard 
              title="Total Excess Savings" 
              data={formatCurrency(savingsData?.totalExcessSavings)}
            />

            <BalanceCard 
              title="Available Balance" 
              data={formatCurrency(savingsData?.withdrawableBalance)}
            />
          </div>

          <div>
            <BalanceCard 
              title="Total Withdrawals" 
              data={formatCurrency(savingsData?.totalWithdrawals)}               
              count={savingsData?.totalWithdrawalCount}
            />
            <BalanceCard 
              title="Current Month Withdrawals"   
              data={formatCurrency(savingsData?.currentMonthWithdrawals)}
              count={savingsData?.totalCurrentWithdrawalsCount}
            />

            <BalanceCard 
              title="Current Month Loans" 
              data={formatCurrency(savingsData?.monthlyLoans)}
            />

            <BalanceCard 
              title="Current Month Excess" 
              data={formatCurrency(savingsData?.currentMothExcess)}
            />

            <BalanceCard 
              title="Admin Charges" 
              data={formatCurrency(savingsData?.adminCharges)}
            />
          </div>

          <div className="w-1/3">
          <AdminChargeTable allData={chargesData} count={chargesData?.length}/>
          </div>
        </div>

        


        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedId={selected}
        />

        <div>
          <button
            type="button"
            onClick={handleExport}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
            Excel
          </button>
        </div>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              selectedId={selected._id}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allData?.length}
            />
            
              <TableBody>
            {allData?.slice().sort(getComparator(order, orderBy))               
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {index+1}
                      </TableCell>
                      <TableCell align="left">{row.pageNo}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="right">{row.accountNumber}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.postedBy}</TableCell>
                      <TableCell align="right">{row.accountOfficer}</TableCell>
                      <TableCell align="right">{moment(row.date).format('DD/MM/YY')}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100, 200, 300]}
          component="div"
          count={allData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      )}
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
