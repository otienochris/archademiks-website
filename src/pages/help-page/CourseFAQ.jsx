import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';

function CourseFAQ({ frequentlyAskedQuestions }) {
  return (
    <>
      {frequentlyAskedQuestions.map((faq, idx) => (
        <Accordion>
          <AccordionSummary key={idx} expandIcon={<ExpandMore />}>
            {faq.question}
          </AccordionSummary>
          <AccordionDetails>{faq.answer}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default CourseFAQ;
