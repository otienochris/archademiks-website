import MaterialTable from 'material-table';
import React, { useState } from 'react';

function CustomMaterialTable({
  title,
  columns,
  data,
  handleDelete,
  handleEdit,
  setOpenEdit,
  setOpenPopup,
  allowAdd,
  allowEdit,
  allowDelete,
  allowSelection,
  allowActions,
  ...others
}) {
  const [actionArray, setActionArray] = useState([
    {
      icon: 'add',
      tooltip: 'Add record',
      onClick: (event, newData) => {
        setOpenPopup(true);
      },
      isFreeAction: true,
    },
    {
      icon: 'edit',
      tooltip: 'Edit record',
      onClick: (event, rowData) => {
        if (handleEdit != undefined) {
          handleEdit(rowData);
        }
        if (setOpenEdit != undefined) {
          setOpenEdit(true);
        }
      },
    },
    {
      icon: 'delete',
      tooltip: 'Delete record',
      onClick: (event, rowData) => {
        handleDelete(rowData.id);
      },
    },
  ]);
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      options={{
        filtering: true,
        exportButton: true,
        actionsColumnIndex: -1,
        addRowPosition: 'first',
        grouping: true,
        selection: allowSelection,
        exportFileName: title,
      }}
      actions={allowActions == undefined ? actionArray : []}
    />
  );
}

export default CustomMaterialTable;
