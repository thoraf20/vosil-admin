import React, { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GridComponent, ColumnsDirective, 
  ColumnDirective, Resize, Sort, ContextMenu, 
  Filter, Page, ExcelExport, PdfExport, Edit, 
  Inject } from '@syncfusion/ej2-react-grids';

import { contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { savingsData } from '../redux/actions/savings';

const Savings = () => {
  const editing = { allowDeleting: true, allowEditing: true };

  const dispatch = useDispatch()

  const data = useSelector((state) => state.savings)

  const { loading, allData } = data

  useEffect(() => {
    dispatch(savingsData())
  }, [dispatch])

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Savings" />
      {loading ? "loading..." : (
      <GridComponent
        id="gridcomp"
        dataSource={allData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
      )}
    </div>
  );
};
export default Savings;
