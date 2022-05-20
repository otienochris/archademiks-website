import React, { useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
import { users } from '../../data/users';

const usersColumns = [
  { title: 'National ID', field: 'id', editable: 'never' },
  { title: 'First Name', field: 'firstName' },
  { title: 'Last Name', field: 'lastName' },
  { title: 'Email', field: 'email', editable: 'onAdd' },
  {
    title: 'Role',
    field: 'type',
    lookup: { student: 'student', instructor: 'instructor' },
  },
  { title: 'Date Joined', field: 'creationDate', editable: 'never' },
  { title: 'Date Modified', field: 'modificationDate', editable: 'never' },
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
    />
  );
}

export default UsersTable;
