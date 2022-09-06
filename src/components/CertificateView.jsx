import { Button, Container, Typography } from '@material-ui/core';
import { FileDownload } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Certificate from './Certificate';

function CertificateView() {
  const { certificateId } = useParams();
  const certificates = useSelector((state) => state.certificates.value);
  const certificate = certificates.filter(
    (item) => item.id === parseInt(certificateId)
  );

  const createPdf = () => {
    const data = document.querySelector('#certificate');

    html2canvas(data, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('img/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('certificate.pdf');
    });
  };

  return (
    <Container
      style={{
        minHeight: '93vh',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Button
        variant='text'
        style={{
          marginTop: '20px',
          height: '60px',
        }}
        onClick={createPdf}
        startIcon={
          <FileDownload
            style={{
              width: '40px',
              height: '40px',
              padding: '3px',
              borderRadius: '50%',
              backgroundColor: 'green',
              color: 'white',
            }}
            fontSize={'small'}
          />
        }
      >
        Download
      </Button>
      <Certificate
        certificate={
          certificate.length > 0
            ? certificate[0]
            : {
                studentFullName: '',
                courseTitle: '',
                type: '',
                dateCreated: '',
                dateModified: '',
              }
        }
      />
    </Container>
  );
}

export default CertificateView;
