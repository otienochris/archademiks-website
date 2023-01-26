import React, { useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
// import { list } from '../../data/courses';
import { courseEnrollmentDetails } from '../../data/courseEnrollmentDetails';
import { reviews } from '../../data/reviews';
import { getColorForCategoryBanner } from '../../utils/colorCategoryBanner';
import { Typography } from '@material-ui/core';
import CourseCard from '../../components/CourseCard';
import QuickStart from './QuickStart';
import FinancialQuickStat from './FinancialQuickStat';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../state/reducers/coursesReducers';
import { LMS_COURSES } from '../../commons/urls';
import { useSelector } from 'react-redux';

const getCategoryBanner = (category) => (
  <Typography
    align='center'
    style={{
      backgroundColor: `${getColorForCategoryBanner(category)}`,
    }}
  >
    {category}
  </Typography>
);

const categoriesList = {
  'Tech Tools': 'Tech Tools',
  Assignment: getCategoryBanner('Assignment'),
  Agriculture: getCategoryBanner('Agriculture'),
  Programming: getCategoryBanner('Programming'),
  IT: getCategoryBanner('IT'),
  Mathematics: getCategoryBanner('Mathematics'),
  Chemistry: getCategoryBanner('Chemistry'),
  Biology: getCategoryBanner('Biology'),
  'Computer Hardware': getCategoryBanner('Computer Hardware'),
  AI: getCategoryBanner('AI'),
  Music: getCategoryBanner('Music'),
  'UI/UX': getCategoryBanner('UI/UX'),
  Business: getCategoryBanner('Business'),
  'Content Creation': getCategoryBanner('Content Creation'),
  DevOps: getCategoryBanner('DevOps'),
};

const cellStyle = {
  borderRight: '1px solid #716969',
  borderLeft: '1px solid #716969',
};

const coursesColumns = [
  {
    title: 'Id',
    field: 'courseId',
    editable: 'never',
    cellStyle: { borderRight: '1px solid #716969' },
  },
  { title: 'Title', field: 'title', cellStyle: cellStyle },
  {
    title: 'Category',
    field: 'category',
    cellStyle: cellStyle,
  },
  { title: 'Price', field: 'price', type: 'numeric', cellStyle: cellStyle },
  {
    title: 'Rating',
    field: 'rating',
    editable: 'never',
    cellStyle: cellStyle,
  },
  {
    title: 'Creation Date',
    field: 'creationDate',
    editable: 'never',
    cellStyle: cellStyle,
  },
  {
    title: 'Modification Date',
    field: 'modificationDate',
    editable: 'never',
    cellStyle: cellStyle,
  },
];

const useStyles = makeStyles({
  detailPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyItems: 'center',
    width: '100%',
  },
  centerAlign: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    flexDirection: 'column',
  },
});

function CoursesTable({ courses }) {
  const classes = useStyles();
  // const coursesList = useSelector((state) => state.courses.value);
  // const [reload, setReload] = useState(false);
  const [data, setData] = useState(courses);
  const token = useSelector((state) => state.login.value.token);
  const dispatch = useDispatch();

  const saveChanges = async (id, body) => {

    // const body = {
    //   description,
    //   title,
    //   thumbnailLink,
    //   price: 0,
    //   category,
    //   introductionVideoLink,
    //   version
    // }
    await fetch(LMS_COURSES + "/" + id, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(body),
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {

        if (response.status >= 200 && response.status < 300) {

          alert("changes saved successfully");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        alert("Error saving changes");
        console.log(error)
      });
  }

  // console.log(courses)
  const handleDelete = (id) => {
    setData((current) => current.filter((item) => item.courseId != id));
    dispatch(deleteCourse(id));
  };

  const handleAdd = () => {
    console.log('adding course');
  };

  const handleEdit = (newData, oldData) => {
    console.log(newData);
    console.log(oldData);
    newData.courseEnrollments = null;
    newData.courseId = null;
    newData.instructors = null;
    newData.reviews = null;
    newData.topics = null;
    saveChanges(oldData.courseId, newData);
  }

  const detailPanel = [
    {
      tooltip: 'More Details',
      render: (rowData) => {
        return (
          <section className={classes.detailPanel}>
            <div
              className={classes.centerAlign}
              style={{
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <CourseCard
                course={courses.filter((item) => parseInt(item.courseId) === parseInt(rowData.courseId))[0]}
              />
            </div>
            <div
              className={classes.centerAlign}
              style={{
                flexDirection: 'column',
                width: '100%',
              }}
            // style={{ backgroundColor: 'red', width: '100%' }}
            >
              <QuickStart
                title={'In-progress'}
                borderColor={'2px solid lightgrey'}
                data={courses.filter((item) => parseInt(item.courseId) === parseInt(rowData.courseId))[0].courseEnrollments}
              />
              <QuickStart
                borderColor={'2px solid yellowgreen'}
                title={'Completions'}
                data={courses.filter((item) => parseInt(item.courseId) === parseInt(rowData.courseId))[0].courseEnrollments.filter(
                  (item) => item.status === 'COMPLETED'
                )}
              />
              <QuickStart
                borderColor={'2px solid red'}
                title={'Drop-Outs'}
                data={courses.filter((item) => parseInt(item.courseId) === parseInt(rowData.courseId))[0].courseEnrollments.filter(
                  (item) =>
                    item.courseId === rowData.id && item.status === 'CANCELLED'
                )}
              />
            </div>
            <div className={classes.centerAlign} style={{ width: '100%' }}>
              <FinancialQuickStat
                title={'Sales'}
                data={courseEnrollmentDetails.filter(
                  (item) =>
                    item.courseId === rowData.id &&
                    (item.status === 'completed' || item.status === 'pending')
                )}
              />
              <QuickStart
                title={'Enrollments'}
                data={courseEnrollmentDetails.filter(
                  (item) => item.id === rowData.id
                )}
              />
              <QuickStart
                title={'Reviews'}
                data={courses.filter((item) => parseInt(item.courseId) === parseInt(rowData.courseId))[0].reviews}
              />
            </div>
          </section>
        );
      },
    },
  ];

  return (
    <CustomMaterialTable
      title={''}
      data={data}
      columns={coursesColumns}
      allowAdd={true}
      allowDelete={true}
      allowEdit={true}
      handleDelete={handleDelete}
      handleAdd={handleAdd}
      handleEdit={handleEdit}
      allowActions={true}
      detailPanel={detailPanel}
    />
  );
}

export default CoursesTable;
