import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';
import YoutubeEmbed from '../../components/YoutubeEmbed';

const styles = makeStyles({
  paperGrid: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    margin: '20px auto',
  },
  image: {
    width: '150px',
    height: '150px',
  },
  paper: {
    // backgroundColor: '#F7B32B',
    backgroundColor: 'whitesmoke',
    width: '90%',
    padding: '30px',
    color: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundImage: 'url("/Basic-Landing-Page-background.jpg")',
  },
  wordings: {
    fontFamily: 'monospace',
    color: 'white',
  },
  titles: {
    marginBottom: '20px',
  },
});

export default function Index() {
  const classes = styles();

  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '94vh',
        color: 'black',
      }}
    >
      <Container style={{ minHeight: '94vh' }}>
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <Grid
            item
            xs={12}
            // md={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <div style={{ margin: 'auto' }}>
              <MenuBookIcon
                style={{
                  fontSize: '10rem',
                  color:
                    'linear-gradient(90deg, #F72C25 0%, #F7B32B 35%, #00BD9D 100%)',
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            // md={6}
            className={classes.paperGrid}
            style={{ margin: 'auto 0px', width: '100%' }}
          >
            <Paper
              variant='elevation'
              square
              className={classes.paper}
              elevation={0}
              style={{
                width: '95%',
                borderRadius: '20px 20px 0px 0px',
              }}
            >
              <Typography
                variant='h3'
                align='center'
                className={classes.titles}
              >
                About
              </Typography>
              <Typography
                variant='body1'
                align='center'
                className={classes.wordings}
              >
                The primary purpose of an about us page is to inform the reader
                about the company and its operations. This is a straightforward
                goal that nearly all businesses have to fulfill in some fashion
                or another. However, there are other reasons why about us pages
                are common fixtures on business websites. The text on these
                pages is a marketing tool for a business, enticing potential
                customers with both the history and the aspirations of a
                business, as well as adding a human element. Additionally, about
                us pages are incorporated into search-engine marketing efforts
                as a way to find potential customers through Web searches.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className={classes.paperGrid}>
            <Paper
              variant='elevation'
              square
              className={classes.paper}
              elevation={10}
            >
              <Typography variant='h3' className={classes.titles}>
                History
              </Typography>
              <Typography variant='body1' className={classes.wordings}>
                The primary purpose of an about us page is to inform the reader
                about the company and its operations. This is a straightforward
                goal that nearly all businesses have to fulfill in some fashion
                or another. However, there are other reasons why about us pages
                are common fixtures on business websites. The text on these
                pages is a marketing tool for a business, enticing potential
                customers with both the history and the aspirations of a
                business, as well as adding a human element. Additionally, about
                us pages are incorporated into search-engine marketing efforts
                as a way to find potential customers through Web searches.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className={classes.paperGrid}>
            <Paper
              variant='elevation'
              square
              className={classes.paper}
              elevation={10}
            >
              <Typography variant='h3' className={classes.titles}>
                Mission and Vission
              </Typography>
              <Typography variant='body1' className={classes.wordings}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                ullam, voluptate fugiat dignissimos debitis neque eveniet
                quidem? Quasi non culpa, sequi temporibus iure necessitatibus
                porro ut sit officiis dolore sunt ab ea aspernatur aliquid.
                Beatae alias sunt inventore adipisci qui quod deserunt, odio
                voluptas consequuntur molestias nihil numquam, deleniti
                voluptatibus?
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className={classes.paperGrid}>
            <Paper
              variant='elevation'
              square
              className={classes.paper}
              elevation={10}
            >
              <Typography variant='h3' className={classes.titles}>
                Team
              </Typography>
              <Typography variant='body1' className={classes.wordings}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium aliquid quasi, commodi dolores magni reiciendis.
                Laboriosam rerum officia maxime! Minima quo sapiente ipsa totam
                quis ipsum blanditiis animi cupiditate culpa nam impedit
                consequatur nulla deleniti nobis dolorum, quae odio tempore
                quibusdam quaerat repudiandae laborum. Rem temporibus vel
                reiciendis corporis doloribus delectus sint porro unde quidem
                aliquid distinctio molestiae facilis deleniti eum fuga in, nulla
                sunt voluptatem quam ad dolores necessitatibus provident
                recusandae cupiditate. Provident accusamus fugit maiores
                repellat nostrum vel sint accusantium quibusdam non obcaecati
                hic officiis nihil illo ab, architecto, minus libero a rerum? Et
                eius hic unde praesentium?
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className={classes.paperGrid}>
            <Paper
              variant='elevation'
              square
              className={classes.paper}
              elevation={10}
            >
              <Typography variant='h3'>Videos</Typography>
              <YoutubeEmbed embedId={'kth_8j7iMh0'} />
              <YoutubeEmbed embedId={'kth_8j7iMh0'} />
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.paperGrid}>
            <Paper
              variant='elevation'
              square
              className={classes.paper}
              elevation={0}
              style={{ width: '95%' }}
            >
              <Typography
                variant='h3'
                align='center'
                className={classes.titles}
              >
                Our Partners
              </Typography>
              <img
                src='/eucossalogo.png'
                alt='EUCOSSA'
                className={classes.image}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
