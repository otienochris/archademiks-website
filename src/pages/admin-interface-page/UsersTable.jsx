import React, { useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
import { users } from '../../data/users';
import { list as courses } from '../../data/courses';
import { courseEnrollmentDetails } from '../../data/courseEnrollmentDetails';
import { Container, Grid } from '@material-ui/core';
import CourseCard from '../../components/CourseCard';

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

  const courseDetailPanel = [
    {
      tooltip: 'Course Details',
      render: (rowData) => {
        return (
          <Container
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <CourseCard
              course={courses.filter((item) => item.id === rowData.id)[0]}
            />
          </Container>
        );
      },
    },
  ];

  const enrolledCoursesdetailPanel = [
    {
      tooltip: 'More Details',
      render: (rowData) => {
        const columns = [
          { title: 'Serial No', field: 'id' },
          { title: 'Course Id', field: 'courseId' },
          { title: 'Status', field: 'status' },
          { title: 'Selling Price', field: 'amount' },
          { title: 'Enrolled on', field: 'creationDate' },
          { title: 'Completed on', field: 'completionDate' },
          { title: 'Modified on', field: 'modificationDate' },
        ];
        const enrolledList = courseEnrollmentDetails.filter(
          (item) => item.studentId === rowData.id
        );
        return (
          <Container style={{ width: '80%', margin: '20px auto' }}>
            <Grid container alignContent='center'>
              <CustomMaterialTable
                title={'Enrolled Courses'}
                data={enrolledList}
                columns={columns}
                allowActions={false}
                detailPanel={courseDetailPanel}
              />
            </Grid>
          </Container>
        );
      },
    },
  ];

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
      detailPanel={enrolledCoursesdetailPanel}
    />
  );
}

export default UsersTable;
