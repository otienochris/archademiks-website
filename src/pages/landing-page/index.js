import { Container } from '@material-ui/core';
import React from 'react';
import Footer from '../../components/Footer';
import YoutubeEmbed from '../../components/YoutubeEmbed';
import YoutubeReact from '../../components/YoutubeReact';
import Description from './Description';
import LandingPageStats from './LandingPageStats';
import MostPopularCourses from './MostPopularCourses';
import SecondDescription from './SecondDescription';
import StudentsRatings from './StudentsRatings';
import WhatWeOffer from './WhatWeOffer';

export default function Index() {
  return (
    <Container>
      <Description />
      <WhatWeOffer />
      <YoutubeEmbed embedId={'42W4k7C5vmI'} />
      <YoutubeReact embedId={'42W4k7C5vmI'} />
      <SecondDescription />
      <MostPopularCourses />
      <LandingPageStats />
      <StudentsRatings />
      <Footer />
    </Container>
  );
}
