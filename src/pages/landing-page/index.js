import React, { useState } from 'react';
import Description from './Description';
import MostPopularCourses from './MostPopularCourses';
import SecondDescription from './SecondDescription';
import WhatWeOffer from './WhatWeOffer';

export default function Index() {
  const [courses, setCourses] = useState(courses);
  return (
    <>
      <Description />
      <WhatWeOffer />
      <SecondDescription />
      <MostPopularCourses/>
    </>
  );
}
