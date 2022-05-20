import { Rating } from '@mui/material';
import React, { useState } from 'react';
import CustomMaterialTable from '../../components/CustomMaterialTable';
import { list } from '../../data/courses';
import { courseEnrollmentDetails } from '../../data/courseEnrollmentDetails';
import FiveStarRating from '../../components/FiveStarRating';
import { getColorForCategoryBanner } from '../../utils/colorCategoryBanner';
import { Grid, Typography } from '@material-ui/core';
import CourseCard from '../../components/CourseCard';
import QuickStart from './QuickStart';

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
    lookup: categoriesList,
    cellStyle: cellStyle,
  },
  { title: 'Price', field: 'price', type: 'numeric', cellStyle: cellStyle },
  {
    title: 'Rating',
    field: 'rating',
    editable: 'never',
    cellStyle: cellStyle,
    lookup: {
      1: <FiveStarRating rating={1} />,
      2: <FiveStarRating rating={2} />,
      3: <FiveStarRating rating={3} />,
      4: <FiveStarRating rating={4} />,
      5: <FiveStarRating rating={5} />,
    },
  },
  {
    title: 'Students',
    field: 'numberOfEnrolledStudents',
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

function CoursesTable() {
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
          <Grid container>
            <Grid item xs={12} md={6} lg={4}>
              <CourseCard
                course={courses.filter((item) => item.id === rowData.id)[0]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <QuickStart
                title={'Enrollments'}
                data={courseEnrollmentDetails.filter(
                  (item) => item.courseId === rowData.id
                )}
              />
              <QuickStart
                title={'Completions'}
                data={courseEnrollmentDetails.filter(
                  (item) =>
                    item.courseId === rowData.id && item.status === 'completed'
                )}
              />
              <QuickStart
                title={'Drop-Outs'}
                data={courseEnrollmentDetails.filter(
                  (item) =>
                    item.courseId === rowData.id && item.status === 'cancelled'
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
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
