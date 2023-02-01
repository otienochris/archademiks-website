import MaterialTable from 'material-table';
import React, { useState } from 'react';

function CustomMaterialTable({
  title,
  columns,
  data,
  handleDelete,
  handleEdit,
  handleAdd,
  setOpenEdit,
  setOpenPopup,
  allowAdd,
  allowEdit,
  allowDelete,
  allowSelection,
  allowActions,
  allowSearch,
  allowGrouping,
  detailPanel,
  ...others
}) {
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      detailPanel={detailPanel}
      localization={{
        toolbar: {
          exportCSVName: 'Export as CSV',
          exportPDFName: 'Export as PDF',
        },
      }}
      options={{
        search: allowSearch == undefined ? true : allowSearch,
        filtering: true,
        exportButton: true,
        actionsColumnIndex: -1,
        addRowPosition: 'first',
        grouping: allowGrouping == undefined ? true : allowGrouping,
        selection: allowSelection,
        exportFileName: title,
        headerStyle: {
          backgroundColor: '#000000',
          color: '#F4F4F9',
          border: '2px solid #F4F4F9',
          textAlign: 'center',
        },
        rowStyle: (rowData) => {
          if (rowData.tableData.id % 2) {
            return {
              // backgroundColor: '#FCFFFD',
              backgroundImage:
                'linear-gradient(to right, white, whitesmoke, #FFFFFF, #EEEBD0, #EBB3A9, #E87EA1, #E86252)',
              color: '#0F0F0F',
            };
          } else {
            return {
              // backgroundColor: '#629677',
              backgroundImage:
                'linear-gradient(to left, white, whitesmoke, #FFFFFF, #EEEBD0, #EBB3A9, #E87EA1, #E86252)',
              // color: '#FCFFFD',
            };
          }
        },
      }}
      editable={
        allowActions
          ? {
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  handleAdd(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  handleEdit(newData, oldData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  handleDelete(oldData);
                  resolve();
                }, 1000);
              }),
          }
          : undefined
      }
    />
  );
}

export default CustomMaterialTable;
