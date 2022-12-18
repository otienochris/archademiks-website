import { CircularProgress, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const verifyEmailUrl = "http://localhost:8083/lms/api/v1/authentication/verifyEmail/"




function RedirectToEmailVerification() {
  const { token } = useParams();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState();


  const verifyEmailUsingToken = async (token) => {
    setIsLoading(true);
    await fetch(verifyEmailUrl + token, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setIsEmailVerified(true);
          setIsLoading(false)
        } else {

        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
        setIsLoading(false);
        console.log(error)
      });
  }

  useEffect(() => {
    verifyEmailUsingToken(token);
  }, [])

  console.log(token);
  return (
    <Container style={{ minHeight: '92vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      {isLoading ? <CircularProgress /> : isEmailVerified ? <p style={{ color: 'green', fontWeight: 'bolder' }}>Email Verified</p> : <p style={{ color: 'red', fontWeight: 'bolder' }}>Error Verifying Email</p>}

    </Container>
  )
}

export default RedirectToEmailVerification