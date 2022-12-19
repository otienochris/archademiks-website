import React, { useEffect, useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
import { Container, Grid } from '@material-ui/core';
import CourseCard from '../../components/CourseCard';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../state/reducers/allUsersReducer';
import { ROLES } from '../../commons/roles';
import { LMS_INSTRUCTORS, LMS_STUDENTS } from '../../commons/urls';
import { useSelect } from '@mui/base';
import { useSelector } from 'react-redux';

const cellStyle = {
  borderRight: '1px solid #716969',
  borderLeft: '1px solid #716969',
};

const usersColumns = [
  {
    title: 'Serial NO.',
    field: 'id',
    editable: 'never',
    cellStyle: cellStyle,
  },
  { title: 'First Name', field: 'firstName', cellStyle: cellStyle },
  { title: 'Last Name', field: 'lastName', cellStyle: cellStyle },
  { title: 'Email', field: 'email', editable: 'onAdd', cellStyle: cellStyle },
  {
    title: 'Role',
    field: 'role',
    lookup: { 'ROLE_STUDENT': ROLES.STUDENT.substring(5), 'ROLE_INSTRUCTOR': ROLES.INSTRUCTOR.substring(5) },
    cellStyle: cellStyle,
  },
  {
    title: 'Date Joined',
    field: 'dateJoined',
    editable: 'never',
    cellStyle: cellStyle,
  },
  {
    title: 'Date Modified',
    field: 'dataModified',
    editable: 'never',
    cellStyle: cellStyle,
  },
];

function UsersTable({ users, courses, courseEnrollmentDetails }) {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState(users);
  const token = useSelector(state => state.login.value.token);
  const [allCourses, setAllCourses] = useState(courses);
  const [userDeleted, setUserDeleted] = useState(false);
  const [enrollementDetails, setEnrollementDetails] = useState(
    courseEnrollmentDetails
  );

  const options = {
    method: "DELETE",
    mode: 'cors',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }

  useEffect(() => {

  }, [userDeleted])


  const deleteUserFromBackend = async (url, userId) => {
    await fetch(url + "/" + userId, options)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          setAllUsers(currentUsers => currentUsers.filter(item => item.id != userId));
          setUserDeleted(true);
        }
        return response.json()
      })
      .then(data => {
        if (data.message == undefined || data) {
          console.log(data);
          alert("User deleted successfully");
        } else {
          alert("User cannot be deleted. It might be that other records like course enrollment details depend on it.")
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setUserDeleted(false);
      })
  }

  const handleDeleteUser = (oldData) => {
    console.log(oldData);
    switch (oldData.role) {
      case ROLES.STUDENT:
        deleteUserFromBackend(LMS_STUDENTS, oldData.id);
        break;
      case ROLES.INSTRUCTOR:
        deleteUserFromBackend(LMS_INSTRUCTORS, oldData.id);
        break;
      default:
        break;
    }
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
      handleDelete={handleDeleteUser}
      handleAdd={handleAdd}
      allowActions={true}
      detailPanel={enrolledCoursesdetailPanel}
    />
  );
}

export default UsersTable;
