import React, { useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
import { users } from '../../data/users';

const cellStyle = {
  borderRight: '1px solid #716969',
  borderLeft: '1px solid #716969',
};

const usersColumns = [
  {
    title: 'National ID',
    field: 'id',
    editable: 'never',
    cellStyle: cellStyle,
  },
  { title: 'First Name', field: 'firstName', cellStyle: cellStyle },
  { title: 'Last Name', field: 'lastName', cellStyle: cellStyle },
  { title: 'Email', field: 'email', editable: 'onAdd', cellStyle: cellStyle },
  {
    title: 'Role',
    field: 'type',
    lookup: { student: 'student', instructor: 'instructor' },
    cellStyle: cellStyle,
  },
  {
    title: 'Date Joined',
    field: 'creationDate',
    editable: 'never',
    cellStyle: cellStyle,
  },
  {
    title: 'Date Modified',
    field: 'modificationDate',
    editable: 'never',
    cellStyle: cellStyle,
  },
];

function UsersTable() {
  const [usersList, setUsersList] = useState(users);

  const handleDelete = (id) => {
    setUsersList((currentList) => currentList.filter((item) => item.id != id));
  };

  const handleAdd = () => {
    console.log('adding user');
  };

  return (
    <CustomMaterialTable
      title={''}
      data={usersList}
      columns={usersColumns}
      allowAdd={true}
      allowDelete={true}
      allowEdit={true}
      handleDelete={handleDelete}
      handleAdd={handleAdd}
      allowActions={true}
    />
  );
}

export default UsersTable;
