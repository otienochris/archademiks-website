import { Accordion, AccordionSummary, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CourseSummary(props) {
  const { topics } = props;

  useEffect(() => {
    console.log(topics);
  }, []);

  return (
    <>
      {topics.map((topic, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{topic.title}</Typography>
          </AccordionSummary>
        </Accordion>
      ))}
    </>
  );
}
