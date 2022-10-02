import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel, { CarouselItem } from '../../components/Carousel';
import CustomButton from '../../components/custom-controls/CustomButton';

const items = [
  {
    image:
      // 'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/03/24185535/Online-Learning.jpg',
      'https://images.saymedia-content.com/.image/t_share/MTc4ODEwMzkyMzgxMTcxMjA3/6-things-to-check-before-you-pay-for-an-online-course.jpg',
    title: 'Learn Online,',
    description: 'Using a simple and effective tool!',
  },
  {
    image:
      'https://media.istockphoto.com/photos/hand-with-marker-writing-skill-concept-picture-id637711198?k=20&m=637711198&s=612x612&w=0&h=bznzNhH923ckyX6LINoDPtH6z3wbB0yO6Gvk5fQR0ms=',
    title: 'Gain Relevant Skills..',
    description: 'Skills that guarantee jobs.',
  },
  {
    image:
      'https://media.istockphoto.com/vectors/gold-shield-with-check-mark-icon-isolated-on-black-background-safety-vector-id1282180999?k=20&m=1282180999&s=170667a&w=0&h=2AGnXsi3T9rmL26RjGYUic_XMOrQGz12-tfF4f0llgc=',
    title: 'And Get Certified.',
    description: 'A required proof of competence.',
  },
];

const useStyles = makeStyles({
  mainGrid: {
    minHeight: '82vh',
    marginTop: '30px',
    backgroundImage: 'url("/Basic-Landing-Page-background.jpg")',
    // backgroundImage: 'url("/main_background.jpg")',
    color: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    // opacity: '0.9',
    backgroundColor: 'black',
    color: 'white',
  },
  gridItem: {
    margin: 'auto 10px',
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  spans: {
    color: '#ff8c00',
  },
  mainTitle: {
    marginBottom: '20px',
  },
  navlink: {
    textDecoration: 'none',
  },
});

export default function Description() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid container justifyContent='center' className={classes.mainGrid}>
      {/* <Grid item xs={11} sm={8} md={5} className={classes.gridItem}>
        <Typography
          variant='h3'
          className={classes.mainTitle}
          style={{ fontFamily: 'monospace' }}
        >
          Become <span className={classes.spans}>Skilled</span> and
          <span className={classes.spans}> Certified </span>
          <span style={{ color: 'greenyellow' }}>Online</span>, Today!
          <hr />
        </Typography>
        <Typography
          variant='subtitle1'
          style={{ fontFamily: 'monospace', margin: '20px auto' }}
        >
          As demand for skilled labor increases, demand for certifications to
          illustrate competency equally increases. Akademi seeks to bridge these
          phenomena by equipping you with relevant certifications and skills to
          increase your employability. Join us today!
        </Typography>
        <CustomButton
          text='Get Started'
          onClick={() => navigate('/login-signup', { replace: true })}
          style={{
            backgroundColor: '#ff8c00',
            color: 'black',
            fontWeight: 'bolder',
          }}
        />
      </Grid> */}
      <Grid item xs={11} sm={8} md={5} className={classes.gridItem}>
        <Carousel>
          {items.map((item) => (
            <CarouselItem>
              <div style={{ width: '100%' }}>
                <img
                  alt={item.title}
                  src={item.image}
                  width='200'
                  height='200'
                  style={{ borderRadius: '50%', margin: '20px auto' }}
                />
                <Typography
                  variant='h4'
                  style={{ color: '#ff8c00' }}
                  align='center'
                >
                  {item.title}
                </Typography>
                <Typography
                  variant='h6'
                  style={{ margin: '20px auto' }}
                  noWrap={false}
                >
                  {item.description}
                </Typography>
              </div>
            </CarouselItem>
          ))}
        </Carousel>
        <CustomButton
          text='Get Started'
          onClick={() => navigate('/login-signup', { replace: true })}
          style={{
            backgroundColor: '#ff8c00',
            color: 'black',
            fontWeight: 'bolder',
          }}
        />
      </Grid>
    </Grid>
  );
}
