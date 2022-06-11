import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

import { GridComponent, ColumnsDirective, 
  ColumnDirective, Page, Selection, Inject, 
  Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersGrid } from '../data/dummy';
import { Header } from '../components';

import BasicModal from '../commons/Modals.js'
import CustomerDetails from '../components/Customer/CustomerDetails';
import { customerData } from '../redux/actions/customers';


const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const dispatch = useDispatch()

  const data = useSelector((state) => state.customers)

  const { loading, allData } = data

  useEffect(() => {
    dispatch(customerData())
  }, [dispatch])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className='flex justify-between'>
        <Header category="Page" title="Customers" />
        <div>
          <button
            type="button"
            onClick={handleOpen}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
             Add Customer
          </button>
        </div>
      </div>

      {loading ? "loading" : (
      <GridComponent
        dataSource={allData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
      )}
    </div>
    <BasicModal open={open} onClose={handleClose} title='Customer Details' content={<CustomerDetails />}/>
    </>
  );
};

export default Customers;
