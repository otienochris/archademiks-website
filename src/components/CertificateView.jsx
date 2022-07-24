import { Button, Container, Typography } from '@material-ui/core';
import jsPDF from 'jspdf';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Certificate from './Certificate';

function CertificateView() {
  const { certificateId } = useParams();
  const certificate = useSelector((state) =>
    state.certificates.value.filter(
      (item) => item.certicateId === parseInt(certificateId)
    )
  );

  // TODO:
  const createPdf = () => {
    const pdf = new jsPDF('portrait', 'pt', 'a4');
    const data = document.querySelector('#certificate');
    pdf.html(data).then(() => {
      pdf.save('certificate.pdf');
    });
  };

  console.log(certificate);

  return (
    <Container
      style={{
        minHeight: '93vh',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button onClick={createPdf}>Download</Button>
      <Certificate />
    </Container>
  );
}

export default CertificateView;
