import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GridComponent, Inject, ColumnsDirective, 
  ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { loansGrid } from '../data/dummy';
import { Header } from '../components';

import BasicModal from '../commons/Modals.js'
import PostLoan from '../components/Loans/Loans';
import { loansData } from '../redux/actions/loan';

const Loans = () => {
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  const dispatch = useDispatch()

  const data = useSelector((state) => state.loans)

  const { loading, allData } = data

  useEffect(() => {
    dispatch(loansData())
  }, [dispatch])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <div className='flex justify-between'>
      <Header category="Page" title="Loans" />
        <div>
          <button
            type="button"
            onClick={handleOpen}
            style={{ background: 'black', borderRadius: '10px', fontWeight: 'bold' }}
            className="text-sm text-white p-4 hover:drop-shadow-xl hover:bg-light-gray"
          >
             Loan
          </button>
        </div>
      </div>

      {loading ? "loading..." : (
      <GridComponent
        dataSource={allData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {loansGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
      )}
    </div>
    <BasicModal open={open} onClose={handleClose} title='Loan Form' content={<PostLoan />}/>
  </>
  );
};
export default Loans;
