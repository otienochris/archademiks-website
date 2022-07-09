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
});

export default function Index() {
  const classes = styles();

  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '94vh',
        backgroundImage: `url(/backgroun2.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Container style={{ minHeight: '94vh' }}>
        <Grid
          container
          style={{
            color: '#F7B32B',
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <div style={{ margin: 'auto' }}>
              <MenuBookIcon style={{ fontSize: '10rem' }} />
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.paperGrid}>
            <Paper
              variant='outlined'
              square
              style={{
                backgroundColor: 'rgba(0, 0, 0, .5)',
                color: '#FFFFFF',
                width: '90%',
              }}
            >
              <Typography variant='h3'>About</Typography>
              <Typography
                variant='body1'
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
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
              variant='outlined'
              square
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                width: '90%',
              }}
            >
              <Typography variant='h3'>History</Typography>
              <Typography
                variant='body1'
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
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
              variant='outlined'
              square
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                width: '90%',
              }}
            >
              <Typography variant='h3'>Mission and Vission</Typography>
              <Typography
                variant='body1'
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
              >
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
              variant='outlined'
              square
              style={{
                backgroundColor: 'rgba(0, 0, 0, .5)',
                color: '#FFFFFF',
                width: '90%',
              }}
            >
              <Typography variant='h3'>Team</Typography>
              <Typography
                variant='body1'
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
              >
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
              variant='outlined'
              square
              style={{
                backgroundColor: 'rgba(0, 0, 0, .5)',
                color: '#FFFFFF',
                width: '90%',
              }}
            >
              <Typography variant='h3'>Videos</Typography>
              <YoutubeEmbed embedId={'kth_8j7iMh0'} />
              <YoutubeEmbed embedId={'kth_8j7iMh0'} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
