import { Container } from '@material-ui/core';
import React from 'react';
import Description from './Description';
import LandingPageStats from './LandingPageStats';
import MostPopularCourses from './MostPopularCourses';
import SecondDescription from './SecondDescription';
import WhatWeOffer from './WhatWeOffer';

export default function Index() {
  return (
    <Container>
      <Description />
      <WhatWeOffer />
      <SecondDescription />
      <MostPopularCourses />
      <LandingPageStats />
    </Container>
  );
}
