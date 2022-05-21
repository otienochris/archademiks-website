import { Rating } from '@mui/material';
import React, { useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
import { list } from '../../data/courses';
import { courseEnrollmentDetails } from '../../data/courseEnrollmentDetails';
import { reviews } from '../../data/reviews';
import { getColorForCategoryBanner } from '../../utils/colorCategoryBanner';
import { Typography } from '@material-ui/core';
import CourseCard from '../../components/CourseCard';
import QuickStart from './QuickStart';
import FinancialQuickStat from './FinancialQuickStat';
import { makeStyles } from '@material-ui/styles';

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
    field: 'id',
    editable: 'never',
    cellStyle: { borderRight: '1px solid #716969' },
  },
  { title: 'Title', field: 'title', cellStyle: cellStyle },
  {
    title: 'Category',
    field: 'category',
    // lookup: categoriesList,
    cellStyle: cellStyle,
  },
  { title: 'Price', field: 'price', type: 'numeric', cellStyle: cellStyle },
  {
    title: 'Rating',
    field: 'rating',
    editable: 'never',
    cellStyle: cellStyle,
  },
  //   {
  //     title: 'Students',
  //     field: 'numberOfEnrolledStudents',
  //     editable: 'never',
  //     cellStyle: cellStyle,
  //   },
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

function CoursesTable() {
  const classes = useStyles();
  const [courses, setCourses] = useState(list);

  const handleDelete = (id) => {
    setCourses((currentList) => currentList.filter((item) => item.id != id));
  };

  const handleAdd = () => {
    console.log('adding course');
  };

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
                course={courses.filter((item) => item.id === rowData.id)[0]}
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
                data={courseEnrollmentDetails.filter(
                  (item) =>
                    item.courseId === rowData.id && item.status === 'pending'
                )}
              />
              <QuickStart
                borderColor={'2px solid yellowgreen'}
                title={'Completions'}
                data={courseEnrollmentDetails.filter(
                  (item) =>
                    item.courseId === rowData.id && item.status === 'completed'
                )}
              />
              <QuickStart
                borderColor={'2px solid red'}
                title={'Drop-Outs'}
                data={courseEnrollmentDetails.filter(
                  (item) =>
                    item.courseId === rowData.id && item.status === 'cancelled'
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
                  (item) => item.courseId === rowData.id
                )}
              />
              <QuickStart
                title={'Reviews'}
                data={reviews.filter(
                  (item) => item.type === 'Course' && item.typeId === rowData.id
                )}
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
      data={courses}
      columns={coursesColumns}
      allowAdd={true}
      allowDelete={true}
      allowEdit={true}
      handleDelete={handleDelete}
      handleAdd={handleAdd}
      allowActions={true}
      detailPanel={detailPanel}
    />
  );
}

export default CoursesTable;
