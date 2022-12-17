import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';


const verifyEmailUrl = "http://localhost:8083/lms/api/v1/authentication/verifyEmail/"

const verifyEmailUsingToken = async (token) => {
    await fetch(verifyEmailUrl + token, {
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          alert("Email Verified");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }


  

function RedirectToEmailVerification() {
    const { token } = useParams();

    useEffect(() => {
        // if(emailVerificationCode != null){
          alert("sfsf")
          verifyEmailUsingToken(token);
        // }
      },[])

    console.log(token);
  return (
    <div>RedirectToEmailVerification</div>
  )
}

export default RedirectToEmailVerification