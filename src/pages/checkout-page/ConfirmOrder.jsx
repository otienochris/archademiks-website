import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const payerId = new URLSearchParams(search).get('PayerID');
  const paymentId = new URLSearchParams(search).get('paymentId');
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [itemList, setItemList] = useState([itemObject]);
  const [totalAmount, setTotalAmount] = useState(0.0);

  const reviewPaymentUrl =
    'http://localhost:8080/paypal/payment/review/' + paymentId;
  const executePaymenturl =
    'http://localhost:8080/paypal/payment/execute-payment/' +
    paymentId +
    '/' +
    payerId;

  const handlePayment = async () => {
    setIsLoading(true);
    setIsPaying(true);
    const response = await fetch(executePaymenturl, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setIsPaying(false);
        console.log(data);
        if (data.status === 'APPROVED') {
          window.close();
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
    const response = await fetch(reviewPaymentUrl, {
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
        console.log(itemList);
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
            <Typography variant='h2'>INVOICE</Typography>
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
                <th className={classes.header}>Unit Price</th>
                <th className={classes.header}>Total</th>
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
            <Button
              onClick={handlePayment}
              variant='contained'
              color='secondary'
              disabled={isLoading}
            >
              {isLoading && isPaying ? (
                <CircularProgress />
              ) : (
                `| Complete Payment | Ksh (${totalAmount})`
              )}
            </Button>
          </Grid>
          <Grid
            item
            // className={classes.table}
            // style={{ margin: '20px auto' }}
            xs={12}
            md={8}
            alignContent='center'
            alignItems='center'
          >
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum
              dignissimos quis sit similique debitis doloremque molestiae
              impedit consequatur iure architecto id nam, temporibus fugiat a
              possimus pariatur reiciendis, quasi repellendus!
            </p>
          </Grid>
          <Grid item xs={0} md={4}></Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ConfirmOrder;
