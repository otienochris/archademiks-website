import {
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Start } from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  enrollUserToCourse,
  setCourseEnrollments,
} from '../../state/reducers/courseEnrollementReducer';
import { loginAction } from '../../state/reducers/loginReducer';
import { setLoggedInUser } from '../../state/reducers/userReducer';

const styles = makeStyles({
  header: {
    backgroundColor: 'orange',
    color: 'black',
    padding: '20px',
  },
  table: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  tableData: {
    textAlign: 'center',
    fontWeight: 'bolder',
  },
  title: {
    marginTop: '20px ',
  },
});

const itemObject = {
  currency: '',
  name: '',
  price: '',
  quantity: '',
};

function ConfirmOrder() {
  const classes = styles();
  const search = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payerId = new URLSearchParams(search).get('PayerID');
  const paymentId = new URLSearchParams(search).get('paymentId');
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [itemList, setItemList] = useState([itemObject]);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const courseId = localStorage.getItem('courseId');
  const user = localStorage.getItem('user');

  const baseUrlForPayment = 'https://demo-paypal-payment-service.herokuapp.com';
  // const baseUrlForPayment = 'http://localhost:8080';

  const reviewPaymentUrl =
    baseUrlForPayment + '/paypal/payment/review/' + paymentId;
  const executePaymenturl =
    baseUrlForPayment +
    '/paypal/payment/execute-payment/' +
    paymentId +
    '/' +
    payerId;

  const handlePayment = async () => {
    setIsLoading(true);
    setIsPaying(true);
    await fetch(executePaymenturl, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setIsPaying(false);
        if (data.status === 'APPROVED') {
          setIsPaymentCompleted(true);
          dispatch(
            enrollUserToCourse({
              id: Math.floor(Math.random() * 100 + 1),
              studentId: JSON.parse(user).id,
              courseId: parseInt(courseId),
              status: 'Pending',
              amount: parseFloat(totalAmount[0]),
              completionDate: null,
              creationDate: '2022-02-02',
              modificationDate: null,
              completedTopics: [],
            })
          );
        }
        return data;
      })
      .catch((error) => {
        setIsLoading(false);
        setIsPaying(false);
        console.log(error);
      });
  };

  const fetchOrderDetails = async () => {
    await fetch(reviewPaymentUrl, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        const items = data.transactions
          .flatMap((transaction) => transaction.itemList)
          .flatMap((items) => items.items);
        setItemList(items);
        const amount = data.transactions.flatMap(
          (transaction) => transaction.amount.total
        );
        setTotalAmount(amount);
        return data;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchOrderDetails();
    const user = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const courseEnrollments = localStorage.getItem('courseEnrollments');

    dispatch(setLoggedInUser({ user: JSON.parse(user) }));
    dispatch(loginAction({ isLoggedIn: isLoggedIn, token: 'hfoshfsofh' }));
    dispatch(setCourseEnrollments(JSON.parse(courseEnrollments)));
  }, [paymentId, payerId]);

  return (
    <Container
      style={{
        minHeight: '93vh',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
    >
      {isLoading && !isPaying ? (
        <CircularProgress style={{ margin: 'auto' }} />
      ) : (
        <Grid container style={{ height: '50%', margin: 'auto' }}>
          <Grid item xs={12}>
            <Typography variant='h2'>
              {isPaymentCompleted ? 'RECEIPT' : 'INVOICE'}
            </Typography>
          </Grid>

          <Grid
            item
            // className={classes.table}
            style={{ margin: '20px auto' }}
            xs={12}
            md={8}
            alignContent='center'
            alignItems='center'
          >
            <table style={{ width: '90%' }}>
              <tr>
                <th className={classes.header}>Name/Title</th>
                <th className={classes.header}>Qty</th>
                <th className={classes.header}>Unit Price ($)</th>
                <th className={classes.header}>Total ($)</th>
              </tr>
              {itemList.map((item, index) => (
                <tr key={index}>
                  <td className={classes.tableData}>{item.name}</td>
                  <td className={classes.tableData}>{item.quantity}</td>
                  <td className={classes.tableData}>{item.price}</td>
                  <td className={classes.tableData}>
                    {parseFloat(item.price) * parseFloat(item.quantity)}
                  </td>
                </tr>
              ))}
            </table>
          </Grid>
          <Grid item xs={6} md={2} style={{ margin: '20px auto' }}>
            <Typography variant='body1'>Total Amount</Typography>
            <Typography variant='h3'>{totalAmount}</Typography>
          </Grid>
          <Grid item xs={6} md={2} style={{ margin: '20px auto' }}>
            {isPaymentCompleted ? (
              <ButtonGroup
                orientation='vertical'
                fullWidth
                style={{ height: '100%' }}
              >
                <Button
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  variant='contained'
                  disabled={true}
                >
                  Payment Received
                </Button>
                <Button
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    height: '100%',
                  }}
                  variant='contained'
                  onClick={() => navigate('/students')}
                  startIcon={<Start />}
                >
                  Start Learning
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                onClick={handlePayment}
                variant='contained'
                color='secondary'
                disabled={isLoading}
              >
                {isLoading && isPaying ? (
                  <CircularProgress />
                ) : (
                  `| Complete Payment | $ (${totalAmount})`
                )}
              </Button>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ConfirmOrder;
