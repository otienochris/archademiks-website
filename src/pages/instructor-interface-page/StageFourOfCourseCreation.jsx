import React, { useEffect } from 'react';
import CourseCard from '../../components/CourseCard';
import CourseLearningView from '../student-interface-page/CourseLearningView';

export default function StageFourOfCourseCreation({ course }) {
  useEffect(() => {
    console.log(course);
  }, []);

  return (
    <>
      <CourseCard course={course} />
      <CourseLearningView course={course} />;
    </>
  );
}
