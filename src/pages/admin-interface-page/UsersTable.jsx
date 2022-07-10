import React, { useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
import { Container, Grid } from '@material-ui/core';
import CourseCard from '../../components/CourseCard';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../state/reducers/allUsersReducer';

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

function UsersTable({ users, courses, courseEnrollmentDetails }) {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState(users);
  const [allCourses, setAllCourses] = useState(courses);
  const [enrollementDetails, setEnrollementDetails] = useState(
    courseEnrollmentDetails
  );

  const handleDelete = (id) => {
    setAllUsers((currentList) => currentList.filter((item) => item.id != id));
    dispatch(deleteUser(id));
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
              course={allCourses.filter((item) => item.id === rowData.id)[0]}
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
        const coursesEnrolledList = enrollementDetails.filter(
          (item) => item.studentId === rowData.id
        );
        return (
          <Container style={{ width: '80%', margin: '20px auto' }}>
            <Grid container alignContent='center'>
              <CustomMaterialTable
                title={'Enrolled Courses'}
                data={coursesEnrolledList}
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
      data={allUsers}
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
