import React, { useEffect, useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
import { Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Typography } from '@material-ui/core';
import CourseCard from '../../components/CourseCard';
import { useDispatch } from 'react-redux';
import { ROLES } from '../../commons/roles';
import { LMS_COURSE_ENROLLMENTS, LMS_INSTRUCTORS, LMS_STUDENTS } from '../../commons/urls';
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
const courseEnrollmentsColumns = [
  { title: 'Serial No', field: 'id' },
  { title: 'Course Id', field: 'courseId' },
  { title: 'Status', field: 'status' },
  { title: 'Selling Price', field: 'amount' },
  { title: 'Enrolled on', field: 'creationDate' },
  { title: 'Completed on', field: 'completionDate' },
  { title: 'Modified on', field: 'modificationDate' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function UsersTable({ users, courses, courseEnrollmentDetails }) {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState(users);
  const token = useSelector(state => state.login.value.token);
  const [allCourses, setAllCourses] = useState(courses);
  const [userDeleted, setUserDeleted] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [dataFetched, setDataFetched] = useState(false);
  const [viewCourseEnrollment, setViewCourseEnrollment] = useState(false);

  const options = {
    method: "",
    mode: 'cors',
    body: "",
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }


  const fetchEnrollments = async (userId) => {

    options.method = "GET";
    delete options.body;
    await fetch(LMS_COURSE_ENROLLMENTS + "/student/" + userId, options)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          setDataFetched(true);
        }
        return response.json();
      }).then(data => {
        console.log(data);
        const currentEnrollmentLists = [];
        data.map(enrollment => currentEnrollmentLists.push({
          id: enrollment.courseEnrollmentId,
          courseId: enrollment.course.courseId,
          status: enrollment.status,
          amount: enrollment.amount,
          creationDate: enrollment.creationDate,
          completionDate: enrollment.completionDate,
          modificationDate: enrollment.modificationDate
        }))

        setEnrollments(currentEnrollmentLists);
      }).catch(error => console.log(error))
      .finally(() => {
        options.method = "";
        options.body = "";
      })
  }

  useEffect(() => {
    if (selectedRowId) {
      fetchEnrollments(selectedRowId);
    }
  }, [selectedRowId])


  useEffect(() => {

  }, [userDeleted, userUpdated, selectedRowId])


  const deleteUserFromBackend = async (url, userId) => {

    options.method = "DELETE";
    options.body = "";

    await fetch(url + "/" + userId, options)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          setAllUsers(currentUsers => currentUsers.filter(item => item.id != userId));
          setUserDeleted(true);
        }
        return response.json()
      })
      .then(data => {
        if (data == true) {
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

  const editUser = async (url, userId, body, updatedUser) => {
    options.method = "PUT";
    options.body = JSON.stringify(body);

    await fetch(url + "/" + userId, options)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {

          const newList = allUsers.filter(item => item.id != userId);
          newList.push(updatedUser);

          setAllUsers(newList);
          setUserUpdated(true);
          alert("User updated successfully");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .finally(() => {
        options.method = "";
        options.body = "";
        setUserUpdated(false)
      });
  }

  const handleDeleteUser = (oldData) => {
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

  const handleEdit = (newData, oldData) => {

    const body = {
      firstName: newData.firstName,
      lastName: newData.lastName,
      email: newData.email,
      countryCode: newData.country,
      version: newData.version,
      addresses: null,
      certificates: null,
      organizations: null,
      relatives: null,
      reviews: null
    }

    switch (oldData.role) {
      case ROLES.INSTRUCTOR:
        editUser(LMS_INSTRUCTORS, newData.id, body, newData);
        break;
      case ROLES.STUDENT:
        editUser(LMS_STUDENTS, newData.id, body, newData);
        break;
      default:
        break;
    }

  }

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
        setSelectedRowId(rowData.id);
        return (
          <Container style={{ width: '80%', margin: '20px auto' }}>
            <Grid container alignContent='center'>
              <Button onClick={() => setViewCourseEnrollment(state => !state)} variant='contained' color='secondary'>View Course Enrollments</Button>
            </Grid>
          </Container>
        );
      },
    },
  ];

  return (
    <>
      <CustomMaterialTable
        title={''}
        data={allUsers}
        columns={usersColumns}
        allowAdd={true}
        allowDelete={true}
        allowEdit={true}
        handleEdit={handleEdit}
        handleDelete={handleDeleteUser}
        handleAdd={handleAdd}
        allowActions={true}
        detailPanel={enrolledCoursesdetailPanel}
      />
      <Dialog
        fullScreen
        open={viewCourseEnrollment}
        // onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Container style={{ minHeight: '100vh' }}>
          <DialogTitle
            style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '20px',
            }}
          >
            <Typography variant='h4' align='center'>
              Course Enrollments
            </Typography>
          </DialogTitle>

          <DialogContent>
            <CustomMaterialTable
              title={'Enrolled Courses'}
              data={enrollments}
              columns={courseEnrollmentsColumns}
              allowActions={false}
              detailPanel={courseDetailPanel}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => setViewCourseEnrollment(false)}
              style={{
                backgroundColor: '#ff8c00',
                margin: 'auto',
                fontWeight: 'bolder',
              }}
            >
              Exit
            </Button>
          </DialogActions>
        </Container>
      </Dialog>

    </>
  );
}

export default UsersTable;
